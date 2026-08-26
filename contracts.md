# Crackers and Checkers — API Contracts

## Goal
Move product catalog + orders to backend (MongoDB). Payment = **Cash on Delivery only**. Add an About page (frontend only).

## Data currently mocked (frontend `mock.js`)
- `PRODUCTS` (35 items) → now served by backend, seeded from `seed_data.py`.
- `CATEGORIES`, `ADDONS`, `VALUES`, `BRAND` → remain static config in `mock.js` (not business data).
- Cart → stays client-side (localStorage). Only order submission goes to backend.

## Endpoints (all prefixed `/api`)
- `GET /api/products?category=<id>` → list products (optional filter). Returns array of Product.
- `GET /api/products/{id}` → single Product (404 if missing).
- `POST /api/orders` → create COD order.
  - body: `{ customer:{name,email,phone,address,city,pin}, items:[{id,name,price,qty}], subtotal, shipping }`
  - server computes total, forces `payment_method="cod"`, generates `order_number` (CNC######), `status="confirmed"`.
  - returns full Order incl. `order_number`.
- `GET /api/orders/{order_number}` → fetch order (confirmation lookups).

## Models
- Product: id, name, category, price, img, tag(optional), desc, rating, reviews
- Order: id, order_number, customer, items, subtotal, shipping, total, payment_method, status, created_at

## Frontend integration
- New `context/ProductsContext.jsx`: fetch `/api/products` once; expose `products, loading, getProduct, byCategory, bestsellers`.
- Home/Shop/ProductDetail/CategoryStrip consume context instead of mock helpers.
- `Checkout.jsx`: POST to `/api/orders`; payment section shows **Cash on Delivery only**; confirmation uses returned `order_number`.
- API base: `process.env.REACT_APP_BACKEND_URL` + `/api`.
- New `pages/About.jsx` + route `/about` + nav links.
