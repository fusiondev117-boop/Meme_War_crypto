#!/bin/bash

echo "🚀 Installing Optimization Dependencies..."
echo ""

# Navigate to backend
cd backend

echo "📦 Installing security packages..."
npm install express-rate-limit helmet express-mongo-sanitize xss-clean hpp

echo "📦 Installing logging packages..."
npm install winston

echo "📦 Installing performance packages..."
npm install compression

echo "📦 Installing development packages..."
npm install --save-dev jest supertest eslint prettier husky lint-staged

echo ""
echo "✅ All optimization dependencies installed!"
echo ""
echo "Next steps:"
echo "1. Update backend/server.js with new middleware"
echo "2. Replace console.log with structured logging"
echo "3. Test health check endpoints"
echo "4. Configure .env file"
echo ""
echo "See OPTIMIZATION_COMPLETE.md for detailed instructions"
