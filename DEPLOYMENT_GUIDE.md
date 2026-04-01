# 🚀 Deployment Guide

Complete guide to deploy your MERN Furniture & Home Essentials website to production.

---

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ MongoDB Atlas account
- ✅ Cloudinary account
- ✅ GitHub repository (optional but recommended)
- ✅ Domain name (optional)

---

## 🗄️ PART 1: MongoDB Atlas Setup

### Step 1: Create MongoDB Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new project: "Furniture Website"
4. Click "Build a Database"
5. Choose **FREE** tier (M0 Sandbox)
6. Select your preferred cloud provider and region
7. Click "Create Cluster"

### Step 2: Configure Database Access

1. Go to **Database Access** in left sidebar
2. Click "Add New Database User"
3. Choose **Password** authentication
4. Enter username and strong password (save these!)
5. Database User Privileges: **Read and write to any database**
6. Click "Add User"

### Step 3: Configure Network Access

1. Go to **Network Access** in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Confirm

### Step 4: Get Connection String

1. Go to **Database** in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: **Node.js**, Version: **5.5 or later**
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with `furniture` (or your preferred database name)

**Example:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/furniture?retryWrites=true&w=majority
```

---

## ☁️ PART 2: Cloudinary Setup

### Step 1: Create Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Verify your email

### Step 2: Get API Credentials

1. Go to Dashboard
2. Find "Account Details" section
3. Note down:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

---

## 🎯 PART 3: Backend Deployment (Render)

### Step 1: Prepare Backend

1. Ensure `server/package.json` has:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
```

2. Create `.env` file with production values (don't commit this!)

### Step 2: Deploy to Render

1. Go to [Render](https://render.com/)
2. Sign up or log in
3. Click "New +" → "Web Service"
4. Connect your GitHub repository (or use "Public Git repository")
5. Configure:
   - **Name:** furniture-backend
   - **Region:** Choose nearest to your users
   - **Branch:** main
   - **Root Directory:** `server`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

### Step 3: Add Environment Variables

In Render dashboard, go to "Environment" tab and add:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/furniture
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=https://your-frontend-url.vercel.app
```

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Note your backend URL: `https://furniture-backend.onrender.com`

---

## 🎨 PART 4: Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. Update `client/.env`:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

2. Ensure `client/package.json` has:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Sign up or log in with GitHub
3. Click "Add New" → "Project"
4. Import your repository
5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Step 3: Add Environment Variables

In Vercel project settings:
- Go to "Settings" → "Environment Variables"
- Add:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Your site is live! 🎉

---

## 🔄 PART 5: Update Backend with Frontend URL

1. Go back to Render dashboard
2. Update `CLIENT_URL` environment variable:
```
CLIENT_URL=https://your-project.vercel.app
```
3. Render will automatically redeploy

---

## 🌱 PART 6: Seed Database (Optional)

To add sample data:

1. Update `server/utils/seed.js` with your MongoDB URI
2. Run locally:
```bash
cd server
node utils/seed.js
```

Or connect to your server via SSH and run the seed script.

---

## 📱 PART 7: Alternative Deployment Options

### Backend Alternatives

#### Railway
1. Go to [Railway](https://railway.app/)
2. New Project → Deploy from GitHub
3. Add environment variables
4. Deploy

#### Heroku
1. Install Heroku CLI
2. Create new app:
```bash
cd server
heroku create furniture-backend
heroku config:set MONGODB_URI=...
git push heroku main
```

---

### Frontend Alternatives

#### Netlify
1. Go to [Netlify](https://www.netlify.com/)
2. Drag and drop your `client/dist` folder
3. Or connect GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

#### GitHub Pages (Static only)
```bash
cd client
npm run build
# Use a tool like gh-pages to deploy dist folder
```

---

## 🔒 PART 8: Production Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT secret (random 64+ characters)
- [ ] Enable CORS only for your frontend domain
- [ ] Set up rate limiting
- [ ] Use HTTPS only
- [ ] Keep dependencies updated
- [ ] Enable MongoDB access restrictions
- [ ] Set up monitoring and logging
- [ ] Regular database backups
- [ ] Implement proper error handling

---

## 🐛 PART 9: Troubleshooting

### Backend Issues

**"Cannot connect to MongoDB"**
- Check connection string format
- Verify database user password
- Ensure IP whitelist includes 0.0.0.0/0
- Check MongoDB Atlas cluster status

**"CORS Error"**
- Verify `CLIENT_URL` in backend environment
- Check frontend is sending requests to correct backend URL
- Ensure CORS middleware is properly configured

**"Build failed"**
- Check Node version compatibility
- Verify all dependencies are in `package.json`
- Check for syntax errors in code

### Frontend Issues

**"API calls failing"**
- Verify `VITE_API_URL` is set correctly
- Check backend URL is accessible
- Open browser DevTools → Network tab to inspect requests
- Ensure backend CORS allows frontend domain

**"Environment variables not working"**
- Vite requires `VITE_` prefix for environment variables
- Redeploy after changing environment variables
- Clear browser cache

**"Build errors"**
- Check for TypeScript errors (if using TS)
- Verify all imports are correct
- Check for missing dependencies

---

## 📊 PART 10: Monitoring & Maintenance

### Render Monitoring
- Check logs in Render dashboard
- Set up health check endpoint
- Monitor response times

### Vercel Analytics
- Enable Vercel Analytics in project settings
- Monitor page performance
- Track user interactions

### Database Monitoring
- MongoDB Atlas provides built-in monitoring
- Check cluster metrics
- Set up alerts for high usage

---

## 🎯 PART 11: Custom Domain (Optional)

### For Vercel (Frontend)
1. Go to Vercel project settings
2. Domains → Add Domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)

### For Render (Backend)
1. Go to Render service settings
2. Custom Domains → Add Custom Domain
3. Update DNS records as instructed

---

## ✅ Deployment Complete!

Your website should now be live at:
- **Frontend:** https://your-project.vercel.app
- **Backend:** https://furniture-backend.onrender.com

### Next Steps:
1. Test all functionality
2. Update README with live URLs
3. Share with users!
4. Monitor for issues
5. Collect feedback and iterate

---

## 📞 Need Help?

- Check error logs in platform dashboards
- Review this guide again
- Search for specific error messages
- Check platform documentation:
  - [Render Docs](https://render.com/docs)
  - [Vercel Docs](https://vercel.com/docs)
  - [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)

---

**Congratulations! Your MERN stack website is now live! 🎊**
