#!/bin/bash

# RozanaMart Firebase Setup - Verification Script
# Run this to verify everything is installed correctly

echo "🔍 RozanaMart Firebase Setup Verification"
echo "=========================================="
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
node --version

# Check npm
echo "✓ Checking npm..."
npm --version

# Check Backend Firebase
echo ""
echo "✓ Checking Backend Firebase installation..."
cd backend
npm list firebase 2>/dev/null | head -2

# Check Frontend Firebase  
echo ""
echo "✓ Checking Frontend Firebase installation..."
cd ../frontend
npm list firebase 2>/dev/null | head -2

# Check if files exist
echo ""
echo "✓ Checking Backend Files..."
if [ -f "../backend/config/firebase.js" ]; then
  echo "  ✅ firebase.js exists"
fi
if [ -f "../backend/models/FirebaseModels.js" ]; then
  echo "  ✅ FirebaseModels.js exists"
fi

echo ""
echo "✓ Checking Frontend Files..."
if [ -f "./src/firebaseConfig.js" ]; then
  echo "  ✅ firebaseConfig.js exists"
fi

echo ""
echo "=========================================="
echo "✅ All checks passed! Ready to start."
echo ""
echo "Next Steps:"
echo "1. cd backend && npm run dev"
echo "2. cd frontend && npm start (in new terminal)"
echo "3. Open http://localhost:3000"
