# Quick Start Guide

Get your Task Manager running in 5 minutes!

## 🎯 Prerequisites

- Node.js (v14+) and npm
- MongoDB (local or MongoDB Atlas account)

## ⚡ Quick Start

### 1. Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file (update MongoDB URI and JWT secret if needed)
# Windows: notepad .env
# Mac/Linux: nano .env

# Start backend
npm start
```

Backend will run on `http://localhost:5000`

### 2. Setup Frontend (New Terminal)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start frontend
npm start
```

Frontend will open on `http://localhost:3000`

## 🎓 First Steps

1. **Register**: Create your account
   - Click "Register" on login page
   - Enter name, email, password
   - Click "Register"

2. **Login**: Access your dashboard
   - Use your credentials
   - You're now in the dashboard

3. **Create Your First Task**:
   - Click "Add New Task" button
   - Fill in task details
   - Select category (Daily, Weekly, Monthly, Yearly)
   - Click "Save Task"

4. **Add Team Members** (Optional):
   - Go to "Users" tab
   - Click "Add New User"
   - Fill in user details
   - Click "Save User"

5. **Assign Tasks to Users**:
   - Click "Edit" on any task
   - Select users to assign
   - Click "Save Task"

## 🎨 Toggle Theme

- Click the sun/moon icon in top-right corner
- Your preference is automatically saved

## 📋 Task Status Options

- **Not Completed**: Default for new tasks
- **Partially Completed**: Set percentage completion
- **Completed**: Mark task as done

## 🚨 Alert Section

- Shows at top of dashboard
- Lists all incomplete tasks
- Helps you stay on track

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: MongooseError connecting to MongoDB
```
**Solution**: Check your MONGODB_URI in .env file

### Backend not found (Frontend Error)
```
Failed to fetch
```
**Solution**: Ensure backend is running on port 5000

### Port Already in Use
```
Error: EADDRINUSE :::5000
```
**Solutions**:
```bash
# Windows: Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux: Find and kill process
lsof -i :5000
kill -9 <PID>
```

### CORS Error
**Solution**: Make sure both servers are running and frontend URL matches backend CORS settings

## 📚 Next Steps

1. Check [README.md](README.md) for complete documentation
2. Review [DEPLOYMENT.md](DEPLOYMENT.md) for production setup
3. Explore more features in the application

## 🆘 Need Help?

- Check README.md for detailed documentation
- Review DEPLOYMENT.md for server setup
- Check browser console (F12) for error messages
- Check backend terminal for API errors

## 🎉 You're All Set!

Enjoy using your Task Manager! 🚀
