# 🔐 COPY-PASTE FIRESTORE RULES

**⚠️ IMPORTANT: These must be updated for features to work!**

---

## Step-by-Step Setup (2 minutes)

1. Open: https://console.firebase.google.com
2. Select project: **taskmanager-9bd1b**
3. Click: **Firestore Database**
4. Click: **Rules** tab
5. **Delete all existing rules**
6. **Paste the rules below** (everything between the dashes)
7. Click: **Publish** button
8. Wait for: "✓ Rules published successfully"

---

## ✂️ COPY EVERYTHING BELOW THIS LINE

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
    // - Anyone can read and write shared tasks (collaborative editing)
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

## ✂️ COPY EVERYTHING ABOVE THIS LINE

---

## Verification

After publishing, test:

✅ Create private task → Only you see it
✅ Create shared task → All users see it
✅ Create recurring task → Next task auto-generates when complete
✅ See team members → All users listed on dashboard

---

## Success Indicators

After publishing successfully:
1. No error message appears
2. Rules show as "Published" in console
3. Green checkmark appears
4. Features start working

---

## Need Help?

1. Check rules syntax (no typos)
2. Make sure you selected correct project
3. Verify you clicked "Publish"
4. Try incognito window if cache issues

**Full guide:** See FIRESTORE_RULES.md

