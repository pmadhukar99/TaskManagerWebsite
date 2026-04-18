# Features Guide

## Core Features

### 1. Authentication & User Management

#### Registration
- Create new user account
- Email validation
- Password encryption
- Secure login token generation

**How to Use**:
1. Open http://localhost:3000
2. Click "Register"
3. Enter name, email, password
4. Click "Register" button
5. Automatically logged in

#### Login
- Email and password authentication
- JWT token-based sessions
- Secure token storage in browser

**How to Use**:
1. Enter email and password
2. Click "Login"
3. Redirected to dashboard

#### User Management
- Create, edit, and delete users
- Assign tasks to multiple users
- View all team members

**How to Use**:
1. Go to "Users" tab
2. Click "Add New User"
3. Fill in name, email, password
4. Click "Save User"
5. Edit users: Click "Edit" button
6. Delete users: Click "Delete" button

---

### 2. Task Management

#### Create Tasks
- Set task title and description
- Choose category (Daily, Weekly, Monthly, Yearly)
- Set priority (Low, Medium, High)
- Define due date
- Assign to multiple users
- Add notes

**How to Use**:
1. Click "Add New Task"
2. Fill in task details
3. Select category
4. Choose priority
5. Set due date (optional)
6. Select users to assign
7. Click "Save Task"

#### Task Categories
- **Daily**: Tasks to complete each day
- **Weekly**: Tasks to complete each week
- **Monthly**: Tasks to complete each month
- **Yearly**: Tasks to complete each year

#### Task Status Tracking
- **Not Completed**: Task hasn't started
- **Partially Completed**: Task in progress with completion percentage
- **Completed**: Task finished

**How to Update Status**:
1. Click "Edit" on task
2. Select new status
3. If partially completed, set percentage (0-100%)
4. Click "Save Task"

#### Task Progress Tracking
- Visual progress bar for partially completed tasks
- Percentage display
- Completion notes

**Example**: A task "Write Report" can be:
- 0% Complete (Not started)
- 50% Complete (Half done)
- 100% Complete (Done)

#### Edit Tasks
- Modify any task details
- Change assignments
- Update status
- Modify due dates

**How to Use**:
1. Click "Edit" on any task
2. Update desired fields
3. Click "Save Task"

#### Delete Tasks
- Remove completed or cancelled tasks

**How to Use**:
1. Click "Delete" on task
2. Confirm deletion

---

### 3. Task Alert System

#### Incomplete Tasks Alert
- Shows at top of dashboard
- Lists all not completed and partially completed tasks
- Displays task category and due date
- Color-coded urgency

**Alert Types**:
- **Red**: Not completed tasks (urgent)
- **Yellow**: Partially completed tasks (in progress)

**Example Alert**:
```
⚠️ Tasks Pending (5)
- Update Documentation - Daily (Due: 04/20/2026)
- Client Meeting Prep - Weekly
- Monthly Report - Monthly
- etc.
```

---

### 4. Theme Support

#### Light Mode
- Clean white background
- Dark text
- Blue accents
- Default theme

#### Dark Mode
- Dark background (#1a1a1a)
- Light text
- Same blue accents
- Easier on eyes at night

**How to Toggle**:
1. Click sun/moon icon in top-right corner
2. Theme changes immediately
3. Preference saved automatically

---

### 5. Multi-User Assignment

#### Assign Single Task to Multiple Users
- Select multiple users when creating task
- Update assignments later
- View who's assigned to task

**How to Use**:
1. Create or edit task
2. Check boxes for users to assign
3. Multiple users can be selected
4. Click "Save Task"

#### Assign Multiple Tasks to Single User
- Use filter or search
- Select user to view their tasks
- Create new tasks assigned to them

**How to Use**:
1. Create task
2. Assign to specific user
3. User can see task in their view

---

### 6. Dashboard Organization

#### Task Sections by Category
- Tasks organized into 4 sections:
  - Daily Tasks
  - Weekly Tasks
  - Monthly Tasks
  - Yearly Tasks

#### Task Count Display
- Each section shows number of tasks
- Example: "DAILY TASKS (5)"

#### Section Colors
- Daily: Green (#28a745)
- Weekly: Yellow (#ffc107)
- Monthly: Cyan (#17a2b8)
- Yearly: Purple (#6f42c1)

---

### 7. Task Details Visibility

#### Task Information Displayed
- Title
- Status badge
- Assigned users
- Due date
- Priority (if set)
- Notes/Description
- Progress bar (if partially completed)

#### Status Badges
- **Green**: Completed ✅
- **Red**: Not Completed ❌
- **Yellow**: Partially Completed ⏳

---

### 8. Due Date Management

#### Set Due Dates
- Calendar date picker
- Format: MM/DD/YYYY
- Optional field

#### View Due Dates
- Displayed on task card
- Shown in alert section
- Helps with planning

---

### 9. Task Notes & Description

#### Add Notes
- Additional information field
- Displayed on task card
- Up to large text blocks

#### Edit Notes
- Update notes when editing task
- Modify as task progresses

---

### 10. Responsive Design

#### Mobile Support
- Responsive layout
- Touch-friendly buttons
- Mobile-optimized modals
- Automatic text size adjustment

#### Desktop Support
- Full-width layout
- Multi-column task views
- Efficient use of space

---

## Advanced Features

### Filtering & Search

#### Filter by Status
- View completed tasks
- View incomplete tasks
- View partially completed tasks

#### Filter by Category
- Quick category view
- Individual section navigation

#### Filter by User
- View tasks assigned to specific user
- Track team member workload

### Task Organization

#### Sort by Due Date
- Upcoming tasks first
- Past due highlighted

#### Sort by Priority
- High priority tasks first
- Low priority tasks last

### Bulk Operations (Future Enhancement)

- Assign multiple tasks at once
- Delete multiple tasks
- Update multiple tasks

---

## Keyboard Shortcuts (Planned)

- `Ctrl/Cmd + N`: New task
- `Ctrl/Cmd + U`: New user
- `Ctrl/Cmd + T`: Toggle theme
- `Esc`: Close modal

---

## Tips & Tricks

### Quick Task Creation
1. Use "Add New Task" button on dashboard
2. Set all fields quickly
3. Add more details later by editing

### Track Team Progress
1. Go to Users tab
2. Click user name
3. See all their assigned tasks
4. Monitor completion percentage

### Organize by Priority
1. Create high-priority tasks with red/urgent notes
2. Place them at top
3. Complete them first

### Weekly Planning
1. Create all weekly tasks on Monday
2. Set weekly category
3. Assign to team members
4. Check progress daily

### Monthly Reviews
1. View all monthly tasks
2. Check completion rates
3. Plan next month
4. Archive old tasks

### Recurring Tasks (Manual)
1. Create task with "next week" in notes
2. When completed, edit and rename for next period
3. Or duplicate task for each cycle

---

## Best Practices

### Task Naming
- Be descriptive: "Update Client Documentation"
- Not vague: "Do stuff"
- Include action verb: "Review", "Complete", "Submit"

### Task Assignment
- Don't overload single user
- Assign to right skill level
- Set clear due dates

### Completion Percentage
- Use for long-term tasks
- Update regularly
- Reach 100% before marking complete

### Notes
- Add context and resources
- Link to related documents
- Mention dependencies

### Due Dates
- Always set for daily/weekly tasks
- Use for accountability
- Alert section shows overdue tasks

---

## Troubleshooting Features

### Task Not Showing
- Check category filter
- Verify user assignment
- Refresh page

### Can't Edit Task
- Ensure you have edit permission
- Try refreshing page
- Check if task is locked

### Alert Section Empty
- All tasks are completed! ✅
- Or create more tasks

### Users Not Showing in Assignment
- Go to Users tab
- Create new users first
- Refresh task form

---

## Feature Comparison

| Feature | Basic | Advanced |
|---------|-------|----------|
| Task Creation | ✅ | ✅ |
| Multiple Categories | ✅ | ✅ |
| Status Tracking | ✅ | ✅ |
| Percentage Completion | ✅ | ✅ |
| User Assignment | ✅ | ✅ |
| Alert System | ✅ | ✅ |
| Dark Mode | ✅ | ✅ |
| Due Dates | ✅ | ✅ |
| Notes | ✅ | ✅ |
| Task Editing | ✅ | ✅ |
| Bulk Operations | ❌ | (Planned) |
| Comments | ❌ | (Planned) |
| Analytics | ❌ | (Planned) |

---

## Getting Help

For more information:
- See README.md for complete documentation
- See ARCHITECTURE.md for technical details
- See DEPLOYMENT.md for server setup
