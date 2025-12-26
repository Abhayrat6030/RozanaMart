# RozanaMart - Complete Setup & Deployment Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Frontend Setup](#frontend-setup)
3. [Backend Setup](#backend-setup)
4. [Database Setup](#database-setup)
5. [Admin Panel Setup](#admin-panel-setup)
6. [Running the Application](#running-the-application)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- **Node.js** v14 or higher
- **npm** v6 or higher (comes with Node.js)
- **MongoDB** v4.4 or higher
- **Git** (optional, for version control)

### System Requirements
- **RAM**: 2GB minimum
- **Disk Space**: 500MB
- **OS**: Windows, macOS, or Linux

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory
```bash
cd RozanaMart/frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- React 18
- React Router v6
- Tailwind CSS
- Zustand
- Lucide Icons
- Axios
- And other dependencies

### Step 3: Verify Installation
```bash
npm list
```

Should show all packages installed successfully.

### Step 4: Create Environment File (Optional)
Create `.env` file in frontend root:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=RozanaMart
```

### Step 5: Start Development Server
```bash
npm start
```

Frontend will run on: `http://localhost:3000`

### Frontend Features Ready
- ✅ Home page with products
- ✅ Search functionality
- ✅ Category browsing
- ✅ Cart management
- ✅ Checkout flow
- ✅ Order tracking
- ✅ User authentication pages
- ✅ Profile management
- ✅ Legal pages (Terms, Privacy, etc.)

---

## Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd RozanaMart/backend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- Express
- MongoDB/Mongoose
- JWT
- bcryptjs
- CORS
- Dotenv
- And other packages

### Step 3: Setup Environment Variables
Create `.env` file in backend root:
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/rozanamart

# JWT
JWT_SECRET=your-super-secret-key-change-this-in-production

# Payment Integration (add later)
STRIPE_SECRET=sk_test_your_key

# Email (add later)
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Step 4: Start Development Server
```bash
npm run dev
```

Backend will run on: `http://localhost:5000`

### API Health Check
```bash
curl http://localhost:5000/api/health
```

Should return: `{"status":"OK","message":"Server is running"}`

---

## Database Setup

### Option 1: Local MongoDB

#### Windows
1. Download MongoDB Community Edition
2. Run installer and follow setup
3. MongoDB runs on `localhost:27017`

#### macOS
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Option 2: MongoDB Atlas (Cloud)

1. Go to `https://www.mongodb.com/cloud/atlas`
2. Create free account
3. Create cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env`

### Seed Initial Data (Optional)

Create a script file `backend/seed.js`:
```javascript
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const categories = [
  { name: 'Vegetables & Fruits', icon: '🥬' },
  { name: 'Atta, Rice & Dal', icon: '🌾' },
  { name: 'Oil, Ghee & Masala', icon: '🫒' },
  { name: 'Dairy, Bread & Eggs', icon: '🥛' },
  { name: 'Snacks & Drinks', icon: '🥤' },
];

const products = [
  { name: 'Onion', weight: '1 kg', price: 35, mrp: 50, discount: 30 },
  { name: 'Tomato', weight: '500g', price: 28, mrp: 40, discount: 30 },
  // ... more products
];

async function seed() {
  try {
    await Category.insertMany(categories);
    await Product.insertMany(products);
    console.log('Seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
```

Run with: `node seed.js`

---

## Admin Panel Setup

### Step 1: Navigate to Admin Directory
```bash
cd RozanaMart/admin
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Admin Dashboard
```bash
npm start
```

Admin runs on: `http://localhost:3001`

### Login Credentials
- **Username**: admin
- **Password**: admin123

---

## Running the Application

### Complete Setup (All 3 Services)

**Terminal 1 - Backend:**
```bash
cd RozanaMart/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd RozanaMart/frontend
npm start
```

**Terminal 3 - Admin (Optional):**
```bash
cd RozanaMart/admin
npm start
```

### Access Points
- **User App**: http://localhost:3000
- **Admin Panel**: http://localhost:3001
- **API**: http://localhost:5000/api

---

## Testing the Application

### 1. User Signup/Login
1. Go to http://localhost:3000
2. Click Profile → Sign Up
3. Enter name, phone, password
4. Should redirect to home

### 2. Browse Products
1. Click on category from bottom nav
2. Select a category
3. Should show products

### 3. Add to Cart
1. Click "ADD" button on any product
2. Cart badge should show count
3. Quantity controls should appear

### 4. Complete Checkout
1. Click Cart from bottom nav
2. Click "Proceed to Checkout"
3. Fill delivery address
4. Click "Pay Now"

### 5. View Orders
1. Click Orders from bottom nav
2. Should show your orders
3. Click order to see tracking

### 6. Admin Panel
1. Go to http://localhost:3001
2. Use admin credentials
3. View orders, stats, manage products

---

## Deployment

### Frontend Deployment (Vercel/Netlify)

#### Vercel
```bash
npm install -g vercel
cd frontend
vercel --prod
```

#### Netlify
```bash
npm run build
# Deploy 'build' folder to Netlify
```

### Backend Deployment (Heroku/Railway)

#### Heroku
```bash
npm install -g heroku
heroku login
heroku create rozanamart-api
git push heroku main
```

#### Railway.app
```bash
npm install -g @railway/cli
railway login
railway up
```

### Database Deployment
- Use MongoDB Atlas (Free tier available)
- Update connection string in `.env`

### Environment Variables (Production)
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/rozanamart
JWT_SECRET=your-super-secret-key-generate-secure-one
PORT=5000
```

### Build Commands
Frontend:
```bash
cd frontend
npm run build
# Deploy 'build' folder
```

Backend:
```bash
cd backend
npm run build # if using TypeScript
```

---

## Troubleshooting

### Issue: "MongoDB Connection Failed"
**Solution:**
1. Ensure MongoDB is running: `mongod`
2. Check `MONGODB_URI` in `.env`
3. Verify database URL is correct

### Issue: "CORS Error"
**Solution:**
Frontend `.env`:
```env
REACT_APP_API_URL=http://localhost:5000
```

Backend will have CORS enabled automatically.

### Issue: "Port Already in Use"
**Solution:**
```bash
# Find process using port
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### Issue: "npm install fails"
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### Issue: "React Component Not Rendering"
**Solution:**
1. Check browser console for errors
2. Clear cache: Ctrl+Shift+Delete
3. Restart development server

### Issue: "Authentication Not Working"
**Solution:**
1. Check JWT_SECRET in backend `.env`
2. Verify token in browser localStorage
3. Check browser Network tab for API calls

---

## Performance Optimization

### Frontend
```bash
# Build optimized production version
npm run build

# Analyze bundle size
npm install -g webpack-bundle-analyzer
npm run build
```

### Backend
- Enable response compression
- Use database indexes
- Implement caching (Redis)
- Use CDN for images

### Database
```javascript
// Add indexes
db.products.createIndex({ category: 1 })
db.orders.createIndex({ user: 1, createdAt: -1 })
```

---

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use HTTPS for API calls
- [ ] Add rate limiting
- [ ] Validate all user inputs
- [ ] Hide sensitive data from frontend
- [ ] Use environment variables
- [ ] Enable CORS correctly
- [ ] Hash all passwords
- [ ] Add request validation
- [ ] Monitor error logs

---

## Support & Resources

- **Documentation**: See README.md
- **API Docs**: In code comments
- **Issues**: Check GitHub issues
- **Email**: support@rozanamart.com

---

## Next Steps

1. ✅ Setup complete
2. ✅ Test all features
3. ⬜ Connect real payment gateway (Stripe/Razorpay)
4. ⬜ Setup WhatsApp integration
5. ⬜ Add Google Maps API
6. ⬜ Deploy to production
7. ⬜ Monitor with analytics
8. ⬜ Gather user feedback

---

**Happy Coding! 🚀**
