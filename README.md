# 🏠 Integrated Furniture & Home Essentials Website

A modern, full-stack MERN application for a furniture and home essentials company.

## 🚀 Features

### Frontend
- **Modern UI** with React and Tailwind CSS
- **Responsive Design** - Mobile-first approach
- **Product Catalog** with search and filtering
- **Product Details** pages with image galleries
- **Contact Form** with backend integration
- **Dark/Light Theme** toggle
- **Smooth Animations** with Framer Motion

### Backend
- **RESTful API** with Express.js
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** for secure admin access
- **Image Upload** with Cloudinary integration
- **Input Validation** and error handling
- **CORS** enabled for cross-origin requests

### Admin Panel
- **Secure Login** with JWT tokens
- **Product Management** (CRUD operations)
- **Category Management**
- **Service Management**
- **View Contact Inquiries**
- **Image Upload** functionality

## 📁 Project Structure

```
.
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React Context API
│   │   ├── services/     # API services
│   │   ├── hooks/        # Custom React hooks
│   │   ├── utils/        # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                # Node.js Backend
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utility functions
│   ├── server.js        # Entry point
│   └── package.json
│
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React** 18.x - UI library
- **React Router** 6.x - Routing
- **Tailwind CSS** 3.x - Styling
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image hosting
- **Multer** - File upload
- **Validator** - Input validation
- **Dotenv** - Environment variables

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)

### 1. Clone the repository
```bash
git clone <repository-url>
cd dp
```

### 2. Install Backend Dependencies
```bash
cd server
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../client
npm install
```

### 4. Environment Variables

#### Backend (.env in server/)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:5173
```

#### Frontend (.env in client/)
```env
VITE_API_URL=http://localhost:5000
```

## 🚀 Running the Application

### Development Mode

#### Start Backend Server
```bash
cd server
npm run dev
```
Backend will run on `http://localhost:5000`

#### Start Frontend
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:5173`

### Production Build

#### Build Frontend
```bash
cd client
npm run build
```

## 🗄️ Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (default: 'user'),
  createdAt: Date
}
```

### Products Collection
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: ObjectId (ref: Category),
  images: [String],
  stock: Number,
  featured: Boolean,
  createdAt: Date
}
```

### Categories Collection
```javascript
{
  name: String,
  type: String (Furniture/Home Essentials),
  description: String,
  image: String,
  createdAt: Date
}
```

### Services Collection
```javascript
{
  title: String,
  description: String,
  icon: String,
  division: String (Furniture/Home Essentials/Business),
  createdAt: Date
}
```

### Contacts Collection
```javascript
{
  name: String,
  email: String,
  phone: String,
  message: String,
  status: String (default: 'new'),
  createdAt: Date
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (Admin)
- `PUT /api/contact/:id` - Update contact status (Admin)
- `DELETE /api/contact/:id` - Delete contact (Admin)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service (Admin)
- `PUT /api/services/:id` - Update service (Admin)
- `DELETE /api/services/:id` - Delete service (Admin)

## 🌍 Deployment

### Backend Deployment (Render/Railway)

1. **Create account** on Render or Railway
2. **Connect repository**
3. **Set environment variables** in dashboard
4. **Deploy** from main branch

#### Render Configuration
- Build Command: `cd server && npm install`
- Start Command: `cd server && npm start`
- Root Directory: `/`

### Frontend Deployment (Vercel/Netlify)

1. **Create account** on Vercel or Netlify
2. **Connect repository**
3. **Configure build settings**:
   - Build Command: `cd client && npm run build`
   - Output Directory: `client/dist`
4. **Add environment variables**:
   - `VITE_API_URL=your_backend_url`
5. **Deploy**

### MongoDB Atlas Setup

1. Create cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create database user
3. Whitelist IP (0.0.0.0/0 for all IPs)
4. Get connection string
5. Add to backend environment variables

### Cloudinary Setup

1. Create account on [Cloudinary](https://cloudinary.com/)
2. Get Cloud Name, API Key, and API Secret from dashboard
3. Add to backend environment variables

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Protected admin routes
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Environment variables for sensitive data
- ✅ HTTP-only cookies (optional)
- ✅ Rate limiting (recommended for production)

## 🎯 Default Admin Credentials

After seeding the database:
- **Email**: admin@furniture.com
- **Password**: admin123

⚠️ **Important**: Change these credentials in production!

## 📱 Features Roadmap

- [ ] Shopping cart functionality
- [ ] Wishlist
- [ ] User reviews and ratings
- [ ] Order management
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created with ❤️ for modern furniture and home essentials business.

## 📞 Support

For support, email support@furniture.com or create an issue in the repository.

---

**Built with MERN Stack** 🚀
