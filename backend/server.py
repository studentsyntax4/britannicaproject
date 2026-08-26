from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
import random
from datetime import datetime, timezone
from fastapi import HTTPException
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
    order_number = f"CNC{random.randint(100000, 999999)}"

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