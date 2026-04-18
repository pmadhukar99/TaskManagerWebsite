# Verification Checklist

Use this checklist to verify your Task Manager installation is complete and working.

## ✅ Prerequisites

- [ ] Node.js installed (check: `node -v`)
- [ ] npm installed (check: `npm -v`)
- [ ] MongoDB installed OR MongoDB Atlas account created
- [ ] Git installed (optional)

## ✅ Installation

- [ ] Backend folder exists with files
- [ ] Frontend folder exists with files
- [ ] `backend/package.json` exists
- [ ] `frontend/package.json` exists
- [ ] `backend/.env` file created from .env.example
- [ ] `frontend/.env` file created from .env.example
- [ ] `backend/node_modules` installed (run `npm install` in backend)
- [ ] `frontend/node_modules` installed (run `npm install` in frontend)

## ✅ Backend Setup

- [ ] `backend/server.js` exists and has content
- [ ] `backend/models/User.js` exists
- [ ] `backend/models/Task.js` exists
- [ ] `backend/controllers/userController.js` exists
- [ ] `backend/controllers/taskController.js` exists
- [ ] `backend/routes/users.js` exists
- [ ] `backend/routes/tasks.js` exists
- [ ] MongoDB URI in `backend/.env` is correct
- [ ] JWT_SECRET in `backend/.env` is set
- [ ] `npm start` works in backend directory (no errors)
- [ ] Backend runs on port 5000

## ✅ Frontend Setup

- [ ] `frontend/src/App.js` exists
- [ ] `frontend/src/App.css` exists
- [ ] `frontend/src/index.js` exists
- [ ] `frontend/public/index.html` exists
- [ ] All components exist in `frontend/src/components/`:
  - [ ] Navbar.js
  - [ ] AuthPage.js
  - [ ] TaskDashboard.js
  - [ ] TaskItem.js
  - [ ] TaskModal.js
  - [ ] UserManagement.js
  - [ ] UserModal.js
- [ ] `npm start` works in frontend directory (no errors)
- [ ] Frontend runs on port 3000
- [ ] Frontend opens in browser automatically

## ✅ Application Testing

### Authentication
- [ ] Registration page loads
- [ ] Can register new account
- [ ] Can login with credentials
- [ ] Dashboard appears after login
- [ ] User name shows in navbar
- [ ] Logout button works

### Task Management
- [ ] "Add New Task" button visible
- [ ] Task modal opens when clicked
- [ ] Can fill task form
- [ ] Can select category (Daily, Weekly, Monthly, Yearly)
- [ ] Can set priority (Low, Medium, High)
- [ ] Can set status (Not Completed, Partially Completed, Completed)
- [ ] Can add due date
- [ ] Can add notes
- [ ] Can save task
- [ ] Task appears in correct category section
- [ ] Can edit task
- [ ] Can delete task
- [ ] Can mark task complete

### Alert System
- [ ] Alert section visible when incomplete tasks exist
- [ ] Alert shows task count
- [ ] Alert lists incomplete tasks
- [ ] Alert shows due dates

### User Management
- [ ] Users tab exists
- [ ] "Add New User" button works
- [ ] Can create new user
- [ ] User appears in list
- [ ] Can edit user
- [ ] Can delete user
- [ ] Users appear in task assignment dropdown

### Theme
- [ ] Sun/Moon icon visible in navbar
- [ ] Click toggles between light and dark mode
- [ ] Colors change appropriately
- [ ] Theme persists after page refresh

### Multi-User Features
- [ ] Can assign task to multiple users
- [ ] Assigned users shown on task
- [ ] Users can see tasks assigned to them

## ✅ Database

- [ ] MongoDB is running
- [ ] Connection string in `.env` is correct
- [ ] Tasks are saved to database
- [ ] Users are saved to database
- [ ] Can verify in MongoDB:
  ```bash
  use task-manager
  db.users.find()
  db.tasks.find()
  ```

## ✅ API Endpoints

Test these endpoints using a tool like Postman or curl:

### User Endpoints
- [ ] `POST /api/users/register` - Creates user ✅
- [ ] `POST /api/users/login` - Returns token ✅
- [ ] `GET /api/users` - Lists users ✅
- [ ] `GET /api/users/:id` - Gets user ✅
- [ ] `PUT /api/users/:id` - Updates user ✅
- [ ] `DELETE /api/users/:id` - Deletes user ✅

### Task Endpoints
- [ ] `POST /api/tasks` - Creates task ✅
- [ ] `GET /api/tasks` - Lists tasks ✅
- [ ] `GET /api/tasks/:id` - Gets task ✅
- [ ] `GET /api/tasks/incomplete` - Lists incomplete ✅
- [ ] `PUT /api/tasks/:id` - Updates task ✅
- [ ] `DELETE /api/tasks/:id` - Deletes task ✅

## ✅ Documentation

- [ ] README.md exists and has content
- [ ] QUICKSTART.md exists
- [ ] DEPLOYMENT.md exists
- [ ] ARCHITECTURE.md exists
- [ ] FEATURES.md exists
- [ ] TROUBLESHOOTING.md exists
- [ ] INDEX.md exists

## ✅ Docker

- [ ] docker-compose.yml exists
- [ ] Dockerfile exists in backend
- [ ] Dockerfile exists in frontend
- [ ] Docker installed: `docker --version`
- [ ] Docker Compose installed: `docker-compose --version`
- [ ] Can run: `docker-compose up -d` (optional)
- [ ] Containers start without errors (optional)

## ✅ Configuration Files

- [ ] `.gitignore` in root
- [ ] `.gitignore` in backend
- [ ] `.gitignore` in frontend
- [ ] `.env.example` in backend
- [ ] `.env.example` in frontend
- [ ] `.env` files created (with your values)

## ✅ Installation Scripts

- [ ] `install.cmd` exists (Windows)
- [ ] `install.sh` exists (Mac/Linux)
- [ ] Scripts are executable

## ✅ Error Handling

### No Errors When
- [ ] Registering user
- [ ] Logging in
- [ ] Creating task
- [ ] Editing task
- [ ] Deleting task
- [ ] Creating user
- [ ] Editing user
- [ ] Deleting user
- [ ] Toggling theme
- [ ] Assigning tasks

### Error Messages Display Correctly
- [ ] Login error shows for wrong password
- [ ] Registration error shows for duplicate email
- [ ] Network error shows when backend unavailable
- [ ] Validation errors show for empty fields

## ✅ Performance

- [ ] Page loads in < 2 seconds
- [ ] Task operations respond in < 1 second
- [ ] No console errors (F12)
- [ ] No memory leaks in DevTools
- [ ] Smooth theme transitions
- [ ] Responsive on mobile (test with F12 Device Mode)

## ✅ Browser Compatibility

Test in at least 2 browsers:
- [ ] Google Chrome
- [ ] Firefox
- [ ] Safari (if Mac)
- [ ] Edge (if Windows)

## ✅ Security

- [ ] Passwords are hashed in database (check with: `db.users.findOne()`)
- [ ] Token is created on login
- [ ] Token stored in localStorage
- [ ] Logout clears token
- [ ] Cannot access dashboard without token
- [ ] CORS is configured
- [ ] Environment variables not exposed

## ✅ Responsive Design

- [ ] Layout works on mobile (F12 Device Mode)
- [ ] Buttons are clickable on touch
- [ ] Text is readable on small screens
- [ ] Forms work on mobile
- [ ] Theme toggle works on mobile
- [ ] Modal closes properly on mobile

## ✅ Final Verification

- [ ] Can complete full workflow:
  1. Register
  2. Create tasks
  3. Add users
  4. Assign tasks
  5. Edit tasks
  6. Mark complete
  7. Toggle theme
  8. Logout & login

## 📋 Troubleshooting Checks

If something doesn't work:
- [ ] Check browser console: F12 → Console
- [ ] Check backend terminal for errors
- [ ] Verify .env files are configured
- [ ] Verify MongoDB is running
- [ ] Try page refresh
- [ ] Try browser hard refresh: Ctrl+Shift+R
- [ ] Clear browser cache
- [ ] Restart backend and frontend
- [ ] Check TROUBLESHOOTING.md

## 🎉 Success Criteria

Your Task Manager is working if:
- ✅ All checks above are complete
- ✅ No errors in browser console
- ✅ No errors in backend terminal
- ✅ Can register and login
- ✅ Can create, edit, delete tasks
- ✅ Can manage users
- ✅ Can toggle theme
- ✅ Can see alert section
- ✅ Multi-user features work

## 📈 Next Steps

Once verified:
1. ✅ Learn all features (see FEATURES.md)
2. ✅ Try Docker deployment
3. ✅ Review code and customize
4. ✅ Deploy to production (see DEPLOYMENT.md)
5. ✅ Scale and add features

---

**Verification Date**: _____________
**All Tests Passed**: ☐ Yes ☐ No

If all checks pass, your Task Manager is **ready to use**! 🎉

For any issues, refer to TROUBLESHOOTING.md or the relevant documentation.
