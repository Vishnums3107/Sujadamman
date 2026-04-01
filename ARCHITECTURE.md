# 🏗️ System Architecture

## Overview

This document describes the architecture of the Furniture & Home Essentials website built with the MERN stack.

---

## 🎯 Architecture Pattern

The application follows a **three-tier architecture**:

1. **Presentation Layer (Frontend)** - React.js with Tailwind CSS
2. **Application Layer (Backend)** - Node.js with Express.js
3. **Data Layer** - MongoDB with Mongoose ODM

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (React)                        │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────┐ │
│  │   Pages      │  │  Components   │  │   Context    │ │
│  │              │  │               │  │              │ │
│  │ - Home       │  │ - Navbar      │  │ - Auth       │ │
│  │ - Products   │  │ - Footer      │  │ - Theme      │ │
│  │ - Admin      │  │ - Cards       │  │              │ │
│  └──────────────┘  └───────────────┘  └──────────────┘ │
│           │                  │                  │        │
│           └──────────────────┴──────────────────┘        │
│                           │                              │
│                    ┌──────▼──────┐                       │
│                    │  Services   │                       │
│                    │  (API calls)│                       │
│                    └─────────────┘                       │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP/HTTPS
                           │ REST API
┌──────────────────────────▼──────────────────────────────┐
│                    SERVER (Express.js)                   │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────┐ │
│  │   Routes     │  │  Controllers  │  │  Middleware  │ │
│  │              │  │               │  │              │ │
│  │ - Auth       │  │ - Auth        │  │ - Auth       │ │
│  │ - Products   │  │ - Products    │  │ - Error      │ │
│  │ - Categories │  │ - Categories  │  │ - Upload     │ │
│  │ - Contact    │  │ - Contact     │  │ - Validation │ │
│  └──────────────┘  └───────────────┘  └──────────────┘ │
│           │                  │                  │        │
│           └──────────────────┴──────────────────┘        │
│                           │                              │
│                    ┌──────▼──────┐                       │
│                    │   Models    │                       │
│                    │  (Mongoose) │                       │
│                    └─────────────┘                       │
└──────────────────────────┬──────────────────────────────┘
                           │
                           │ MongoDB Driver
┌──────────────────────────▼──────────────────────────────┐
│                    DATABASE (MongoDB)                    │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────┐ │
│  │    Users     │  │   Products    │  │  Categories  │ │
│  │              │  │               │  │              │ │
│  │ - _id        │  │ - _id         │  │ - _id        │ │
│  │ - name       │  │ - name        │  │ - name       │ │
│  │ - email      │  │ - description │  │ - type       │ │
│  │ - password   │  │ - price       │  │ - description│ │
│  │ - role       │  │ - category    │  │              │ │
│  └──────────────┘  │ - images      │  └──────────────┘ │
│                    │ - stock       │                    │
│                    │ - featured    │                    │
│  ┌──────────────┐  └───────────────┘                    │
│  │   Contacts   │                                       │
│  │              │                                       │
│  │ - _id        │                                       │
│  │ - name       │                                       │
│  │ - email      │                                       │
│  │ - message    │                                       │
│  │ - status     │                                       │
│  └──────────────┘                                       │
└─────────────────────────────────────────────────────────┘

                    ┌─────────────────┐
                    │   Cloudinary    │
                    │ (Image Storage) │
                    └─────────────────┘
```

---

## 📁 Project Structure

### Backend Structure (`/server`)

```
server/
├── config/              # Configuration files
│   ├── db.js           # MongoDB connection
│   └── cloudinary.js   # Cloudinary configuration
├── controllers/         # Business logic
│   ├── authController.js
│   ├── productController.js
│   ├── categoryController.js
│   └── contactController.js
├── middleware/          # Custom middleware
│   ├── authMiddleware.js      # JWT authentication
│   ├── errorMiddleware.js     # Error handling
│   ├── validation.js          # Input validation
│   └── uploadMiddleware.js    # File upload
├── models/              # Mongoose schemas
│   ├── User.js
│   ├── Product.js
│   ├── Category.js
│   └── Contact.js
├── routes/              # API routes
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── categoryRoutes.js
│   └── contactRoutes.js
├── utils/               # Utility functions
│   └── seed.js         # Database seeding
├── .env                 # Environment variables (not in git)
├── .env.example         # Environment template
├── package.json         # Dependencies
└── server.js           # Entry point
```

### Frontend Structure (`/client`)

```
client/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── ProductSkeleton.jsx
│   │   ├── AdminRoute.jsx
│   │   └── ScrollToTop.jsx
│   ├── context/         # React Context
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── NotFound.jsx
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminProducts.jsx
│   │       ├── AdminCategories.jsx
│   │       └── AdminContacts.jsx
│   ├── services/        # API services
│   │   ├── api.js
│   │   └── index.js
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables (not in git)
├── .env.example         # Environment template
├── index.html           # HTML template
├── package.json         # Dependencies
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration
```

---

## 🔄 Request Flow

### Example: Fetching Products

```
1. User clicks "Products" in navigation
   ↓
2. React Router navigates to /products
   ↓
3. Products.jsx component mounts
   ↓
4. useEffect calls productService.getProducts()
   ↓
5. API service makes GET request to backend
   GET /api/products?page=1&limit=12
   ↓
6. Express router receives request → productRoutes.js
   ↓
7. Router calls controller → getProducts()
   ↓
8. Controller queries database using Mongoose
   Product.find().populate('category')
   ↓
9. MongoDB returns product documents
   ↓
10. Controller formats response and sends JSON
   ↓
11. API service receives response
   ↓
12. React updates state with product data
   ↓
13. Component re-renders with products
```

### Example: Admin Creating Product

```
1. Admin fills product form and clicks "Create"
   ↓
2. Form submit calls handleSubmit()
   ↓
3. productService.createProduct(formData) with JWT token
   POST /api/products
   Authorization: Bearer <token>
   ↓
4. Express receives request
   ↓
5. authMiddleware checks JWT token
   - Verify token signature
   - Extract user ID
   - Load user from database
   - Check if user.role === 'admin'
   ↓
6. If authorized, validation middleware checks input
   ↓
7. Controller creates product in database
   Product.create({ ...formData })
   ↓
8. If images provided, upload to Cloudinary
   POST /api/products/:id/images
   ↓
9. Update product with image URLs
   ↓
10. Send success response
   ↓
11. React shows success toast
   ↓
12. Refresh products list
```

---

## 🔒 Security Architecture

### Authentication Flow

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       │ 1. POST /api/auth/login
       │    { email, password }
       ▼
┌─────────────┐
│   Server    │
└──────┬──────┘
       │
       │ 2. Find user by email
       ▼
┌─────────────┐
│  Database   │
└──────┬──────┘
       │
       │ 3. User document
       ▼
┌─────────────┐
│   Server    │
│ - Compare   │
│   password  │
│   (bcrypt)  │
│ - Generate  │
│   JWT token │
└──────┬──────┘
       │
       │ 4. { user, token }
       ▼
┌─────────────┐
│   Client    │
│ - Store     │
│   token in  │
│   localStorage
│ - Include   │
│   in future │
│   requests  │
└─────────────┘
```

### Protected Routes

```javascript
// Middleware stack for protected routes
[
  protect,           // Verify JWT token
  admin,            // Check admin role
  validation,       // Validate input
  controller        // Business logic
]
```

---

## 💾 Data Models

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, validated),
  password: String (hashed with bcrypt),
  role: String (enum: ['user', 'admin']),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  category: ObjectId (ref: 'Category'),
  images: [String],
  stock: Number,
  featured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Category Model
```javascript
{
  _id: ObjectId,
  name: String (unique),
  type: String (enum: ['Furniture', 'Home Essentials']),
  description: String,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (validated),
  phone: String,
  message: String,
  status: String (enum: ['new', 'read', 'replied']),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Design

### RESTful Principles

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/products | List all products |
| GET | /api/products/:id | Get single product |
| POST | /api/products | Create product (admin) |
| PUT | /api/products/:id | Update product (admin) |
| DELETE | /api/products/:id | Delete product (admin) |

### Response Format

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "pagination": { ... }  // Optional
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "errors": [ ... ]  // Optional validation errors
}
```

---

## 🎨 Frontend Architecture

### State Management

- **Global State:** React Context API
  - AuthContext: User authentication state
  - ThemeContext: Dark/Light mode
- **Local State:** useState hook
- **Server State:** Direct API calls (no Redux/RTK Query)

### Routing

```javascript
/ (Home)
/products (Products List)
/products/:id (Product Details)
/about (About Page)
/contact (Contact Page)
/login (Login)
/register (Register)
/admin (Admin Dashboard) - Protected
/admin/products (Manage Products) - Protected
/admin/categories (Manage Categories) - Protected
/admin/contacts (Manage Contacts) - Protected
```

### Component Hierarchy

```
App
├── Navbar
├── Routes
│   ├── Home
│   │   ├── Hero Section
│   │   ├── Categories
│   │   ├── Featured Products
│   │   └── Testimonials
│   ├── Products
│   │   ├── Filters
│   │   ├── Product Grid
│   │   └── Pagination
│   └── Admin
│       └── AdminRoute (HOC)
│           └── Admin Pages
└── Footer
```

---

## 🚀 Performance Optimizations

### Backend
- Query optimization with Mongoose indexes
- Image optimization via Cloudinary
- Pagination for large datasets
- Async/await for non-blocking operations
- Error handling with express-async-handler

### Frontend
- Code splitting with React.lazy
- Image lazy loading
- Skeleton loading states
- Debounced search inputs
- Optimized re-renders with proper keys
- Production build minification

---

## 🔧 Development Workflow

```
1. Local Development
   ├── Backend: npm run dev (nodemon)
   └── Frontend: npm run dev (vite)

2. Testing
   ├── Manual testing
   └── Error handling verification

3. Build
   ├── Backend: Ready for deployment (no build needed)
   └── Frontend: npm run build → dist/

4. Deployment
   ├── Backend → Render/Railway
   └── Frontend → Vercel/Netlify

5. Monitoring
   ├── Check logs
   ├── Monitor performance
   └── Fix bugs
```

---

## 📊 Scalability Considerations

### Current Scale
- **Users:** Supports hundreds of concurrent users
- **Products:** Handles thousands of products efficiently
- **Storage:** Cloudinary for unlimited image storage

### Future Improvements
1. **Caching:** Implement Redis for frequently accessed data
2. **CDN:** Use CDN for static assets
3. **Load Balancing:** Multiple server instances
4. **Database:** Replica sets for high availability
5. **Search:** Elasticsearch for advanced product search
6. **Real-time:** WebSockets for real-time updates

---

## 🛡️ Security Measures

1. **Authentication:** JWT tokens with expiration
2. **Password Security:** Bcrypt hashing (10 salt rounds)
3. **Input Validation:** express-validator
4. **CORS:** Configured for specific origins
5. **Environment Variables:** Sensitive data not in code
6. **SQL/NoSQL Injection:** Mongoose sanitization
7. **Rate Limiting:** Planned for production
8. **HTTPS:** Enforced in production

---

## 📝 Development Best Practices

1. **Code Organization:** Modular structure with clear separation
2. **Error Handling:** Comprehensive try-catch blocks
3. **Validation:** Input validation at multiple levels
4. **Documentation:** Inline comments and README files
5. **Version Control:** Git with meaningful commits
6. **Environment Management:** Separate dev/prod configs
7. **Dependency Management:** Regular updates
8. **Code Quality:** ESLint rules

---

This architecture is designed to be:
- ✅ **Scalable:** Easy to add new features
- ✅ **Maintainable:** Clear code organization
- ✅ **Secure:** Multiple security layers
- ✅ **Performant:** Optimized for speed
- ✅ **Developer-Friendly:** Easy to understand and extend
