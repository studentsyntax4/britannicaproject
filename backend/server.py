from fastapi import FastAPI, APIRouter
from fastapi import HTTPException, Header, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
import secrets
from collections import defaultdict
from datetime import datetime, timezone
from seed_data import get_seed_products


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# ---------------- Crackers and Checkers: Store Models ----------------
class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    category: str
    price: float
    img: str
    tag: Optional[str] = None
    desc: str = ""
    rating: float = 4.7
    reviews: int = 50


class OrderItem(BaseModel):
    id: str
    name: str
    price: float
    qty: int


class CustomerInfo(BaseModel):
    name: str
    email: str
    phone: str
    address: str
    city: Optional[str] = ""
    pin: Optional[str] = ""


class OrderCreate(BaseModel):
    customer: CustomerInfo
    items: List[OrderItem]
    subtotal: float
    shipping: float = 0


class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_number: str
    customer: CustomerInfo
    items: List[OrderItem]
    subtotal: float
    shipping: float
    total: float
    payment_method: str = "cod"
    status: str = "confirmed"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------------- Product Endpoints ----------------
@api_router.get("/products", response_model=List[Product])
async def get_products(category: Optional[str] = None):
    query = {"category": category} if category else {}
    products = await db.products.find(query, {"_id": 0}).sort("order", 1).to_list(1000)
    return products


@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


# ---------------- Order Endpoints (Cash on Delivery only) ----------------
@api_router.post("/orders", response_model=Order)
async def create_order(payload: OrderCreate):
    if not payload.items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    total = payload.subtotal + payload.shipping
    order_number = f"CNC{secrets.randbelow(900000) + 100000}"

    order = Order(
        order_number=order_number,
        customer=payload.customer,
        items=payload.items,
        subtotal=payload.subtotal,
        shipping=payload.shipping,
        total=total,
        payment_method="cod",
        status="confirmed",
    )

    doc = order.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.orders.insert_one(doc)
    return order


@api_router.get("/orders/{order_number}", response_model=Order)
async def get_order(order_number: str):
    order = await db.orders.find_one({"order_number": order_number}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if isinstance(order.get("created_at"), str):
        order["created_at"] = datetime.fromisoformat(order["created_at"])
    return order


# ---------------- Admin: Auth ----------------
ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin")
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "cnc_admin_token")
ORDER_STATUSES = ["confirmed", "packed", "out_for_delivery", "delivered", "cancelled"]


class AdminLogin(BaseModel):
    username: str
    password: str


class StatusUpdate(BaseModel):
    status: str


class ProductUpsert(BaseModel):
    name: str
    category: str
    price: float
    img: str
    tag: Optional[str] = None
    desc: str = ""
    rating: float = 4.7
    reviews: int = 50


async def verify_admin(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.split(" ", 1)[1]
    if token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid token")
    return True


@api_router.post("/admin/login")
async def admin_login(payload: AdminLogin):
    if payload.username == ADMIN_USERNAME and payload.password == ADMIN_PASSWORD:
        return {"token": ADMIN_TOKEN, "username": ADMIN_USERNAME}
    raise HTTPException(status_code=401, detail="Invalid credentials")


# ---------------- Admin: Stats ----------------
def _compute_bestsellers(orders):
    tally = defaultdict(int)
    for o in orders:
        for it in o.get("items", []):
            tally[it["name"]] += it.get("qty", 0)
    ranked = sorted(
        ({"name": k, "qty": v} for k, v in tally.items()),
        key=lambda x: x["qty"],
        reverse=True,
    )
    return ranked[:5]


def _order_day(order):
    ca = order.get("created_at")
    if isinstance(ca, str):
        return ca[:10]
    if isinstance(ca, datetime):
        return ca.date().isoformat()
    return None


def _compute_revenue_by_day(orders):
    day_rev = defaultdict(float)
    for o in orders:
        day = _order_day(o)
        if day is None:
            continue
        day_rev[day] += o.get("total", 0)
    return [{"date": k, "revenue": v} for k, v in sorted(day_rev.items())][-7:]


PENDING_STATUSES = ("confirmed", "packed", "out_for_delivery")


@api_router.get("/admin/stats")
async def admin_stats(_: bool = Depends(verify_admin)):
    orders = await db.orders.find({}, {"_id": 0}).to_list(5000)
    products_count = await db.products.count_documents({})

    return {
        "total_orders": len(orders),
        "total_revenue": sum(o.get("total", 0) for o in orders),
        "delivered": sum(1 for o in orders if o.get("status") == "delivered"),
        "pending": sum(1 for o in orders if o.get("status") in PENDING_STATUSES),
        "products_count": products_count,
        "bestsellers": _compute_bestsellers(orders),
        "revenue_by_day": _compute_revenue_by_day(orders),
    }


# ---------------- Admin: Orders ----------------
@api_router.get("/admin/orders", response_model=List[Order])
async def admin_orders(_: bool = Depends(verify_admin)):
    orders = await db.orders.find({}, {"_id": 0}).to_list(5000)
    for o in orders:
        if isinstance(o.get("created_at"), str):
            o["created_at"] = datetime.fromisoformat(o["created_at"])
    orders.sort(key=lambda x: x["created_at"], reverse=True)
    return orders


@api_router.patch("/admin/orders/{order_number}", response_model=Order)
async def admin_update_order(order_number: str, payload: StatusUpdate, _: bool = Depends(verify_admin)):
    if payload.status not in ORDER_STATUSES:
        raise HTTPException(status_code=400, detail="Invalid status")
    result = await db.orders.find_one_and_update(
        {"order_number": order_number},
        {"$set": {"status": payload.status}},
        return_document=True,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Order not found")
    order = await db.orders.find_one({"order_number": order_number}, {"_id": 0})
    if isinstance(order.get("created_at"), str):
        order["created_at"] = datetime.fromisoformat(order["created_at"])
    return order


# ---------------- Admin: Products ----------------
@api_router.post("/admin/products", response_model=Product)
async def admin_create_product(payload: ProductUpsert, _: bool = Depends(verify_admin)):
    new_id = f"p{uuid.uuid4().hex[:8]}"
    last = await db.products.find({}, {"order": 1, "_id": 0}).sort("order", -1).to_list(1)
    next_order = (last[0]["order"] + 1) if last and "order" in last[0] else 1000
    doc = payload.model_dump()
    doc["id"] = new_id
    doc["order"] = next_order
    await db.products.insert_one(doc)
    return {**doc}


@api_router.put("/admin/products/{product_id}", response_model=Product)
async def admin_update_product(product_id: str, payload: ProductUpsert, _: bool = Depends(verify_admin)):
    existing = await db.products.find_one({"id": product_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Product not found")
    await db.products.update_one({"id": product_id}, {"$set": payload.model_dump()})
    updated = await db.products.find_one({"id": product_id}, {"_id": 0})
    return updated


@api_router.delete("/admin/products/{product_id}")
async def admin_delete_product(product_id: str, _: bool = Depends(verify_admin)):
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"deleted": product_id}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def seed_products():
    """Seed product catalog on first run (idempotent)."""
    try:
        count = await db.products.count_documents({})
        if count == 0:
            products = get_seed_products()
            await db.products.insert_many(products)
            logger.info(f"Seeded {len(products)} products.")
        else:
            logger.info(f"Products already present ({count}).")
    except Exception as e:
        logger.error(f"Product seeding failed: {e}")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()