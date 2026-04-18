# Task Manager Website

A comprehensive task management application built with React, Node.js/Express, and MongoDB. Features light/dark mode, multi-user support, and task categorization.

## 🚀 Features

- **Light & Dark Mode**: Toggle between light and dark themes
- **User Management**: Create, edit, and manage multiple users
- **Task Categories**: Organize tasks into Daily, Weekly, Monthly, and Yearly
- **Task Status Tracking**: 
  - Not Completed
  - Partially Completed (with percentage completion)
  - Completed
- **Multi-User Assignment**: Assign tasks to multiple users
- **Task Alerts**: Real-time alerts for pending/incomplete tasks
- **Authentication**: Secure login and registration with JWT
- **Responsive Design**: Works on desktop and mobile devices

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas cloud)

## 🛠️ Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB URI and JWT secret:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_secure_jwt_secret_key
NODE_ENV=development
```

5. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend will be running at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## 📱 Usage

### First Time Setup

1. **Register**: Create a new account by entering your name, email, and password
2. **Login**: Log in with your credentials
3. **Create Users**: Go to the Users tab and add team members
4. **Create Tasks**: Click "Add New Task" and fill in the task details

### Creating a Task

1. Click "Add New Task" button
2. Fill in:
   - **Title**: Task name (required)
   - **Description**: Task details
   - **Category**: Select Daily, Weekly, Monthly, or Yearly
   - **Priority**: Low, Medium, or High
   - **Status**: Not Completed, Partially Completed, or Completed
   - **Completion %**: Only shown if partially completed
   - **Notes**: Additional notes
   - **Due Date**: Task deadline
   - **Assign to Users**: Select one or more users
3. Click "Save Task"

### Task Management

- **View Tasks**: Tasks are organized by category in the dashboard
- **Alert Section**: Shows pending/incomplete tasks at the top
- **Edit Task**: Click the edit button on any task to modify it
- **Delete Task**: Click the delete button to remove a task
- **Mark Complete**: Update the status to mark tasks complete

### User Management

1. Go to the Users tab
2. Click "Add New User" to create a new team member
3. Edit or delete existing users as needed

### Theme Toggle

- Click the sun/moon icon in the top-right corner to toggle between light and dark mode
- Your preference is saved automatically

## 🏗️ Project Structure

```
TaskManagerWebsite/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── controllers/
│   │   ├── userController.js
│   │   └── taskController.js
│   ├── routes/
│   │   ├── users.js
│   │   └── tasks.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── TaskDashboard.js
│   │   │   ├── TaskItem.js
│   │   │   ├── TaskModal.js
│   │   │   ├── UserManagement.js
│   │   │   ├── UserModal.js
│   │   │   └── AuthPage.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks` - Get all tasks (with filters)
- `GET /api/tasks/:id` - Get task by ID
- `GET /api/tasks/user/:userId` - Get tasks assigned to user
- `GET /api/tasks/incomplete` - Get incomplete tasks (for alerts)
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PUT /api/tasks/:id/assign` - Assign task to users

## 🚀 Deployment

### Deploying Backend

1. **Deploy to Heroku**:
```bash
cd backend
heroku create your-app-name
git push heroku main
```

2. **Deploy to Other Services**:
   - AWS EC2
   - DigitalOcean
   - Render.com
   - Railway.app

### Deploying Frontend

1. **Build the frontend**:
```bash
cd frontend
npm run build
```

2. **Deploy to**:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - GitHub Pages

## 🛠️ Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or use MongoDB Atlas
- Check the MONGODB_URI in your .env file
- Verify network access if using MongoDB Atlas

### CORS Errors
- Ensure backend is running on port 5000
- Check that frontend is making requests to `http://localhost:5000`
- Update CORS settings in backend if needed

### Login Issues
- Clear browser local storage: DevTools → Application → Local Storage → Clear All
- Ensure the backend server is running

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📧 Support

For issues or questions, please open an issue on GitHub.
