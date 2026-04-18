# 📚 COMPLETE GITHUB PAGES DEPLOYMENT GUIDE

**Date:** April 18, 2026  
**Goal:** Deploy Task Manager to GitHub Pages (FREE hosting)  
**Time Required:** 30-45 minutes  
**Cost:** $0/month forever  

---

## 📋 TABLE OF CONTENTS

1. [Prerequisites Check](#prerequisites-check)
2. [Build Production App](#build-production-app)
3. [GitHub Repository Setup](#github-repository-setup)
4. [Git Configuration](#git-configuration)
5. [Deploy to GitHub Pages](#deploy-to-github-pages)
6. [Enable GitHub Pages](#enable-github-pages)
7. [Verify Deployment](#verify-deployment)
8. [Custom Domain (Optional)](#custom-domain-optional)
9. [Troubleshooting](#troubleshooting)
10. [Update Firestore Rules](#update-firestore-rules)

---

## 🔍 PREREQUISITES CHECK

### Step 1.1: Verify Node.js Installation

**Windows (PowerShell):**
```powershell
node --version
npm --version
```

**Expected Output:**
```
v18.0.0 (or higher)
9.0.0 (or higher)
```

**If not installed:**
1. Go to: https://nodejs.org
2. Download: LTS version
3. Install: Default settings
4. Restart PowerShell
5. Verify again

### Step 1.2: Verify Git Installation

**Windows (PowerShell):**
```powershell
git --version
```

**Expected Output:**
```
git version 2.x.x (or higher)
```

**If not installed:**
1. Go to: https://git-scm.com
2. Download: For Windows
3. Install: Accept defaults
4. Restart PowerShell
5. Verify again

### Step 1.3: GitHub Account Check

**Verify you have:**
- [ ] GitHub account (create at https://github.com if needed)
- [ ] Email verified
- [ ] Can login successfully
- [ ] Have SSH key configured (or will use HTTPS)

---

## 🏗️ BUILD PRODUCTION APP

### Step 2.1: Navigate to Frontend Directory

**Windows (PowerShell):**
```powershell
cd "c:\Git clones\TaskManagerWebsite\frontend"
```

**Verify location:**
```powershell
Get-Location
```

**Expected Output:**
```
C:\Git clones\TaskManagerWebsite\frontend
```

### Step 2.2: Clean Previous Builds

**Remove old build folder:**
```powershell
Remove-Item -Path "build" -Recurse -Force
```

**Verify folder removed:**
```powershell
dir | grep build
```

**Expected:** No output (folder gone)

### Step 2.3: Install Dependencies

```powershell
npm install
```

**This will:**
- Download all required packages
- Install React, Firebase, etc.
- Create node_modules folder
- Take 2-3 minutes

**Verify success:**
```powershell
dir node_modules | Measure-Object
```

**Expected:** Shows large number of folders

### Step 2.4: Build for Production

```powershell
npm run build
```

**This will:**
- Compile React code
- Optimize bundle
- Create `build/` folder
- Take 2-5 minutes

**Expected Output:**
```
Creating an optimized production build...
Compiled successfully.

File sizes after gzip:
  152.64 kB  build\static\js\main.xyz.js
  2.1 kB    build\static\css\main.xyz.css

The build folder is ready to be deployed.
```

### Step 2.5: Verify Build Success

**Check build folder exists:**
```powershell
Test-Path "build"
```

**Expected:** `True`

**Check build contents:**
```powershell
dir build
```

**Expected Output:**
```
Mode  Name
----  ----
d----  static
-a---  index.html
-a---  manifest.json
-a---  favicon.ico
-a---  robots.txt
```

---

## 🔧 GITHUB REPOSITORY SETUP

### Step 3.1: Check if Repository Exists

**Go to:** https://github.com/pmadhukar99  
**Look for:** TaskManagerWebsite repository  
**Result:**
- ✅ If exists → Skip to Step 3.5
- ❌ If not exists → Continue to Step 3.2

### Step 3.2: Create New Repository (If Needed)

**Web Steps:**
1. Go to: https://github.com/new
2. Enter:
   - Repository name: `TaskManagerWebsite`
   - Description: `Free Task Manager Web Application`
   - Choose: **Public** (required for free GitHub Pages)
   - Check: ✅ Initialize with README
3. Click: **Create repository**

### Step 3.3: Copy Repository URL

**On GitHub repo page:**
1. Click: Green **<> Code** button
2. Select: **HTTPS** tab
3. Copy URL: `https://github.com/pmadhukar99/TaskManagerWebsite.git`
4. Save it for next steps

### Step 3.4: Create .gitignore File

**In frontend directory, create/verify `.gitignore`:**

```powershell
cd "c:\Git clones\TaskManagerWebsite"
```

**Create file (if not exists):**
```powershell
@"
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
"@ | Set-Content .gitignore
```

### Step 3.5: Verify package.json Configuration

**Check homepage field in `frontend/package.json`:**

**Open file:**
```powershell
code frontend/package.json
```

**Look for this section (should exist):**
```json
{
  "name": "task-manager-frontend",
  "version": "1.0.0",
  "private": true,
  "homepage": "https://pmadhukar99.github.io/TaskManagerWebsite",
  "dependencies": { ... }
}
```

**If homepage is missing:**
1. Add this line after `"private": true,`:
```json
"homepage": "https://pmadhukar99.github.io/TaskManagerWebsite",
```

2. Save file

3. Rebuild:
```powershell
npm run build
```

---

## 🔑 GIT CONFIGURATION

### Step 4.1: Configure Git Identity

**Set your name:**
```powershell
git config --global user.name "Your Name"
```

**Set your email:**
```powershell
git config --global user.email "your.email@example.com"
```

**Verify configuration:**
```powershell
git config --global --list
```

**Expected Output:**
```
user.name=Your Name
user.email=your.email@example.com
```

### Step 4.2: Initialize Git Repository

**Navigate to project root:**
```powershell
cd "c:\Git clones\TaskManagerWebsite"
```

**Check if already initialized:**
```powershell
Test-Path ".git"
```

**If False (not initialized):**
```powershell
git init
```

**Add remote origin:**
```powershell
git remote add origin https://github.com/pmadhukar99/TaskManagerWebsite.git
```

**Verify remote:**
```powershell
git remote -v
```

**Expected Output:**
```
origin  https://github.com/pmadhukar99/TaskManagerWebsite.git (fetch)
origin  https://github.com/pmadhukar99/TaskManagerWebsite.git (push)
```

### Step 4.3: Configure GitHub Pages Branch

**Add gh-pages script to package.json:**

**In `frontend/package.json`, verify scripts section has:**
```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "deploy": "npm run build && gh-pages -d build",
  "eject": "react-scripts eject"
}
```

**If missing, add the deploy line manually**

### Step 4.4: Install gh-pages Package

**In frontend directory:**
```powershell
cd frontend
npm install --save-dev gh-pages
```

**Verify installation:**
```powershell
npm list gh-pages
```

**Expected:**
```
task-manager-frontend@1.0.0
└── gh-pages@5.0.0
```

---

## 🚀 DEPLOY TO GITHUB PAGES

### Step 5.1: Initial Git Commit

**Navigate to project root:**
```powershell
cd "c:\Git clones\TaskManagerWebsite"
```

**Add all files:**
```powershell
git add .
```

**Verify staged files:**
```powershell
git status
```

**Expected Output:**
```
On branch master
Changes to be committed:
  new file:   package.json
  new file:   src/...
  ...
```

**Create initial commit:**
```powershell
git commit -m "Initial commit: Task manager with calendar-based recurring tasks"
```

**Verify commit:**
```powershell
git log --oneline
```

**Expected Output:**
```
abc1234 Initial commit: Task manager with calendar-based recurring tasks
```

### Step 5.2: Deploy to GitHub Pages

**Navigate to frontend directory:**
```powershell
cd frontend
```

**Run deploy command:**
```powershell
npm run deploy
```

**This will:**
1. Build production version
2. Create gh-pages branch
3. Push built files to gh-pages
4. Takes 30-60 seconds

**Expected Output:**
```
Building for production...
Creating an optimized production build...
Compiled successfully.

> gh-pages -d build

Publishing to gh-pages
...
```

**Verify deployment:**
```powershell
git branch -a
```

**Expected Output:**
```
* master
  remotes/origin/master
  remotes/origin/gh-pages
```

### Step 5.3: Push Master Branch to GitHub

**Navigate to project root:**
```powershell
cd "c:\Git clones\TaskManagerWebsite"
```

**Push to GitHub:**
```powershell
git push -u origin master
```

**First time, it may ask for credentials:**
- Username: `pmadhukar99`
- Password: Use personal access token (see Step 5.4)

**Expected Output:**
```
Enumerating objects: 150, done.
Counting objects: 100% (150/150), done.
Delta compression using up to 8 threads
Compressing objects: 100% (145/145), done.
Writing objects: 100% (150/150), 1.25 MiB
To https://github.com/pmadhukar99/TaskManagerWebsite.git
 * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.
```

### Step 5.4: GitHub Authentication (If Needed)

**If asked for password:**

1. Go to: https://github.com/settings/tokens
2. Click: **Generate new token (classic)**
3. Name: `GitHub Pages Deploy`
4. Expiration: No expiration (or 90 days)
5. Select scopes: **repo** (full control of private repositories)
6. Click: **Generate token**
7. Copy token (appears once!)
8. Go back to PowerShell
9. Paste token when asked for password
10. Save somewhere safe

---

## 🔐 ENABLE GITHUB PAGES

### Step 6.1: Access Repository Settings

**Go to:** https://github.com/pmadhukar99/TaskManagerWebsite  
**Click:** Settings tab (gear icon)  
**Click:** Pages (in left sidebar)  

### Step 6.2: Configure GitHub Pages Source

**You should see:**
```
Build and deployment
Source
```

**Click dropdown under "Source":**
- Current: "None" or "master"
- Change to: **Deploy from a branch**

**Branch selection:**
- Branch: **gh-pages**
- Folder: ** / (root)**

**Click:** Save

### Step 6.3: Wait for Deployment

**GitHub will:**
1. Build your site (takes 30-60 seconds)
2. Deploy to live URL
3. Show checkmark when done

**Monitor status:**
1. Refresh Settings → Pages
2. Look for green checkmark
3. Shows: "Your site is live at: https://pmadhukar99.github.io/TaskManagerWebsite"

### Step 6.4: Access Your Live Site

**Open browser:**
```
https://pmadhukar99.github.io/TaskManagerWebsite
```

**Expected:** See task manager interface!

---

## ✅ VERIFY DEPLOYMENT

### Step 7.1: Check Application Loads

**Open:** https://pmadhukar99.github.io/TaskManagerWebsite

**Verify:**
- ✅ Page loads (not 404)
- ✅ No console errors
- ✅ Can see task manager interface
- ✅ Buttons clickable
- ✅ Responsive on mobile

### Step 7.2: Test Authentication

1. Click: "Register" or "Login"
2. Enter: Test email and password
3. Verify: Firebase authentication works

### Step 7.3: Test Task Creation

1. Create a test task
2. Verify: Saves to Firestore
3. Refresh page
4. Verify: Task still there

### Step 7.4: Check Console for Errors

**Open DevTools:**
- Press: F12
- Click: Console tab
- Look for: Red errors

**Expected:** No red errors (warnings OK)

### Step 7.5: Performance Check

**In DevTools:**
1. Click: Performance tab
2. Reload page
3. Check: Load time < 3 seconds
4. Look for: No long tasks

---

## 🌍 CUSTOM DOMAIN (OPTIONAL)

### Step 8.1: Purchase Domain (If Needed)

**Popular registrars:**
- Namecheap.com
- GoDaddy.com
- Cloudflare.com

**Example:** taskmanager.com

### Step 8.2: Configure DNS Records

**Add these DNS records:**

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | pmadhukar99.github.io |

**Steps:**
1. Login to domain registrar
2. Find DNS settings
3. Add/update records above
4. Save (takes 15-48 hours to propagate)

### Step 8.3: Configure GitHub Pages

1. Go to: Repository Settings → Pages
2. Under "Custom domain"
3. Enter: `taskmanager.com`
4. Check: "Enforce HTTPS"
5. Click: Save

### Step 8.4: Verify Custom Domain

**After 10-15 minutes:**
1. Open: https://taskmanager.com
2. Verify: Loads your app
3. Check: Browser shows https lock

---

## 🔧 TROUBLESHOOTING

### Problem: "404 Page Not Found"

**Cause:** GitHub Pages not configured correctly  
**Solution:**
1. Go to: Repository Settings → Pages
2. Verify: gh-pages branch selected
3. Verify: / (root) folder selected
4. Wait: 2-3 minutes
5. Try: Refresh browser (Ctrl+Shift+R)

### Problem: "GitHub.io Page Not Deployed"

**Cause:** Build failed or deploy script issue  
**Solution:**
```powershell
cd frontend
npm run build
npm run deploy
```

Check for errors in output.

### Problem: "App Loads But Nothing Works"

**Cause:** Firebase not configured  
**Solution:**
1. Open browser DevTools (F12)
2. Check Console tab
3. Look for Firebase errors
4. Verify `frontend/src/firebase.js` has correct credentials
5. Go to Firebase Console → Check if project exists

### Problem: "Homepage URL Not Working"

**Cause:** Missing/incorrect homepage in package.json  
**Solution:**
1. Open `frontend/package.json`
2. Verify:
```json
"homepage": "https://pmadhukar99.github.io/TaskManagerWebsite"
```
3. Rebuild:
```powershell
npm run build
npm run deploy
```

### Problem: "gh-pages Command Not Found"

**Cause:** gh-pages not installed  
**Solution:**
```powershell
cd frontend
npm install --save-dev gh-pages
npm run deploy
```

### Problem: "Git Remote Not Configured"

**Cause:** Repository URL incorrect  
**Solution:**
```powershell
git remote -v
```

If wrong URL, fix it:
```powershell
git remote remove origin
git remote add origin https://github.com/pmadhukar99/TaskManagerWebsite.git
git remote -v
```

### Problem: "Changes Not Showing on Live Site"

**Cause:** Not deployed properly  
**Solution:**
1. Make changes locally
2. Rebuild:
```powershell
cd frontend
npm run build
```
3. Deploy:
```powershell
npm run deploy
```
4. Commit and push:
```powershell
cd ..
git add .
git commit -m "Update description"
git push
```
5. Wait 1-2 minutes
6. Hard refresh: Ctrl+Shift+R

### Problem: "CORS Error in Console"

**Cause:** Firebase configuration issue  
**Solution:**
1. Go to Firebase Console
2. Check project is correct
3. Check Firebase credentials in `firebase.js`
4. Verify Firestore rules allow your domain

---

## 🔐 UPDATE FIRESTORE RULES

### Step 10.1: Access Firebase Console

**Go to:** https://console.firebase.google.com  
**Select:** taskmanager-9bd1b project  

### Step 10.2: Update Security Rules

**Navigate to:**
1. Firestore Database
2. Rules tab
3. Delete all existing rules
4. Paste from: FIRESTORE_RULES_COPYABLE.md

**Copy this:**
```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{document=**} {
      allow read: if request.auth != null;
      allow create: if request.auth.uid == resource.id;
      allow update, delete: if request.auth.uid == resource.id;
    }
    match /tasks/{document=**} {
      allow read: if request.auth.uid == resource.data.createdBy;
      allow read, write: if resource.data.visibility == 'shared';
      allow write: if request.auth.uid == resource.data.createdBy;
      allow create: if request.auth.uid != null;
    }
  }
}
```

### Step 10.3: Publish Rules

1. Click: **Publish** button
2. Wait for: "✓ Rules published"
3. Verify: Green checkmark shows

---

## 📋 COMPLETE CHECKLIST

- [ ] Node.js installed (v18+)
- [ ] Git installed
- [ ] GitHub account created
- [ ] Repository created on GitHub
- [ ] Git configured locally
- [ ] homepage in package.json correct
- [ ] Build successful (`npm run build`)
- [ ] gh-pages installed
- [ ] Deploy successful (`npm run deploy`)
- [ ] Master branch pushed
- [ ] GitHub Pages enabled
- [ ] Live site loads
- [ ] Firestore rules updated
- [ ] Authentication works
- [ ] Can create tasks
- [ ] Tasks persist on refresh
- [ ] Shared tasks visible
- [ ] History section works

---

## 🎉 SUCCESS!

Your Task Manager is now:
- ✅ Built for production
- ✅ Deployed on GitHub Pages
- ✅ Live at: https://pmadhukar99.github.io/TaskManagerWebsite
- ✅ Updated with new features
- ✅ Free forever ($0/month)
- ✅ Automatically updated when you push changes

---

## 📞 QUICK REFERENCE

### Deploy Updates

After making code changes:

```powershell
cd c:\Git\ clones\TaskManagerWebsite\frontend
npm run build
npm run deploy
cd ..
git add .
git commit -m "Description of changes"
git push
```

**Wait 1-2 minutes, then refresh browser**

### View Deployment Status

**GitHub Actions:**
1. Go to: Repository → Actions tab
2. Watch deploy progress
3. Green checkmark = success
4. Red X = failure (check logs)

### Rollback to Previous Version

```powershell
git revert HEAD
git push
npm run deploy
```

### View Live Site Performance

**GitHub Pages Analytics:**
1. Settings → Pages
2. View deployment history
3. See traffic stats

---

## 📚 NEXT STEPS

1. ✅ Deployment complete
2. ✅ Test all features
3. ✅ Share live URL with team
4. ✅ Update Firestore rules
5. ✅ Create user accounts
6. ✅ Start tracking tasks!

---

**Questions?** Check specific steps above.  
**Ready?** Start deploying! 🚀

