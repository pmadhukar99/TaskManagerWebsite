# ⚡ QUICK DEPLOY COMMANDS (Copy & Paste)

**For experienced users who want to deploy fast**

---

## 🚀 ONE-TIME SETUP (Run Once)

### 1. Install Global Dependencies
```powershell
# Check Node.js version (should be 18+)
node --version
npm --version

# Install Git if needed from: https://git-scm.com
git --version
```

### 2. Configure Git Identity
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3. Navigate to Project
```powershell
cd "c:\Git clones\TaskManagerWebsite"
```

### 4. Initialize Git (If Not Already Done)
```powershell
git init
git remote add origin https://github.com/pmadhukar99/TaskManagerWebsite.git
git remote -v
```

### 5. Install Frontend Dependencies
```powershell
cd frontend
npm install
npm install --save-dev gh-pages
```

### 6. Verify package.json Homepage
```powershell
# Should contain this line (check manually):
# "homepage": "https://pmadhukar99.github.io/TaskManagerWebsite",
```

---

## 📦 FIRST-TIME DEPLOYMENT

### 1. Build Production Version
```powershell
cd "c:\Git clones\TaskManagerWebsite\frontend"
npm run build
```

**Expected:** Build successful with 0 errors

### 2. Create Initial Commit
```powershell
cd ..
git add .
git commit -m "Initial commit: Task Manager with Smart Recurring Tasks"
```

### 3. Deploy to GitHub Pages
```powershell
cd frontend
npm run deploy
```

**Expected:** Shows "Publishing to gh-pages" and completes

### 4. Push Master to GitHub
```powershell
cd ..
git push -u origin master
```

**Note:** May ask for GitHub credentials/token

### 5. Enable GitHub Pages on GitHub

**Web steps:**
1. Go to: https://github.com/pmadhukar99/TaskManagerWebsite/settings/pages
2. Source: Select **gh-pages** branch
3. Folder: **/ (root)**
4. Click: **Save**
5. Wait 1-2 minutes
6. Visit: https://pmadhukar99.github.io/TaskManagerWebsite

✅ **Done! Site is live!**

---

## 🔄 UPDATE & REDEPLOY (After Code Changes)

### Short Version (What to Run)
```powershell
cd "c:\Git clones\TaskManagerWebsite\frontend"
npm run build
npm run deploy
cd ..
git add .
git commit -m "Update: Your change description"
git push
```

**Wait 1-2 minutes, then refresh:**
```
https://pmadhukar99.github.io/TaskManagerWebsite
```

### Step-by-Step (What Each Line Does)

```powershell
# Step 1: Go to frontend folder
cd "c:\Git clones\TaskManagerWebsite\frontend"

# Step 2: Build optimized production version
npm run build

# Step 3: Deploy to GitHub Pages (gh-pages branch)
npm run deploy

# Step 4: Return to root
cd ..

# Step 5: Stage all changes for commit
git add .

# Step 6: Create commit with description
git commit -m "Update: Added new categories and smart recurring logic"

# Step 7: Push to GitHub
git push

# Step 8: Visit your live site
# https://pmadhukar99.github.io/TaskManagerWebsite
# (Wait 1-2 minutes first!)
```

---

## 🔐 FIRESTORE RULES UPDATE

### Quick Setup
```powershell
# Copy rules from FIRESTORE_RULES_COPYABLE.md
# Go to: https://console.firebase.google.com
# Select: taskmanager-9bd1b
# Navigate to: Firestore Database → Rules
# Delete all existing rules
# Paste rules from FIRESTORE_RULES_COPYABLE.md
# Click: Publish
```

---

## 🧪 VERIFY DEPLOYMENT

### Check Site Loads
```
https://pmadhukar99.github.io/TaskManagerWebsite
```

### Check Console (Browser)
```powershell
Press: F12
Click: Console tab
Look for: No red errors
```

### Check Deployment Status
```
https://github.com/pmadhukar99/TaskManagerWebsite/actions
```

---

## ❌ QUICK TROUBLESHOOTING

### Site Shows 404
```powershell
# Fix: Verify GitHub Pages settings
# 1. Settings → Pages
# 2. Select: gh-pages branch
# 3. Select: / (root) folder
# 4. Save and wait 2 minutes
```

### Changes Not Showing
```powershell
# Fix: Rebuild and redeploy
cd frontend
npm run build
npm run deploy
cd ..
# Then hard refresh browser: Ctrl+Shift+R
```

### Build Fails
```powershell
# Fix: Clean and rebuild
cd frontend
Remove-Item -Path "build" -Recurse -Force
npm install
npm run build
```

### Deploy Script Not Found
```powershell
# Fix: Install gh-pages
cd frontend
npm install --save-dev gh-pages
npm run deploy
```

### Git Remote Error
```powershell
# Fix: Check remote
git remote -v

# If wrong, fix it:
git remote remove origin
git remote add origin https://github.com/pmadhukar99/TaskManagerWebsite.git
git remote -v
```

---

## 📋 COMMAND CHEAT SHEET

| Action | Command |
|--------|---------|
| Check Node version | `node --version` |
| Check Git version | `git --version` |
| Install dependencies | `npm install` |
| Build production | `npm run build` |
| Deploy to GitHub | `npm run deploy` |
| Check git status | `git status` |
| Stage changes | `git add .` |
| Create commit | `git commit -m "message"` |
| Push to GitHub | `git push` |
| View remotes | `git remote -v` |
| View branch | `git branch` |
| View log | `git log --oneline` |

---

## 🎯 TYPICAL WORKFLOW

### Week 1: First Deploy
```powershell
# Step 1: Build
cd frontend
npm run build

# Step 2: Deploy
npm run deploy

# Step 3: Push
cd ..
git add .
git commit -m "Initial: Task Manager deployed"
git push

# Step 4: Enable on GitHub (manual via web)
# Results: Site live at GitHub Pages URL
```

### Week 2+: Updates
```powershell
# Whenever you make changes:

# Build
cd frontend
npm run build && npm run deploy

# Commit & Push
cd ..
git add .
git commit -m "Update: Brief description"
git push

# Done! Changes live in 1-2 minutes
```

---

## 💾 COMPLETE FIRST-TIME SCRIPT

**Copy, paste, and run this entire script:**

```powershell
# === FIRST TIME SETUP ===

# Navigate to project
cd "c:\Git clones\TaskManagerWebsite"

# Initialize git if needed
git init
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git remote add origin https://github.com/pmadhukar99/TaskManagerWebsite.git

# Install dependencies
cd frontend
npm install
npm install --save-dev gh-pages

# === BUILD & DEPLOY ===

# Build
npm run build

# Deploy to GitHub Pages
npm run deploy

# === PUSH TO GITHUB ===

# Return to root
cd ..

# Stage, commit, push
git add .
git commit -m "Initial commit: Task Manager"
git push -u origin master

# === NEXT: Enable on GitHub ===
# Go to: https://github.com/pmadhukar99/TaskManagerWebsite/settings/pages
# Select gh-pages branch and save
# Wait 1-2 minutes
# Visit: https://pmadhukar99.github.io/TaskManagerWebsite
```

---

## 📱 AFTER DEPLOYMENT

### Update Firestore Rules
```
1. Firebase Console: https://console.firebase.google.com
2. Select: taskmanager-9bd1b
3. Firestore Database → Rules
4. Paste from: FIRESTORE_RULES_COPYABLE.md
5. Publish
```

### Test Your App
```
1. Open: https://pmadhukar99.github.io/TaskManagerWebsite
2. Register/Login
3. Create test task
4. Verify saves to Firestore
5. Refresh to confirm persistence
```

### Share URL
```
Share with team: https://pmadhukar99.github.io/TaskManagerWebsite
```

---

## 🚀 PERFORMANCE TIPS

### Faster Deployments
```powershell
# Avoid full rebuild if only assets changed
npm run build
npm run deploy
```

### Check Build Size
```powershell
cd frontend
npm run build
# Look for file sizes in output
# Should be <200KB gzipped
```

### Monitor Deployments
```
https://github.com/pmadhukar99/TaskManagerWebsite/actions
# See real-time build status
```

---

## 💡 COMMON ISSUES & FIXES

| Issue | Fix |
|-------|-----|
| 404 error | Check GitHub Pages settings |
| Changes not showing | Hard refresh: Ctrl+Shift+R |
| Build fails | `npm install` then `npm run build` |
| Git push fails | Check credentials/token |
| Firebase errors | Verify firebase.js config |
| Slow deployment | Normal, wait 1-2 minutes |

---

## 📞 NEED DETAILS?

**Full detailed guide:** [GITHUB_DEPLOYMENT_COMPLETE.md](GITHUB_DEPLOYMENT_COMPLETE.md)

---

## ✅ SUCCESS CHECKLIST

- [ ] Node.js installed (v18+)
- [ ] Git installed
- [ ] GitHub account created
- [ ] Repository created (public)
- [ ] First deploy complete
- [ ] Master pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Site loads at https://pmadhukar99.github.io/TaskManagerWebsite
- [ ] Firestore rules updated
- [ ] Tested with sample task

---

**Ready?** Run the script and deploy! 🚀

