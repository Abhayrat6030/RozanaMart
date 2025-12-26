# RozanaMart Project Index

## 📁 Complete Project Structure

```
RozanaMart/
│
├── README.md                    # Project overview & features
├── QUICK_START.md              # 5-minute quick start
├── SETUP_GUIDE.md              # Complete setup instructions
├── API_DOCS.md                 # API documentation
├── FEATURES_CHECKLIST.md       # Complete feature list
│
├── frontend/
│   ├── public/
│   │   └── index.html          # HTML entry point
│   ├── src/
│   │   ├── components/
│   │   │   ├── BottomNav.jsx                 # Bottom navigation (5 icons)
│   │   │   ├── Header.jsx                    # Top header with search
│   │   │   ├── ProductCard.jsx               # Product card component
│   │   │   └── QuantitySelector.jsx         # +/- quantity controls
│   │   ├── pages/
│   │   │   ├── HomePage.jsx                 # Home with banners & products
│   │   │   ├── CategoriesPage.jsx           # All categories grid
│   │   │   ├── ProductListingPage.jsx       # Products by category
│   │   │   ├── ProductDetailPage.jsx        # Single product details
│   │   │   ├── CartPage.jsx                 # Shopping cart
│   │   │   ├── CheckoutPage.jsx             # Checkout with address
│   │   │   ├── OrdersPage.jsx               # Order history
│   │   │   ├── OrderTrackingPage.jsx        # Order tracking & rating
│   │   │   ├── ProfilePage.jsx              # User profile
│   │   │   ├── LoginPage.jsx                # Login form
│   │   │   ├── SignupPage.jsx               # Signup form
│   │   │   ├── ForgotPasswordPage.jsx       # Password reset
│   │   │   ├── SearchResultsPage.jsx        # Search results
│   │   │   ├── TermsPage.jsx                # Terms & Conditions
│   │   │   ├── PrivacyPage.jsx              # Privacy Policy
│   │   │   ├── RefundPage.jsx               # Refund Policy
│   │   │   └── CancellationPage.jsx         # Cancellation Policy
│   │   ├── App.jsx                          # Main app component
│   │   ├── store.js                         # Zustand state management
│   │   └── index.css                        # Global styles
│   ├── package.json                         # Frontend dependencies
│   ├── tailwind.config.js                   # Tailwind configuration
│   └── README.md                            # Frontend specific guide
│
├── backend/
│   ├── models/
│   │   ├── User.js                          # User model with auth
│   │   ├── Product.js                       # Product model
│   │   ├── Order.js                         # Order model with payments
│   │   ├── Category.js                      # Category model
│   │   ├── Review.js                        # Review & rating model
│   │   └── Referral.js                      # Referral program model
│   ├── routes/
│   │   ├── auth.js                          # Authentication APIs
│   │   ├── products.js                      # Product catalog APIs
│   │   ├── orders.js                        # Order management APIs
│   │   ├── cart.js                          # Cart APIs
│   │   ├── users.js                         # User profile APIs
│   │   ├── reviews.js                       # Review & rating APIs
│   │   └── admin.js                         # Admin dashboard APIs
│   ├── server.js                            # Express server setup
│   ├── package.json                         # Backend dependencies
│   ├── .env.example                         # Environment variables template
│   └── README.md                            # Backend specific guide
│
├── admin/
│   ├── AdminDashboard.jsx                   # Admin dashboard component
│   ├── package.json                         # Admin panel dependencies
│   └── README.md                            # Admin guide
│
└── docs/
    ├── ARCHITECTURE.md                      # (Optional) System architecture
    ├── DEPLOYMENT.md                        # (Optional) Deployment guide
    └── TESTING.md                           # (Optional) Testing guide
```

---

## 🎯 Quick Navigation

### For Users
- Want to understand the project? → Read [README.md](README.md)
- Want to start immediately? → Read [QUICK_START.md](QUICK_START.md)
- Want detailed setup? → Read [SETUP_GUIDE.md](SETUP_GUIDE.md)

### For Developers
- Need API reference? → Read [API_DOCS.md](API_DOCS.md)
- Want all features list? → Read [FEATURES_CHECKLIST.md](FEATURES_CHECKLIST.md)
- Need deployment info? → Read [SETUP_GUIDE.md](SETUP_GUIDE.md) → Deployment section

### For DevOps
- Need Docker? → (Add docker-compose.yml)
- Need CI/CD? → (Add .github/workflows)
- Need monitoring? → (Add monitoring setup)

---

## 📱 Frontend Pages (15+ Pages)

| Page | Route | Features |
|------|-------|----------|
| Home | `/` | Banners, categories, bestsellers, products, sticky cart |
| Categories | `/categories` | Grid of all categories |
| Product Listing | `/products/:categoryId` | Filter by category, grid layout |
| Product Detail | `/product/:id` | Full product info, similar products, add to cart |
| Cart | `/cart` | Items, quantity, price breakdown, proceed checkout |
| Checkout | `/checkout` | Address, advance payment, COD option |
| Orders | `/orders` | Order history with status |
| Order Tracking | `/orders/:id` | Timeline, rating section, delivery details |
| Profile | `/profile` | User info, referral code, wallet, logout |
| Login | `/login` | Phone + password login |
| Signup | `/signup` | Create account |
| Forgot Password | `/forgot-password` | Password reset via OTP |
| Search Results | `/search` | Search products |
| Terms | `/terms` | Terms & Conditions |
| Privacy | `/privacy` | Privacy Policy |
| Refund | `/refund` | Refund Policy |
| Cancellation | `/cancellation` | Cancellation Policy |

---

## 🔌 Backend APIs (30+)

### Auth (4)
- POST `/auth/signup` - Register user
- POST `/auth/login` - Login user
- GET `/auth/verify` - Verify token
- POST `/auth/forgot-password` - Reset password

### Products (5)
- GET `/products` - Get all products
- GET `/products/:id` - Get single product
- GET `/products/:id/similar` - Similar products
- GET `/products/category/bestsellers` - Bestsellers
- GET `/products/search` - Search products

### Orders (8)
- POST `/orders` - Create order
- GET `/orders/user/:userId` - User orders
- GET `/orders/:id` - Get single order
- PATCH `/orders/:id/status` - Update status (admin)
- POST `/orders/:id/pay-advance` - Pay advance
- POST `/orders/:id/pay-cod` - Pay COD
- POST `/orders/:id/cancel` - Cancel order
- GET `/orders/:id/track` - Track order

### Users (4)
- GET `/users/:id` - Get profile
- PATCH `/users/:id` - Update profile
- GET `/users/:id/wallet` - Get wallet
- POST `/users/:id/referral` - Use referral code

### Reviews (3)
- POST `/reviews/:orderId/review` - Submit review
- GET `/reviews/product/:productId` - Get reviews
- GET `/reviews/user/:userId` - User reviews

### Admin (9)
- POST `/admin/login` - Admin login
- GET `/admin/dashboard` - Dashboard stats
- GET `/admin/orders` - All orders
- GET `/admin/users` - All users
- POST `/admin/products` - Add product
- PATCH `/admin/products/:id` - Edit product
- DELETE `/admin/products/:id` - Delete product
- PATCH `/admin/users/:id/block` - Block user
- GET `/admin/settings` - Get settings

### Referrals (2)
- POST `/referral/use` - Use referral code
- GET `/referral/:code/info` - Get referral info

---

## 🗄️ Database Models (6)

### Users
- name, phone, email
- password (hashed)
- address, lat, lng
- referralCode
- wallet balance
- referred by
- is blocked, cancellation count

### Products
- name, description
- category
- price, mrp, discount %
- weight, unit
- stock
- image URLs
- rating, review count
- is active

### Orders
- orderNumber (unique)
- user ID
- items list
- delivery address
- amounts (subtotal, delivery, advance, COD, total)
- status (pending → delivered)
- payment status
- advance paid, COD paid
- rating, review
- cancellation info

### Categories
- name
- icon, image
- description
- is active

### Reviews
- product ID
- order ID
- user ID
- rating (1-5)
- title, review text
- helpful count
- images
- verified purchase

### Referrals
- referrer ID
- referree ID
- code
- reward amount
- is active, redeemed at

---

## 🎨 Design System

### Colors
- Primary Green: `#22c55e`
- Gray: `#f3f4f6` to `#111827`
- Red: `#ef4444` (alerts)
- Yellow: `#fbbf24` (pending)
- Blue: `#3b82f6` (info)

### Typography
- Font: System default (Segoe UI, SF Pro)
- Sizes: 12px (xs), 14px (sm), 16px (base), 18px (lg), 20px (xl)

### Spacing
- Base unit: 4px
- Components: 4px, 8px, 12px, 16px, 20px, 24px

### Components
- Buttons (primary, secondary, sm)
- Input fields
- Cards
- Badges
- Product cards
- Navigation items

---

## 📦 Tech Stack Summary

### Frontend
```
React 18
├── React Router v6
├── Zustand (state)
├── Tailwind CSS
├── Lucide Icons
├── Axios (HTTP)
├── Framer Motion (animations)
└── Swiper (carousels)
```

### Backend
```
Node.js + Express
├── MongoDB + Mongoose
├── JWT (auth)
├── bcryptjs (hashing)
├── CORS
├── Dotenv
└── Nodemailer (email)
```

---

## 🚀 Key Features

### User-Facing
- ✅ Mobile-first responsive design
- ✅ Bottom navigation bar (always visible)
- ✅ Search with live suggestions
- ✅ Add to cart (animation)
- ✅ Dynamic quantity controls
- ✅ Advanced payment calculation
- ✅ Order tracking (visual timeline)
- ✅ Rating system
- ✅ User authentication
- ✅ Referral program
- ✅ Wallet system
- ✅ Professional design

### Business
- ✅ Advance + COD payment
- ✅ Distance validation (10km)
- ✅ Stock management
- ✅ Admin dashboard
- ✅ Order management
- ✅ Product management
- ✅ User management
- ✅ Analytics ready
- ✅ Legal compliance
- ✅ Referral rewards

---

## 📊 Statistics

| Metric | Count |
|--------|-------|
| Frontend Pages | 17 |
| Components | 5 |
| Backend Routes | 30+ |
| Database Models | 6 |
| API Endpoints | 30+ |
| Total Files | 50+ |
| Total LOC | 5000+ |
| Documentation Pages | 5 |

---

## 🎓 Learning Path

1. **Start Here**: [README.md](README.md)
2. **Quick Setup**: [QUICK_START.md](QUICK_START.md)
3. **Deep Dive**: [SETUP_GUIDE.md](SETUP_GUIDE.md)
4. **API Reference**: [API_DOCS.md](API_DOCS.md)
5. **Feature Check**: [FEATURES_CHECKLIST.md](FEATURES_CHECKLIST.md)

---

## 🛠️ Common Tasks

### Run the App
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm start

# Terminal 3 - Admin (optional)
cd admin && npm start
```

### Add a New Page
1. Create file in `frontend/src/pages/NewPage.jsx`
2. Import in `App.jsx`
3. Add route: `<Route path="/path" element={<NewPage />} />`

### Add a New API Endpoint
1. Create route in `backend/routes/file.js`
2. Import in `server.js`
3. Add: `app.use('/api/path', require('./routes/file'))`

### Deploy Frontend
```bash
cd frontend
npm run build
# Deploy 'build' folder
```

### Deploy Backend
```bash
cd backend
# Push to Heroku/Railway/Vercel
```

---

## 📞 Support

- **Issues?** Check console logs & error messages
- **Questions?** Read documentation
- **Contact**: support@rozanamart.com

---

## 📄 License

MIT License - Use freely

---

## 🎉 You're All Set!

Everything is ready. Start with [QUICK_START.md](QUICK_START.md) and run the app in 5 minutes!

**Happy coding! 🚀**
