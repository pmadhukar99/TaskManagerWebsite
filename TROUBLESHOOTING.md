# Common Issues & Troubleshooting

## Installation Issues

### Node.js Not Found
**Error**: `'npm' is not recognized` or `node: command not found`

**Solution**:
1. Download Node.js from https://nodejs.org (LTS version)
2. Install with default settings
3. Restart terminal
4. Run `node -v` to verify

### npm Package Installation Fails
**Error**: `ERESOLVE unable to resolve dependency tree`

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Install dependencies with legacy peer deps
npm install --legacy-peer-deps
```

### Permission Denied (Mac/Linux)
**Error**: `permission denied` when running scripts

**Solution**:
```bash
# Make script executable
chmod +x install.sh
chmod +x start-dev.sh

# Run script
./install.sh
```

---

## MongoDB Connection Issues

### Connection Refused
**Error**: `MongooseError: connect ECONNREFUSED 127.0.0.1:27017`

**Solution 1 - Local MongoDB**:
```bash
# Windows: Start MongoDB service
net start MongoDB

# Mac: Using Homebrew
brew services start mongodb-community

# Linux: Using systemctl
sudo systemctl start mongod
```

**Solution 2 - MongoDB Atlas (Cloud)**:
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager
```

### Database Already in Use
**Error**: `error: listen EADDRINUSE :::27017`

**Solution**:
```bash
# Windows: Find and kill process
netstat -ano | findstr :27017
taskkill /PID <PID> /F

# Mac/Linux: Find and kill process
lsof -i :27017
kill -9 <PID>
```

---

## Backend Issues

### Backend Won't Start
**Error**: `Error: EADDRINUSE :::5000`

**Solution**: Port 5000 is in use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Environment Variables Not Found
**Error**: Warnings about JWT_SECRET or MONGODB_URI

**Solution**:
1. Ensure `.env` file exists in `backend` directory
2. Copy from `.env.example`:
```bash
cd backend
cp .env.example .env
```
3. Edit `.env` with your settings

### API Returns 500 Error
**Solution**:
1. Check backend console for error message
2. Verify `.env` file is set correctly
3. Check MongoDB connection
4. Review request payload in browser DevTools

---

## Frontend Issues

### Cannot Connect to Backend
**Error**: `Failed to fetch` or `Cannot reach backend`

**Solution**:
1. Verify backend is running: `http://localhost:5000`
2. Check `frontend/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```
3. Restart frontend: `npm start`
4. Clear browser cache (Ctrl+Shift+Delete)

### CORS Error
**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
1. Ensure both servers are running
2. Backend CORS is configured for frontend URL
3. Check browser console for exact error
4. Backend issue? Check if http://localhost:5000/api/health works

### Frontend Won't Load
**Error**: Blank page or errors in console

**Solution**:
1. Check browser console: F12 → Console tab
2. Clear browser cache
3. Try incognito/private window
4. Verify frontend running: http://localhost:3000
5. Stop and restart frontend

### Theme Not Persisting
**Issue**: Dark mode reverts to light mode

**Solution**:
1. Check localStorage isn't disabled
2. Browser settings → Privacy → Allow site data storage
3. Check .env for API URL issues

---

## Authentication Issues

### Cannot Login
**Error**: "Invalid credentials" or login fails

**Solution**:
1. Verify user exists in database
2. Check password spelling
3. Try registering new user
4. Check MongoDB connection

### Cannot Register
**Error**: "User already exists" or email error

**Solution**:
1. Use unique email address
2. Clear browser localStorage
3. Check MongoDB for duplicate user
4. Restart backend

### Session Lost (Logged Out Unexpectedly)
**Error**: Redirected to login page

**Solution**:
1. JWT token expired (normal after 30 days)
2. Log in again
3. Check browser localStorage hasn't cleared
4. Check if backend is still running

### Token Errors
**Error**: "Invalid token" or authentication failed

**Solution**:
```bash
# Clear browser localStorage
# Open browser DevTools → Application → Local Storage
# Clear all entries
# Refresh page and login again
```

---

## Database Issues

### Database Gets Too Large
**Issue**: Slow performance or disk space

**Solution**:
1. Delete old/completed tasks
2. Archive old data
3. Optimize MongoDB indexes
4. Consider database cleanup script

### Data Not Saving
**Issue**: Create task but it doesn't appear

**Solution**:
1. Check browser console for errors
2. Verify MongoDB is connected
3. Check `.env` MONGODB_URI
4. Restart backend

### Cannot See Other Users' Tasks
**Issue**: Tasks only visible to creator

**Note**: This is current design (no permission system yet)
**Future Enhancement**: Add permission system

---

## Performance Issues

### Slow Task Loading
**Solution**:
1. Check internet connection
2. Verify MongoDB performance
3. Try refreshing page
4. Check browser resources (DevTools)
5. Look for error messages

### High Memory Usage
**Solution**:
1. Close other applications
2. Restart Node.js processes
3. Clear browser cache
4. Check for memory leaks in console

### Slow API Responses
**Solution**:
1. Check backend logs
2. Verify MongoDB connection speed
3. Check if backend is hanging
4. Restart backend

---

## Docker Issues

### Docker Container Won't Start
**Error**: `docker-compose: command not found`

**Solution**:
1. Install Docker Desktop
2. Ensure Docker is running
3. Check installation: `docker --version`

### Container Cannot Connect to MongoDB
**Error**: `MongoError: connection refused`

**Solution**:
1. Ensure MongoDB container is running
2. Check container names in docker-compose.yml
3. View logs: `docker-compose logs mongodb`

### Port Already in Use
**Error**: `Bind for 0.0.0.0:3000 failed`

**Solution**:
```bash
# Stop all containers
docker-compose down

# Or kill specific container
docker kill <container-id>
```

---

## Browser Issues

### Refresh Causes Logout
**Issue**: Page refreshes and you're logged out

**Solution**:
1. Token is lost
2. Add state persistence to frontend
3. Currently designed this way (can be improved)

### Dark Mode Not Working
**Issue**: Theme toggle does nothing

**Solution**:
1. JavaScript disabled? Enable it
2. Check browser console for errors
3. Clear localStorage
4. Restart browser

### Cannot Upload Due Date
**Issue**: Date picker won't open

**Solution**:
1. Click on date input field
2. Browser might not support input type="date"
3. Use different browser
4. Manual date entry works in most cases

---

## Testing & Debugging

### View API Responses
1. Open DevTools: F12
2. Go to Network tab
3. Perform action (create task)
4. Click request in list
5. View Response tab

### Check Backend Logs
1. Look at terminal running backend
2. See what API calls are being made
3. Check error messages
4. Restart backend if hanging

### Check Frontend Logs
1. Open DevTools: F12
2. Go to Console tab
3. Look for errors (red text)
4. Check Network tab for failed requests

### Database Check (MongoDB)
```bash
# Connect to MongoDB
mongosh

# List databases
show databases

# Use task-manager DB
use task-manager

# List collections
show collections

# Check users
db.users.find()

# Check tasks
db.tasks.find()
```

---

## Getting More Help

1. **Error Message**: Read it carefully, it usually says the problem
2. **Browser Console**: F12 → Console tab - shows JavaScript errors
3. **Backend Terminal**: Shows API and database errors
4. **Check Logs**: Look at server output for clues
5. **Stack Overflow**: Search error message
6. **GitHub Issues**: Check if it's a known issue

---

## Report Issues

When reporting an issue, include:
1. Error message (exact text)
2. Steps to reproduce
3. Operating system
4. Browser version
5. Backend logs
6. Frontend console errors

---

## Quick Fix Checklist

- [ ] Restart Node.js processes
- [ ] Check .env files
- [ ] Verify MongoDB running
- [ ] Clear browser cache
- [ ] Check console for errors
- [ ] Verify ports not in use
- [ ] Try different browser
- [ ] Restart computer

---

## Contact Support

For persistent issues:
1. Check all troubleshooting steps above
2. Review ARCHITECTURE.md for system understanding
3. Check existing GitHub issues
4. Create new issue with all details

