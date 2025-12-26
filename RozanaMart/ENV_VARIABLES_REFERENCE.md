# ========================================
# ROZANAMART - ENVIRONMENT VARIABLES
# ========================================

# Copy this to your .env files on Vercel & Render
# DO NOT commit actual values to GitHub!

# ========================================
# VERCEL (Frontend) - .env.local or .env.production
# ========================================

# API Configuration
REACT_APP_API_URL=https://rozanamart-backend.render.com
REACT_APP_API_TIMEOUT=10000

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=AIzaSyAihxHDAeJbL2pGiVS4-XHLK9XS0EHJ6RM
REACT_APP_FIREBASE_AUTH_DOMAIN=auto-call-app-1a6d6.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://auto-call-app-1a6d6-default-rtdb.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=auto-call-app-1a6d6
REACT_APP_FIREBASE_STORAGE_BUCKET=auto-call-app-1a6d6.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=476654564065
REACT_APP_FIREBASE_APP_ID=1:476654564065:web:1234567890abcdef

# Analytics (Optional)
REACT_APP_GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X

# Environment
REACT_APP_ENV=production

# ========================================
# RENDER (Backend) - Set in Render Dashboard
# ========================================

# Node Configuration
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345!@#$%
JWT_EXPIRE=30d

# Firebase Configuration
FIREBASE_API_KEY=AIzaSyAihxHDAeJbL2pGiVS4-XHLK9XS0EHJ6RM
FIREBASE_AUTH_DOMAIN=auto-call-app-1a6d6.firebaseapp.com
FIREBASE_DATABASE_URL=https://auto-call-app-1a6d6-default-rtdb.firebaseio.com
FIREBASE_PROJECT_ID=auto-call-app-1a6d6
FIREBASE_STORAGE_BUCKET=auto-call-app-1a6d6.appspot.com
FIREBASE_MESSAGING_SENDER_ID=476654564065
FIREBASE_APP_ID=1:476654564065:web:1234567890abcdef

# CORS Configuration
CORS_ORIGIN=https://rozanamart.vercel.app

# Database Configuration (Optional - if using MongoDB alongside Firebase)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rozanamart?retryWrites=true&w=majority

# Email Configuration (Optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@rozanamart.com

# Payment Gateway (Optional - for future payment integration)
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
STRIPE_PUBLIC_KEY=pk_live_xxxxxxxxxxxxx
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_SECRET_KEY=xxxxxxxxxxxxx

# AWS S3 Configuration (Optional - for image storage)
AWS_ACCESS_KEY_ID=xxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxx
AWS_S3_BUCKET_NAME=rozanamart-images
AWS_REGION=us-east-1

# Redis Configuration (Optional - for advanced caching)
REDIS_HOST=redis-host.com
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password
REDIS_DB=0

# Logging Configuration
LOG_LEVEL=info
LOG_FORMAT=combined

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_REVIEWS=true
ENABLE_REFERRALS=true
ENABLE_PAYMENTS=false

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# API Configuration
API_TIMEOUT=10000
MAX_JSON_SIZE=50mb

# ========================================
# HOW TO SET THESE ON VERCEL
# ========================================

/*
1. Go to Vercel Dashboard
2. Select your "rozanamart" project
3. Go to Settings → Environment Variables
4. Add each variable:
   - Name: REACT_APP_API_URL
   - Value: https://rozanamart-backend.render.com
   - Environments: Production, Preview, Development
5. Click "Save"
6. Repeat for all REACT_APP_* variables
7. Redeploy for changes to take effect
*/

# ========================================
# HOW TO SET THESE ON RENDER
# ========================================

/*
1. Go to Render Dashboard
2. Select your "rozanamart-backend" service
3. Go to Settings → Environment
4. Add each variable:
   - Key: NODE_ENV
   - Value: production
5. Click "Save Changes"
6. Repeat for all variables
7. Service will auto-redeploy
*/

# ========================================
# IMPORTANT SECURITY NOTES
# ========================================

/*
🔐 SECURITY CHECKLIST:
✅ Never commit .env file to GitHub
✅ Add .env to .gitignore
✅ Firebase keys can be public (they're restricted by rules)
✅ JWT_SECRET must be strong (use: https://strongpasswordgenerator.com)
✅ Store sensitive keys (API keys) in environment variables only
✅ Use different secrets for dev, staging, and production
✅ Rotate keys periodically (monthly recommended)
✅ Monitor Firebase quota usage in console

In .gitignore, make sure you have:
.env
.env.local
.env.*.local
*/

# ========================================
# TESTING VALUES (For Local Development)
# ========================================

# For frontend/.env.local (development):
REACT_APP_API_URL=http://localhost:3000
REACT_APP_ENV=development

# For backend/.env (development):
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:3000

# ========================================
# PRODUCTION VALUES (For Deployment)
# ========================================

# Always make sure production values are different
# and more secure than development values!

# Never use localhost or 0.0.0.0 in production
# Always use HTTPS URLs
# Always use strong secrets

# ========================================
# MONITORING & LOGGING
# ========================================

/*
After deployment, monitor:
1. Vercel Analytics: Dashboard → Analytics
2. Render Logs: Dashboard → Logs
3. Firebase Console: Console → Database Usage
4. Check for:
   - 404 errors (missing endpoints)
   - 500 errors (server issues)
   - Slow database queries
   - High CPU usage
   - Memory leaks
*/

# ========================================
# SCALING CONFIGURATION
# ========================================

# If traffic grows:

# 1. Render: Upgrade from Free to Pro ($7/month)
# 2. Vercel: Upgrade for better performance ($20/month)
# 3. Firebase: Adjust pricing plan based on usage
# 4. Add Redis caching (Heroku Redis or similar)
# 5. Enable CDN for static assets (Cloudflare - free)

# ========================================
# NEXT STEPS
# ========================================

/*
1. ✅ Copy REACT_APP_* variables to Vercel
2. ✅ Copy other variables to Render
3. ✅ Test that frontend connects to backend
4. ✅ Check browser console for errors
5. ✅ Check Render logs for errors
6. ✅ Monitor performance
7. ✅ Celebrate! 🎉
*/
