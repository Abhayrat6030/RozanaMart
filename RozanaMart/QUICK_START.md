# RozanaMart - Quick Start Guide

Get RozanaMart running in 5 minutes! ⚡

## Prerequisites ✓
- Node.js installed (v14+)
- MongoDB installed or MongoDB Atlas account
- Code editor (VS Code recommended)

## Step 1: Clone or Extract Project
```bash
cd RozanaMart
```

## Step 2: Backend Setup (2 minutes)
```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/rozanamart
JWT_SECRET=dev-secret-key-change-in-production
PORT=5000
```

Start backend:
```bash
npm run dev
```
✅ Backend ready at http://localhost:5000

## Step 3: Frontend Setup (2 minutes)
Open new terminal:
```bash
cd frontend
npm install
npm start
```
✅ Frontend ready at http://localhost:3000

## Step 4: Test the App (1 minute)
1. Open http://localhost:3000 in browser
2. Scroll down → See products
3. Click on a product → View details
4. Click "ADD" → Item added to cart
5. Click "Cart" in bottom nav → See cart
6. Proceed to checkout → Fill details
7. Complete order

## That's It! 🎉

### Key Pages to Explore
- **Home**: http://localhost:3000
- **Categories**: Click Categories in bottom nav
- **Cart**: Click Cart in bottom nav
- **Profile**: Click Profile in bottom nav
- **Orders**: Click Orders in bottom nav

### Test Credentials
- **Signup**: Create new account
- **Login**: Use created account
- **Admin**: Username: admin, Password: admin123

### API Endpoints
All APIs return JSON:

**Products**
```bash
curl http://localhost:5000/api/products
curl http://localhost:5000/api/products/1
```

**Authentication**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"9999999999","password":"password"}'
```

**Orders**
```bash
curl http://localhost:5000/api/orders/user/USER_ID
```

## Troubleshooting

### Port already in use?
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### MongoDB not connecting?
```bash
# Windows - Start MongoDB
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongodb
```

### npm install fails?
```bash
npm cache clean --force
npm install
```

## What's Included

✅ **Complete Frontend**
- 15+ pages fully functional
- Responsive mobile-first design
- Bottom navigation bar (like Blinkit)
- Cart management
- Order tracking
- User authentication
- Profile management

✅ **Complete Backend API**
- User authentication (signup, login, forgot password)
- Product catalog
- Shopping cart
- Order management
- Payment system (advance + COD)
- Review & rating system
- Admin endpoints

✅ **Database Models**
- Users
- Products
- Orders
- Categories
- Reviews
- Referrals

✅ **Admin Dashboard**
- Dashboard with stats
- Order management
- Product management
- User management

## Next Steps

1. ✅ Run the app (you just did this!)
2. ⬜ Explore all features
3. ⬜ Customize colors/content in code
4. ⬜ Add real payment gateway (Stripe/Razorpay)
5. ⬜ Deploy to production
6. ⬜ Launch your business!

## Learn More

- Full Setup Guide: See `SETUP_GUIDE.md`
- API Documentation: See `API_DOCS.md`
- Project Details: See `README.md`

## Need Help?

Check console logs for error messages. Most issues are:
1. MongoDB not running → Start it
2. Port in use → Change PORT in .env
3. API not connecting → Check API_URL in .env

## Contact

support@rozanamart.com

---

**Happy Coding! 🚀 Roz ka saman, ghar tak**
