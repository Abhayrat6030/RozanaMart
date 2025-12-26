# 🚀 RozanaMart - Live Deployment Guide

Complete guide to deploy RozanaMart to production for real users.

---

## 📌 Deployment Options (Best to Easiest)

### Option 1: **Render + MongoDB Atlas** ⭐ (RECOMMENDED - Free Tier Available)
- Frontend: Render (Free tier: 0.5 CPU, 512MB RAM)
- Backend: Render
- Database: MongoDB Atlas (Free: 512MB)
- **Cost**: Free to start, $7/month when scaling

### Option 2: **Vercel + Railway**
- Frontend: Vercel (Free)
- Backend: Railway (Free $5 credit/month)
- Database: MongoDB Atlas (Free)
- **Cost**: Free tier available

### Option 3: **AWS/DigitalOcean** (Best for Scale)
- Complete control, auto-scaling
- **Cost**: $5-15/month minimum

---

## 🔧 Pre-Deployment Checklist

### Backend Setup
- [ ] Update `.env` with production values:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rozanamart
JWT_SECRET=your-super-secure-random-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=strong-password
```

### Frontend Setup
- [ ] Update `frontend/.env`:
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
REACT_APP_API_BASE_URL=https://your-backend-domain.com
REACT_APP_APP_NAME=RozanaMart
REACT_APP_DEBUG=false
```

- [ ] Build optimized bundle:
```bash
cd frontend
npm run build
```

---

## 📦 Option 1: Render + MongoDB Atlas (Step-by-Step)

### Step 1: Setup MongoDB Atlas (Free Database)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up (free account)
3. Create a new cluster (Free tier)
4. Create database user:
   - Username: `rozanamart`
   - Password: Generate strong password
5. Get connection string: `mongodb+srv://rozanamart:PASSWORD@cluster.mongodb.net/rozanamart`

### Step 2: Deploy Backend to Render

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Fill in:
   - **Name**: `rozanamart-backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Add Environment Variables:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://rozanamart:PASSWORD@cluster.mongodb.net/rozanamart
   JWT_SECRET=your-random-secret-key
   PORT=5000
   ```
7. Click "Create Web Service" and wait (5-10 minutes)
8. **Your backend URL**: `https://rozanamart-backend.onrender.com`

### Step 3: Deploy Frontend to Render

1. Click "New +" → "Static Site"
2. Connect your GitHub repo
3. Fill in:
   - **Name**: `rozanamart-frontend`
   - **Build Command**: `cd frontend && npm run build`
   - **Publish Directory**: `frontend/build`
4. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://rozanamart-backend.onrender.com/api
   ```
5. Click "Create Static Site" and wait (3-5 minutes)
6. **Your frontend URL**: `https://rozanamart-frontend.onrender.com`

### Step 4: Test Live Website
- Open `https://rozanamart-frontend.onrender.com`
- Try: Home → Categories → Add to Cart → Checkout
- Check Network tab if issues

---

## 🔌 Option 2: Vercel + Railway (Quick Setup)

### Backend (Railway)

1. Go to [railway.app](https://railway.app)
2. Login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your RozanaMart repo
5. Select `backend` directory
6. Add variables (same as above)
7. Deploy automatically

**Backend URL**: `https://your-railway-domain.up.railway.app`

### Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repo
4. Select framework: React
5. Set build folder: `frontend/build`
6. Add env variable: `REACT_APP_API_URL=your-railway-backend-url/api`
7. Deploy

**Frontend URL**: `https://rozanamart.vercel.app`

---

## 🐳 Option 3: Docker Deployment (Self-Hosted/AWS EC2)

### Create Dockerfile for Backend

Create `backend/Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

### Create Dockerfile for Frontend

Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Create docker-compose.yml (Root Directory)

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      MONGODB_URI: mongodb+srv://user:pass@cluster.mongodb.net/rozanamart
      JWT_SECRET: your-secret
      NODE_ENV: production
    depends_on:
      - mongo

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  mongo:
    image: mongo:5
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

### Deploy with Docker

```bash
# Build and start
docker-compose up --build

# Access at http://localhost
```

---

## 📊 Performance Optimization

### Frontend Optimization
```javascript
// In frontend/.env for production
REACT_APP_DEBUG=false
```

Build command produces optimized files:
```bash
npm run build
# Creates minified JS/CSS in /build folder
```

### Backend Optimization
- Enable caching headers
- Add request timeout
- Enable compression:

```javascript
// In server.js
const compression = require('compression');
app.use(compression());
```

### Database Optimization
- Create indexes on frequently queried fields
- Use connection pooling (MongoDB Atlas handles this)

---

## 🔒 Security Checklist

Before going live:
- [ ] Change all default passwords
- [ ] Update `JWT_SECRET` to random 32+ character string
- [ ] Enable HTTPS (auto on Render/Vercel/Railway)
- [ ] Set `NODE_ENV=production`
- [ ] Enable CORS only for your frontend domain:

```javascript
// In server.js
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

- [ ] Hide sensitive data (API keys, passwords) in `.env` only
- [ ] Enable rate limiting on auth endpoints

---

## 📈 Monitoring & Maintenance

### Check Logs
- **Render**: Dashboard → Logs tab
- **Vercel**: Dashboard → Activity
- **Railway**: Logs tab

### Common Issues

| Issue | Solution |
|-------|----------|
| Database connection fails | Check MongoDB Atlas IP whitelist (allow all or specific IP) |
| Frontend blank page | Check browser console for API errors; verify REACT_APP_API_URL |
| API 404 errors | Verify backend routes exist; check `/api/health` endpoint |
| Cart not persisting | localStorage works on same domain (no issue in production) |
| Slow load times | Check build output; enable compression in backend |

### Get Performance Stats
```bash
# Frontend
npm run build  # Shows bundle size

# Backend
# Monitor on Render/Railway dashboard
```

---

## 💰 Cost Estimate

| Service | Free Tier | Paid |
|---------|-----------|------|
| Frontend (Vercel) | ✅ Unlimited | - |
| Backend (Render) | ✅ Free tier (spins down after 15 min) | $7/month |
| Database (MongoDB Atlas) | ✅ 512MB | $10/month for 1GB |
| **Total** | **$0/month** | **~$17/month** |

---

## 🚀 Quick Deploy (Render - Recommended)

1. **Push code to GitHub** (if not already)
2. **Create MongoDB Atlas cluster** (5 minutes)
3. **Sign up Render** with GitHub
4. **Deploy backend** (10 minutes)
5. **Deploy frontend** (5 minutes)
6. **Update frontend .env** with backend URL
7. **Test live** (2 minutes)

**Total Time**: ~30 minutes to live website! ✨

---

## 📞 Support

- **Render Docs**: https://docs.render.com
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://railway.app/docs

---

**Status**: Ready to deploy! 🎉
