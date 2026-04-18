#!/bin/bash

# Task Manager - Installation Script for Linux/Mac

echo "Installing Task Manager Application..."
echo "======================================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not installed. Please install Node.js v14+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js found: $(node -v)"

# Check MongoDB
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB not found locally. You can:"
    echo "   1. Install MongoDB locally"
    echo "   2. Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas"
    echo "   Update MONGODB_URI in backend/.env"
    read -p "Continue? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Install Backend
echo ""
echo "Installing Backend Dependencies..."
cd backend
npm install
cp .env.example .env
echo "✅ Backend ready! Configure MongoDB in backend/.env if needed"

# Install Frontend
echo ""
echo "Installing Frontend Dependencies..."
cd ../frontend
npm install
cp .env.example .env
echo "✅ Frontend ready!"

# Create startup script
echo ""
echo "Creating startup script..."

cat > ../start-dev.sh << 'EOF'
#!/bin/bash

# Start MongoDB (if installed locally)
if command -v mongod &> /dev/null; then
    echo "Starting MongoDB..."
    mongod &
    MONGO_PID=$!
    sleep 2
fi

# Start Backend
echo "Starting Backend..."
cd backend
npm start &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start Frontend
echo "Starting Frontend..."
cd ../frontend
npm start &

echo ""
echo "✅ Application started!"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop"

# Wait for user to stop
wait
EOF

chmod +x ../start-dev.sh

echo "✅ Startup script created: ./start-dev.sh"

echo ""
echo "======================================="
echo "✅ Installation Complete!"
echo ""
echo "Next Steps:"
echo "1. Edit backend/.env with your MongoDB URI"
echo "2. Run: ./start-dev.sh (Mac/Linux)"
echo "3. Or manually:"
echo "   - cd backend && npm start"
echo "   - cd frontend && npm start (new terminal)"
echo "4. Open http://localhost:3000"
echo ""
echo "For Docker: docker-compose up -d"
echo "======================================="
