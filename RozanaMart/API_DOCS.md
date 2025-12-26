# RozanaMart API Documentation

Complete API reference for RozanaMart backend.

## Base URL
```
http://localhost:5000/api
```

## Authentication
Include JWT token in header:
```
Authorization: Bearer <token>
```

---

## Authentication APIs

### Signup
```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "9999999999",
  "password": "password123"
}
```

**Response** (201):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "phone": "9999999999",
    "referralCode": "ROZANA9999"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "phone": "9999999999",
  "password": "password123"
}
```

**Response** (200):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "phone": "9999999999"
  }
}
```

### Verify Token
```http
GET /auth/verify
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "phone": "9999999999",
    "email": "john@example.com"
  }
}
```

---

## Product APIs

### Get All Products
```http
GET /products?category=1&search=onion&page=1&limit=20
```

**Response** (200):
```json
{
  "success": true,
  "products": [
    {
      "_id": "product_id",
      "name": "Onion",
      "weight": "1 kg",
      "price": 35,
      "mrp": 50,
      "discount": 30,
      "image": "url",
      "rating": 4.5,
      "category": "category_id"
    }
  ],
  "total": 100,
  "page": 1,
  "pages": 5
}
```

### Get Single Product
```http
GET /products/:id
```

**Response** (200):
```json
{
  "success": true,
  "product": {
    "_id": "product_id",
    "name": "Onion",
    "price": 35,
    "mrp": 50,
    "weight": "1 kg",
    "description": "Fresh onions from farms",
    "rating": 4.5,
    "reviewCount": 250,
    "category": {
      "_id": "cat_id",
      "name": "Vegetables & Fruits"
    }
  }
}
```

### Get Similar Products
```http
GET /products/:id/similar
```

**Response** (200):
```json
{
  "success": true,
  "products": [...]
}
```

### Get Bestsellers
```http
GET /products/category/bestsellers
```

---

## Order APIs

### Create Order
```http
POST /orders
Content-Type: application/json
Authorization: Bearer <token>

{
  "userId": "user_id",
  "items": [
    {
      "product": "product_id",
      "name": "Onion",
      "price": 35,
      "quantity": 2,
      "image": "url"
    }
  ],
  "deliveryAddress": {
    "name": "John Doe",
    "phone": "9999999999",
    "address": "123 Main Street",
    "lat": 28.6139,
    "lng": 77.2090
  },
  "amounts": {
    "subtotal": 70,
    "delivery": 50,
    "advance": 12,
    "cod": 108,
    "total": 120
  }
}
```

**Response** (201):
```json
{
  "success": true,
  "order": {
    "_id": "order_id",
    "orderNumber": "RM1234567890",
    "user": "user_id",
    "items": [...],
    "amounts": {...},
    "status": "pending",
    "paymentStatus": "pending",
    "createdAt": "2024-01-01T10:00:00Z"
  }
}
```

### Get User Orders
```http
GET /orders/user/:userId
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "success": true,
  "orders": [...]
}
```

### Get Single Order
```http
GET /orders/:id
```

**Response** (200):
```json
{
  "success": true,
  "order": {...}
}
```

### Update Order Status (Admin)
```http
PATCH /orders/:id/status
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "confirmed"
}
```

Valid statuses: `pending`, `confirmed`, `packed`, `out_for_delivery`, `delivered`, `cancelled`

### Pay Advance
```http
POST /orders/:id/pay-advance
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "success": true,
  "order": {...},
  "message": "Advance payment received"
}
```

### Pay COD
```http
POST /orders/:id/pay-cod
Authorization: Bearer <token>
```

---

## User APIs

### Get User Profile
```http
GET /users/:id
```

**Response** (200):
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "phone": "9999999999",
    "email": "john@example.com",
    "address": "123 Main Street",
    "wallet": 500,
    "referralCode": "ROZANA9999"
  }
}
```

### Update User Profile
```http
PATCH /users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john@example.com",
  "address": "456 New Street",
  "lat": 28.6139,
  "lng": 77.2090
}
```

### Get Wallet Balance
```http
GET /users/:id/wallet
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "success": true,
  "wallet": 500
}
```

---

## Review APIs

### Submit Review
```http
POST /reviews/:orderId/review
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "review": "Excellent product and fast delivery!"
}
```

**Response** (200):
```json
{
  "success": true,
  "order": {...}
}
```

### Get Product Reviews
```http
GET /reviews/product/:productId
```

**Response** (200):
```json
{
  "success": true,
  "reviews": [
    {
      "_id": "review_id",
      "rating": 5,
      "review": "Great!",
      "reviewedAt": "2024-01-01T10:00:00Z"
    }
  ]
}
```

---

## Admin APIs

### Admin Login
```http
POST /admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

### Get Dashboard Stats
```http
GET /admin/dashboard
Authorization: Bearer <admin-token>
```

**Response** (200):
```json
{
  "success": true,
  "stats": {
    "totalOrders": 150,
    "pendingOrders": 25,
    "deliveredOrders": 120,
    "revenue": 45000
  }
}
```

### Get All Orders
```http
GET /admin/orders
Authorization: Bearer <admin-token>
```

**Response** (200):
```json
{
  "success": true,
  "orders": [...]
}
```

### Add Product
```http
POST /admin/products
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Onion",
  "category": "category_id",
  "price": 35,
  "mrp": 50,
  "weight": "1 kg",
  "unit": "kg",
  "stock": 100,
  "description": "Fresh onions"
}
```

### Update Product
```http
PATCH /admin/products/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "price": 40,
  "stock": 150
}
```

### Block User
```http
PATCH /admin/users/:id/block
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "isBlocked": true
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "All fields are required"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid credentials"
}
```

### 403 Forbidden
```json
{
  "error": "Account blocked"
}
```

### 404 Not Found
```json
{
  "error": "Product not found"
}
```

### 500 Server Error
```json
{
  "error": "Internal server error",
  "message": "Error details..."
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

---

## Rate Limiting

Not yet implemented but recommended for production:
```
- 100 requests per minute per IP
- 1000 requests per hour per user
```

---

## Testing with cURL

### Example: Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_id",
    "items": [...],
    "deliveryAddress": {...},
    "amounts": {...}
  }'
```

### Example: Get Products
```bash
curl http://localhost:5000/api/products?category=1&page=1
```

---

## Pagination

All list endpoints support pagination:

```
GET /products?page=1&limit=20
```

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

Response includes:
```json
{
  "total": 100,
  "page": 1,
  "pages": 5
}
```

---

## Sorting

Some endpoints support sorting:

```
GET /orders?sort=-createdAt
```

- `-field`: Descending order
- `field`: Ascending order

---

## Search

Products support search:

```
GET /products?search=onion
```

Searches in: name, description

---

## Filtering

Products support filtering:

```
GET /products?category=1&minPrice=0&maxPrice=100
```

---

## Webhooks (Coming Soon)

- Order placed
- Order delivered
- Payment received
- Review submitted

---

**Last Updated**: December 2024

For more info, check README.md and SETUP_GUIDE.md
