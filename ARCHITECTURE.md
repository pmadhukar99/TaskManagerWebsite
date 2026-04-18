# Architecture Documentation

## System Overview

The Task Manager is a full-stack web application with the following architecture:

```
┌─────────────────┐         ┌──────────────────┐         ┌──────────────┐
│   React Client  │────────▶│   Express API    │────────▶│   MongoDB    │
│   (Frontend)    │         │    (Backend)     │         │  (Database)  │
└─────────────────┘         └──────────────────┘         └──────────────┘
     Port 3000                    Port 5000                   Port 27017
```

## Component Architecture

### Frontend (React)

```
App.js (Main Component)
├── AuthPage (Login/Register)
├── Navbar (Navigation)
├── TaskDashboard (Main Page)
│   ├── AlertSection
│   ├── TaskSections (Daily/Weekly/Monthly/Yearly)
│   │   └── TaskItem
│   └── TaskModal (Create/Edit)
└── UserManagement
    └── UserModal (Create/Edit)
```

### Backend (Express.js)

```
server.js (Entry Point)
├── middleware/
├── models/
│   ├── User.js (Mongoose Schema)
│   └── Task.js (Mongoose Schema)
├── controllers/
│   ├── userController.js
│   └── taskController.js
└── routes/
    ├── users.js
    └── tasks.js
```

### Database (MongoDB)

```
Task Manager DB
├── Users Collection
│   ├── _id
│   ├── name
│   ├── email
│   ├── password (hashed)
│   ├── createdAt
│   └── updatedAt
└── Tasks Collection
    ├── _id
    ├── title
    ├── description
    ├── category (daily/weekly/monthly/yearly)
    ├── priority (low/medium/high)
    ├── status (not-completed/partially-completed/completed)
    ├── completionPercentage
    ├── notes
    ├── assignedTo (array of User IDs)
    ├── dueDate
    ├── createdBy (User ID)
    ├── createdAt
    └── updatedAt
```

## Data Flow

### Creating a Task

1. User fills task form in TaskModal
2. Form data sent to backend via POST /api/tasks
3. Backend validates data and creates Task document
4. Task stored in MongoDB
5. Response sent back to frontend
6. Frontend updates TaskDashboard with new task
7. UI re-renders with new task

### Assigning Task to Users

1. User selects multiple users in TaskModal
2. User IDs array sent in request
3. Backend updates Task.assignedTo array
4. Task saved to database
5. Task now appears in both creator's and assigned users' views

### Alert System

1. Frontend polls /api/tasks/incomplete endpoint
2. Backend queries MongoDB for tasks with status ≠ 'completed'
3. Returns list of incomplete tasks
4. Frontend displays alert section with pending tasks
5. User can click task to edit or mark complete

## Authentication Flow

### Registration

```
User Form → Frontend → Backend
                        ├─ Validate input
                        ├─ Hash password with bcrypt
                        ├─ Save to MongoDB
                        └─ Return JWT token
                                │
                              Frontend
                                ├─ Store token in localStorage
                                └─ Redirect to dashboard
```

### Login

```
User Credentials → Frontend → Backend
                              ├─ Find user in MongoDB
                              ├─ Compare password with bcrypt
                              ├─ Generate JWT token
                              └─ Return token + user data
                                       │
                                     Frontend
                                       ├─ Store token in localStorage
                                       └─ Redirect to dashboard
```

### Token Usage

```
Frontend Request → Add Authorization header
                   Authorization: Bearer <token>
                                       │
                                     Backend
                                       ├─ Verify token with JWT
                                       ├─ Extract user ID
                                       └─ Process request
```

## API Endpoints Architecture

### User Endpoints
- `POST /api/users/register` - Public, creates new user
- `POST /api/users/login` - Public, returns JWT token
- `GET /api/users` - Protected, returns all users
- `GET /api/users/:id` - Protected, returns specific user
- `PUT /api/users/:id` - Protected, updates user
- `DELETE /api/users/:id` - Protected, deletes user

### Task Endpoints
- `POST /api/tasks` - Protected, creates task
- `GET /api/tasks` - Protected, returns tasks with optional filters
- `GET /api/tasks/:id` - Protected, returns specific task
- `GET /api/tasks/incomplete` - Protected, returns incomplete tasks
- `GET /api/tasks/user/:userId` - Protected, returns tasks for user
- `PUT /api/tasks/:id` - Protected, updates task
- `DELETE /api/tasks/:id` - Protected, deletes task
- `PUT /api/tasks/:id/assign` - Protected, assigns task to users

## Theme System

### Light Mode
- Background: #f5f5f5
- Text: #333
- Cards: #ffffff
- Accents: Blue (#007bff)

### Dark Mode
- Background: #1a1a1a
- Text: #e0e0e0
- Cards: #2a2a2a
- Accents: Blue (#007bff)

**Implementation**: CSS variables and class-based styling
**Persistence**: localStorage (darkMode key)

## Security Features

1. **Password Hashing**: bcryptjs (10 salt rounds)
2. **JWT Tokens**: 30-day expiration
3. **CORS**: Enabled for frontend domain
4. **Input Validation**: Both frontend and backend
5. **No Sensitive Data**: Passwords excluded from API responses

## Performance Optimizations

1. **Frontend**:
   - Component lazy loading
   - CSS minification
   - Efficient re-renders

2. **Backend**:
   - Database indexing on frequently queried fields
   - Pagination support (can be added)
   - Request validation before database queries

3. **Database**:
   - MongoDB indexes on user email, task category
   - Efficient querying with filters

## Scalability Considerations

### Current Limitations
- All users see all tasks (no privacy/access control)
- No pagination (can handle thousands of tasks)
- Single database instance

### Scaling Options
1. **Add Authentication Middleware**: Role-based access
2. **Implement Pagination**: Limit results per page
3. **Add Caching**: Redis for frequently accessed data
4. **Database Sharding**: Distribute data across servers
5. **Load Balancing**: Multiple backend instances
6. **CDN**: Cache frontend assets

## Error Handling

### Frontend
- Try-catch blocks in async functions
- Error state management
- User-friendly error messages

### Backend
- Validation middleware
- Error status codes (400, 401, 404, 500)
- Detailed error messages in responses

## Future Enhancements

1. **Task Comments**: Add discussion to tasks
2. **Task Attachments**: Upload files to tasks
3. **Notifications**: Real-time alerts
4. **Recurring Tasks**: Auto-create tasks
5. **Task Templates**: Save and reuse task configurations
6. **Analytics**: Dashboard with task completion metrics
7. **Mobile App**: React Native or Flutter
8. **Offline Support**: Service workers for offline access
