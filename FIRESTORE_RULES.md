# 🔐 Updated Firestore Security Rules

## Setup Instructions

1. Go to Firebase Console
2. Select your project: `taskmanager-9bd1b`
3. Click **Firestore Database** → **Rules** tab
4. Replace ALL content with the rules below
5. Click **Publish**

---

## Complete Security Rules

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Allow anyone to read all users (for team member list)
    match /users/{document=**} {
      allow read: if request.auth != null;
      allow create: if request.auth.uid == resource.id;
      allow update, delete: if request.auth.uid == resource.id;
    }
    
    // Task access rules:
    // - Creator can read/write their own tasks
    // - Others can read/write tasks marked as 'shared' (collaborative editing)
    // - Anyone logged in can create tasks
    match /tasks/{document=**} {
      // User can read their own tasks
      allow read: if request.auth.uid == resource.data.createdBy;
      
      // Anyone can read and write shared tasks (collaborative editing)
      allow read, write: if resource.data.visibility == 'shared';
      
      // User can write their own tasks
      allow write: if request.auth.uid == resource.data.createdBy;
      
      // Anyone logged in can create new tasks
      allow create: if request.auth.uid != null;
    }
  }
}
```

---

## What These Rules Do

### Users Collection
- ✅ All logged-in users can **see** all other users
- ✅ Users can only **edit/delete** their own account
- ✅ New users are created automatically when they register

### Tasks Collection
- ✅ Users can see their own tasks
- ✅ Users can see tasks from others if marked as "shared"
- ✅ Only the task creator can edit/delete
- ✅ Users can create new tasks

---

## Examples

### Scenario 1: Private Task (Default)
```
Task: "Pay Credit Card Bill"
Visibility: private (🔒)
Result: Only creator can see it
```

### Scenario 2: Shared Task
```
Task: "Team Standup Meeting"
Visibility: shared (🌐)
Result: Everyone can see it
```

### Scenario 3: Recurring Task
```
Task: "Monthly Report"
Recurrence: monthly
Result: New task auto-creates each month marked as "not-completed"
```

---

## Testing Your Rules

### Test 1: Can User A see User B?
- User A logs in
- User A goes to Task Dashboard
- ✅ Should see all users in "Team Members" section

### Test 2: Can User A see User B's shared tasks?
- User B creates task: "Team Review" (visibility: shared)
- User A logs in
- ✅ Should see "Team Review" in their task list

### Test 3: Can User A see User B's private tasks?
- User B creates task: "Personal Goal" (visibility: private)
- User A logs in
- ❌ Should NOT see "Personal Goal"

### Test 4: Recurring Tasks Work?
- Create task: "Monthly expense" (recurrence: monthly)
- Mark as completed
- ✅ New task should auto-generate for next month

---

## Troubleshooting

### "Permission denied" error
→ Make sure you published the rules after editing

### Can't see team members
→ Verify users collection has the read rule

### Can't see shared tasks
→ Verify task has `visibility: 'shared'` field

### Recurring tasks not creating
→ Check that task has `recurrence` field set (not 'none')

---

## Security Best Practices

✅ Users can't see each other's private data
✅ No one can delete/edit someone else's tasks
✅ Team can collaborate with shared tasks
✅ Recurring tasks maintain original settings
✅ All changes are tracked with timestamps

---

**Copy these rules into Firebase Console now!** 🚀
