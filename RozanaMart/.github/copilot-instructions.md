# RozanaMart Copilot Instructions

Guide for AI agents working on the RozanaMart codebase.

## Project Overview

RozanaMart is a **mobile-first local grocery delivery platform** similar to Blinkit/Zepto. It has three distinct layers:

- **Frontend** (React 18 + Tailwind CSS) - Mobile-optimized e-commerce UI
- **Backend** (Node.js/Express + MongoDB) - RESTful API with authentication
- **Admin** (React) - Dashboard for order/product/user management

## Architecture Essentials

### Data Model & Flow
- **User Authentication**: JWT tokens stored in localStorage, phone-based signup/login
- **Cart State**: Managed by Zustand store, persisted to localStorage
- **Products**: Categories → Products → Orders structure in MongoDB
- **Order Lifecycle**: Placed → Confirmed → Out for Delivery → Delivered → Eligible for Rating
- **Key Business Rules**:
  - Advance payment required (₹30-₹300 based on order value)
  - 10km delivery radius validation
  - Only verified buyers (post-delivery) can rate products
  - Referral codes: Format `ROZANA` + last 4 phone digits

### Service Boundaries

| Layer | Responsibility | Key Files |
|-------|-----------------|-----------|
| **Frontend** | UI/UX, client-side state, form validation | `/frontend/src/pages/*`, `/components/*` |
| **Backend** | Data persistence, business logic, auth | `/backend/models/*`, `/routes/*` |
| **Store** | Cross-component state (auth, cart, location) | `/frontend/src/store.js` |

## Frontend Patterns

### Component Organization
- **Pages** mount full screens with Zustand stores (e.g., CartPage uses `useCartStore`)
- **Components** are reusable (ProductCard, QuantitySelector, BottomNav)
- **Styling** uses Tailwind utility classes; avoid custom CSS except `index.css`

### State Management (Zustand)
```javascript
// Example pattern from store.js
export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  login: (user, token) => {
    localStorage.setItem('token', token);
    set({ user, token, isLoggedIn: true });
  },
}));
```
**Pattern**: Use `localStorage` for persistence, Zustand for reactivity. Always sync both.

### Routing
- React Router v6 with route structure in `App.jsx`
- Protected routes implemented via conditional rendering (check `isLoggedIn` in store)
- Query params for search: `/search?q={query}`

### API Integration
- Axios for HTTP requests with JWT token in headers
- Base URL: `http://localhost:5000/api` (frontend)
- Example: `axios.get('/api/products', { headers: { Authorization: `Bearer ${token}` } })`

## Backend Patterns

### API Structure
- REST endpoints in `/routes/*` mapped in `server.js`
- Mongoose schemas in `/models/*` with validation
- Error handling: Consistent JSON responses with `success` flag and error messages

### Authentication
- JWT-based with `exp: 30d`
- Middleware pattern: Protect routes by checking token and populating `req.user`
- Password hashing via bcryptjs (model hooks)

### Database Patterns
```javascript
// Product schema example
name: { type: String, required: true, trim: true },
category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
price: { type: Number, required: true, min: 0 },
stock: { type: Number, required: true, default: 0 }
```
- Use Mongoose refs for relationships (Category, User in Orders)
- Validation at schema level (min/max, required fields)

## Development Workflows

### Starting the Project
```bash
# Terminal 1: Backend
cd backend && npm run dev        # Runs on :5000, watches for changes

# Terminal 2: Frontend
cd frontend && npm start         # Runs on :3000, hot reload enabled
```

### Testing Workflow
- **Manual**: Test via `http://localhost:3000` with browser DevTools
- **API Testing**: Use `curl` or REST client (see API_DOCS.md for examples)
- **Test Account**: Signup flow creates new user; admin access needs config

### Build & Deploy Ready
- Frontend: `npm run build` generates optimized bundle in `/build`
- Backend: Production-ready with error handling, CORS enabled
- Docker support exists (check project root for Dockerfile configs)

## Project-Specific Conventions

### Naming Conventions
- **Components**: PascalCase (`ProductCard.jsx`, `BottomNav.jsx`)
- **Pages**: PascalCase with "Page" suffix (`HomePage.jsx`, `CartPage.jsx`)
- **Routes**: Kebab-case (`/forgot-password`, `/order-tracking/:id`)
- **Zustand stores**: `use{Domain}Store` (`useAuthStore`, `useCartStore`)

### File Structure Rules
- Frontend pages must import from `./components` and `../store`
- Backend routes must require models: `const Product = require('../models/Product')`
- API responses always include `success: boolean` and `error` or `data` fields

### Key Features to Know
1. **Location-Based**: Delivery address stored in `useLocationStore`, validated at checkout
2. **Advance Payment**: Calculated by order value; stored in Order model
3. **Ratings**: Product ratings created only post-delivery (Order status check required)
4. **Cart Persistence**: Items stored in localStorage AND Zustand state for consistency

## Cross-Component Communication

### Frontend Data Flow
- **Global State**: Authentication & cart via Zustand (localStorage-backed)
- **Page Props**: Avoid prop drilling; use stores for deep nesting
- **API Calls**: Each page/component calls endpoints directly (no centralized service)

### Backend Request/Response
- All responses: `{ success: true, data: {...} }` or `{ error: "message" }`
- HTTP Status Codes: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 500 (Server Error)
- Token validation happens per-route (no global middleware implemented)

## Common Tasks

### Add a New Product Feature
1. Update `backend/models/Product.js` schema
2. Create `/api/products` route handler in `backend/routes/products.js`
3. Add React component in `frontend/src/pages/` or `frontend/src/components/`
4. Wire to store if cross-page state needed
5. Test with browser DevTools Network tab

### Add a User Feature (Profile, Settings)
1. Extend `backend/models/User.js` model
2. Create route in `backend/routes/users.js` with token validation
3. Create form component in `frontend/src/pages/ProfilePage.jsx`
4. Update `useAuthStore` if state is global

### Fix a Cart/Checkout Issue
1. Check `useCartStore` logic in `frontend/src/store.js`
2. Verify cart → checkout flow in `frontend/src/pages/CartPage.jsx` and `frontend/src/pages/CheckoutPage.jsx`
3. Backend: Review order creation in `backend/routes/orders.js`
4. Validate advance payment calculation logic

## Documentation References
- **API Endpoints**: See `API_DOCS.md` for complete endpoint list
- **Features**: `FEATURES_CHECKLIST.md` for progress tracking
- **Setup**: `QUICK_START.md` for environment setup
- **Deployment**: `READY_TO_LAUNCH.md` for production checklist

## Debugging Tips

- **Frontend**: React DevTools + Network tab for API calls
- **Backend**: `console.log` or enable debug logs via `.env` NODE_ENV
- **Database**: Check MongoDB with `mongosh` or MongoDB Atlas UI
- **Auth Issues**: Verify JWT_SECRET matches between client axios calls and backend `.env`
- **CORS Errors**: Backend `cors()` middleware is enabled; check endpoint paths
