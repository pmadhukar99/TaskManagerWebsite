# ✨ New Features: Recurring & Shared Tasks

Your Task Manager now has two powerful new features! 🎉

---

## 🔄 Feature 1: Recurring Tasks

### What It Does

When you complete a recurring task, a new identical task is **automatically created** for the next period.

### Example: Credit Card Statement

```
Original Task:
- Title: "Pay Credit Card Bill"
- Amount: $10,000
- Due Date: April 15, 2025
- Recurrence: Monthly
- Status: Not Completed

What happens:
1. You complete the task on April 15
   ✅ Task marked as completed
   ✓ $10,000 spent tracked

2. System auto-creates new task:
   - Same title: "Pay Credit Card Bill"
   - Same amount: $10,000
   - New date: May 15, 2025
   - Status: Not Completed
   - Ready for next month!

3. Next month:
   You complete it again, and another one auto-creates for June 15...
```

### How to Use Recurring Tasks

1. **Create a task** (✅ already done)
2. **Open Task Modal** (Create New Task or Edit)
3. **Find: "🔄 Repeat Task"** dropdown
4. **Select recurrence:**
   - `None` = One-time task (default)
   - `Daily` = Creates new task daily
   - `Weekly` = Creates new task weekly
   - `Monthly` = Creates new task monthly (best for bills!)
   - `Yearly` = Creates new task yearly
5. **Save the task**
6. **Complete it** and system auto-creates the next one!

### Use Cases

✅ Monthly bills (rent, credit card, insurance)
✅ Weekly meetings (team standup, review)
✅ Daily routines (exercise, reading, water intake)
✅ Yearly tasks (renewals, annual reviews)

---

## 🌐 Feature 2: Shared Tasks (Team Visibility)

### What It Does

Control who can see your tasks!

- **Private (🔒)**: Only you see it
- **Shared (🌐)**: Everyone on the team can see it

### Example: Team Collaboration

```
Team Setup:
- User 1 (Your Name)
- User 2 (Team Member A)
- User 3 (Team Member B)

Scenario 1: Private Task
User 1 creates: "Personal Goal - Learn Python"
- Visibility: Private
- User 2 sees it? ❌ NO
- User 3 sees it? ❌ NO
- Only User 1 sees it

Scenario 2: Shared Task
User 1 creates: "Team Standup Meeting"
- Visibility: Shared
- User 2 sees it? ✅ YES
- User 3 sees it? ✅ YES
- All can track progress!

Scenario 3: All Users Visible
Everyone in the app can see all other users
(in "Team Members" section)
- User 1 can see User 2 & User 3
- User 2 can see User 1 & User 3
- User 3 can see User 1 & User 2
```

### How to Use Shared Tasks

1. **Open Task Modal** (Create New or Edit)
2. **Find: "👁️ Task Visibility"** dropdown
3. **Select visibility:**
   - `🔒 Private` = Only you can see (default)
   - `🌐 Shared` = Team can see
4. **Save the task**
5. **Team members see it automatically!**

### Use Cases

✅ Team collaboration tasks
✅ Pending approvals
✅ Shared deadlines
✅ Progress tracking
✅ Team updates

---

## 🎯 New Task Modal Fields

When creating/editing tasks, you now see:

```
Basic Info (existing):
- Title
- Description
- Category (Daily/Weekly/Monthly/Yearly)
- Priority (Low/Medium/High)
- Status (Not Completed/Partially/Completed)
- Due Date
- Notes

NEW FIELDS:
+ 🔄 Repeat Task (Recurrence)
+ 👁️ Task Visibility
```

---

## 👥 New: Team Members Section

**Task Dashboard** now shows:

```
👥 Team Members (3)
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│       👤       │  │       👤       │  │       👤       │
│     john123    │  │    sarah456    │  │    mike789     │
│  john@test.com │  │ sarah@test.com │  │  mike@test.com │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

See all users in your system and their shared tasks!

---

## 📊 Dashboard Updates

### Old Dashboard:
- Only your tasks
- No user list

### New Dashboard:
- ✅ Team Members section (shows all users)
- ✅ Your own tasks
- ✅ Shared tasks from others
- ✅ Recurring task indicators (🔄)
- ✅ Shared task badges (🌐)

---

## 🔐 Required Firestore Rules

These features need specific security rules:

**IMPORTANT: You must update your Firestore rules!**

See: `FIRESTORE_RULES.md` for complete rules

Quick summary:
```firestore
- All users can see each other (for team list)
- Users can only see their own private tasks
- All users can see tasks marked as 'shared'
- Only task creator can edit/delete their tasks
```

---

## ⚙️ Setup Checklist

- [ ] Update Firestore Security Rules (see `FIRESTORE_RULES.md`)
- [ ] Create a task with `Recurrence: Monthly`
- [ ] Create a task with `Visibility: Shared`
- [ ] Complete a recurring task and see new one auto-create
- [ ] Login as different user and see shared tasks
- [ ] Verify team members list shows all users

---

## 📝 Examples

### Example 1: Monthly Expense Tracking

```
Task: "Track Monthly Expenses"
- Category: Monthly
- Priority: High
- Recurrence: Monthly
- Visibility: Shared (team can see)
- Status: Not Completed

What happens:
✓ Task created for this month
✓ Team sees it and can monitor
✓ On completion: auto-creates for next month
✓ Repeats forever!
```

### Example 2: Private Personal Goal

```
Task: "Personal Development"
- Category: Weekly
- Priority: Medium
- Recurrence: Weekly
- Visibility: Private (only you see)
- Status: Not Completed

What happens:
✓ Only you see this task
✓ Weekly auto-creates
✓ Track personal progress privately
✓ Team can't see it
```

### Example 3: Team Collaboration

```
Task: "Weekly Team Standup"
- Category: Weekly
- Priority: High
- Recurrence: Weekly
- Visibility: Shared (everyone sees)
- Status: Not Completed

What happens:
✓ All team members see it
✓ Auto-creates every week
✓ Team tracks attendance/notes
✓ Transparent collaboration
```

---

## 🚀 Testing Your New Features

### Test Recurring Tasks:
1. Create task: "Test Task" (Monthly recurrence)
2. Mark as "Completed"
3. See if new task generates for next month
4. ✅ Success = new task appears!

### Test Shared Tasks:
1. Create task: "Shared Test" (Visibility: Shared)
2. Login as different user
3. Go to Task Dashboard
4. ✅ Success = you see the shared task!

### Test User Visibility:
1. Create multiple user accounts
2. Go to Task Dashboard
3. Look for "Team Members" section
4. ✅ Success = see all users listed!

---

## 💡 Pro Tips

### Tip 1: Bill Tracking
Create monthly recurring tasks for each bill:
- Rent (Monthly)
- Credit Card (Monthly)
- Insurance (Yearly)
- Each auto-generates

### Tip 2: Team Coordination
Share team tasks but keep personal tasks private:
- Share: "Project Deadline"
- Keep Private: "Personal Study Plan"

### Tip 3: Recurring Reminders
Set weekly reminders:
- Weekly Standup (Shared)
- Weekly Review (Private)
- Weekly Planning (Private)

### Tip 4: Tracking Progress
Use shared tasks to show team progress:
- Shared: "Sprint Tasks" (Monthly)
- Team can see completion status
- Auto-updates each month

---

## ❓ FAQ

**Q: What if I don't set recurrence?**
A: Task stays as-is, no auto-generation

**Q: Can I change recurrence after creating?**
A: Yes! Edit task → Change "Repeat Task" → Save

**Q: Can I change visibility after creating?**
A: Yes! Edit task → Change "Task Visibility" → Save

**Q: What if I mark as Partially Completed?**
A: Currently requires 100% to auto-generate next task. Edit and mark as "Completed" to trigger.

**Q: Do private tasks stay private?**
A: Yes! Only you see them, visibility can't change without your edit.

**Q: Can deleted user's tasks be seen?**
A: Their tasks remain visible (private to them, shared if marked shared)

**Q: How many recurring tasks can I have?**
A: Unlimited! Create as many as you need.

---

## 🐛 Troubleshooting

### Recurring tasks not creating?
1. Make sure status = "Completed" (not Partial)
2. Check Firestore rules are updated
3. Refresh page to see new task

### Can't see team members?
1. Update Firestore rules (see `FIRESTORE_RULES.md`)
2. Make sure users are created
3. Refresh page

### Can't see shared tasks?
1. Verify task has `visibility: 'shared'`
2. Update Firestore rules
3. Login as different user and refresh

---

## 🎉 You're All Set!

Your task manager now has:
- ✅ Recurring tasks for automation
- ✅ Shared tasks for collaboration
- ✅ Team member visibility
- ✅ Private tasks for personal goals

**Next Steps:**
1. Update Firestore Rules (from `FIRESTORE_RULES.md`)
2. Create your first recurring task
3. Create a shared task to test with another user
4. Enjoy your new features! 🚀

---

**Questions?** Check troubleshooting section above.

**Ready?** Update your Firestore rules and start using the new features! 🎊
