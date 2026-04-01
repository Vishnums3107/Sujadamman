# 📚 API Documentation

## Base URL
```
Development: http://localhost:5000
Production: https://your-backend-url.com
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Register User
**POST** `/api/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "data": {
    "_id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Login User
**POST** `/api/auth/login`

Authenticate and login a user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Get Current User
**GET** `/api/auth/me`

Get the currently authenticated user's information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## 📦 Product Endpoints

### Get All Products
**GET** `/api/products`

Retrieve a list of products with optional filters.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 12)
- `search` (string): Search products by name/description
- `category` (string): Filter by category ID
- `featured` (boolean): Filter featured products
- `minPrice` (number): Minimum price
- `maxPrice` (number): Maximum price

**Example:**
```
GET /api/products?page=1&limit=10&category=64abc123&featured=true
```

**Response:** (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "_id": "64abc123...",
      "name": "Modern L-Shape Sofa",
      "description": "Spacious L-shaped sofa with premium fabric",
      "price": 45000,
      "category": {
        "_id": "64xyz789...",
        "name": "Sofas",
        "type": "Furniture"
      },
      "images": ["https://image-url.com/sofa1.jpg"],
      "stock": 10,
      "featured": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

---

### Get Single Product
**GET** `/api/products/:id`

Get detailed information about a specific product.

**Response:** (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "64abc123...",
    "name": "Modern L-Shape Sofa",
    "description": "Spacious L-shaped sofa with premium fabric",
    "price": 45000,
    "category": {
      "_id": "64xyz789...",
      "name": "Sofas",
      "type": "Furniture",
      "description": "Comfortable and stylish sofas"
    },
    "images": ["https://image-url.com/sofa1.jpg"],
    "stock": 10,
    "featured": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Create Product (Admin)
**POST** `/api/products`

Create a new product (requires admin authentication).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 5000,
  "category": "64xyz789...",
  "stock": 20,
  "featured": false
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "data": {
    "_id": "64new123...",
    "name": "New Product",
    "description": "Product description",
    "price": 5000,
    "category": "64xyz789...",
    "stock": 20,
    "featured": false,
    "images": [],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Update Product (Admin)
**PUT** `/api/products/:id`

Update an existing product (requires admin authentication).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:** (all fields optional)
```json
{
  "name": "Updated Product Name",
  "price": 5500,
  "stock": 15
}
```

**Response:** (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "64abc123...",
    "name": "Updated Product Name",
    "price": 5500,
    "stock": 15,
    ...
  }
}
```

---

### Delete Product (Admin)
**DELETE** `/api/products/:id`

Delete a product (requires admin authentication).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

### Upload Product Images (Admin)
**POST** `/api/products/:id/images`

Upload images for a product (requires admin authentication).

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

**Request Body:** (FormData)
- `images`: Image files (max 5)

**Response:** (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "64abc123...",
    "images": [
      "https://cloudinary.com/image1.jpg",
      "https://cloudinary.com/image2.jpg"
    ],
    ...
  }
}
```

---

### Delete Product Image (Admin)
**DELETE** `/api/products/:id/images`

Delete a specific image from a product.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "imageUrl": "https://cloudinary.com/image1.jpg"
}
```

**Response:** (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "64abc123...",
    "images": ["https://cloudinary.com/image2.jpg"],
    ...
  }
}
```

---

## 🏷️ Category Endpoints

### Get All Categories
**GET** `/api/categories`

Retrieve all categories.

**Response:** (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "_id": "64xyz789...",
      "name": "Sofas",
      "type": "Furniture",
      "description": "Comfortable sofas",
      "image": "https://image-url.com/sofa.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 5
}
```

---

### Get Single Category
**GET** `/api/categories/:id`

Get a specific category with product count.

**Response:** (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "64xyz789...",
    "name": "Sofas",
    "type": "Furniture",
    "description": "Comfortable sofas",
    "image": "https://image-url.com/sofa.jpg",
    "productCount": 15,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Create Category (Admin)
**POST** `/api/categories`

Create a new category (requires admin authentication).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Water Bottles",
  "type": "Home Essentials",
  "description": "Eco-friendly water bottles"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "data": {
    "_id": "64new456...",
    "name": "Water Bottles",
    "type": "Home Essentials",
    "description": "Eco-friendly water bottles",
    "image": "",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Update Category (Admin)
**PUT** `/api/categories/:id`

Update a category (requires admin authentication).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Updated Category Name",
  "description": "Updated description"
}
```

---

### Delete Category (Admin)
**DELETE** `/api/categories/:id`

Delete a category (requires admin authentication). Will fail if products are associated.

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

---

### Upload Category Image (Admin)
**POST** `/api/categories/:id/image`

Upload an image for a category.

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

**Request Body:** (FormData)
- `image`: Image file

---

## 📧 Contact Endpoints

### Submit Contact Form
**POST** `/api/contact`

Submit a contact inquiry (public).

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "I'm interested in your products"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "message": "Thank you for contacting us! We will get back to you soon.",
  "data": {
    "_id": "64cont123...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "message": "I'm interested in your products",
    "status": "new",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Get All Contacts (Admin)
**GET** `/api/contact`

Get all contact inquiries (requires admin authentication).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `status` (string): Filter by status (new/read/replied)

**Response:** (200 OK)
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "pages": 3
  }
}
```

---

### Get Single Contact (Admin)
**GET** `/api/contact/:id`

Get a specific contact inquiry (automatically marks as read).

**Headers:**
```
Authorization: Bearer <admin_token>
```

---

### Update Contact Status (Admin)
**PUT** `/api/contact/:id`

Update the status of a contact inquiry.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "status": "replied"
}
```

---

### Delete Contact (Admin)
**DELETE** `/api/contact/:id`

Delete a contact inquiry.

**Headers:**
```
Authorization: Bearer <admin_token>
```

---

## ⚠️ Error Responses

All endpoints return errors in the following format:

**4xx Client Errors:**
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

**5xx Server Errors:**
```json
{
  "success": false,
  "message": "Internal server error",
  "stack": "Error stack trace (development only)"
}
```

---

## 📝 Common Status Codes

- `200` - OK (Success)
- `201` - Created (Resource created successfully)
- `400` - Bad Request (Invalid input)
- `401` - Unauthorized (Authentication required)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found (Resource not found)
- `500` - Internal Server Error

---

## 🔒 Admin Access

To access admin endpoints, you must:
1. Login with admin credentials
2. Include the JWT token in Authorization header
3. Have `role: "admin"` in your user account

**Default Admin Credentials (Development):**
- Email: admin@furniture.com
- Password: admin123

⚠️ **Important:** Change these credentials in production!
