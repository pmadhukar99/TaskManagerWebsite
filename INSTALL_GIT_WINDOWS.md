# 🔧 FIX: GIT NOT FOUND ERROR

**Error:** `Error: spawn git ENOENT`  
**Cause:** Git is not installed or not in system PATH  
**Solution:** Install Git properly

---

## ✅ SOLUTION 1: Install Git for Windows (RECOMMENDED)

### Step 1: Download Git Installer

**Go to:** https://git-scm.com/download/win

**Click:** The green download button for the latest version

**File:** `Git-2.x.x-64-bit.exe`

### Step 2: Run Installer

1. **Double-click** the `.exe` file
2. **Click: Next** on welcome screen
3. **Accept** license (MIT License)
4. **Choose Installation Path:**
   - Default: `C:\Program Files\Git`
   - Click: **Next**

### Step 3: Select Components (IMPORTANT)

**Make sure these are CHECKED:**
- ✅ Git Bash Here
- ✅ Git GUI Here
- ✅ Git LFS (Large File Support)
- ✅ Associate .git* configuration files
- ✅ Associate .sh files

**Click: Next**

### Step 4: Start Menu Folder

**Accept default** or customize  
**Click: Next**

### Step 5: Default Editor

**Choose:** 
- Option: Use Notepad++ (or VS Code if installed)
- Or leave default
**Click: Next**

### Step 6: Adjust Your PATH Environment

**THIS IS CRITICAL - Choose:**
- ✅ **"Git from the command line and also from 3rd-party software"** ← SELECT THIS ONE
- This adds Git to your Windows PATH
**Click: Next**

### Step 7: HTTPS Library

**Choose:** Use the native Windows Secure Channel library  
**Click: Next**

### Step 8: Line Endings

**Choose:** Checkout as-is, commit as-is (for Windows compatibility)  
**Click: Next**

### Step 9: Terminal Emulator

**Choose:** Use Windows' default console window  
**Click: Next**

### Step 10: Additional Options

**Check:**
- ✅ Enable file system caching
- ✅ Enable Git Credential Manager Core

**Click: Next**

### Step 11: Finish Installation

**Click:** Install  
**Wait** for installation (2-5 minutes)  
**Click:** Finish

### Step 12: Verify Installation

**Close PowerShell completely**

**Re-open PowerShell:**
- Press: Windows key
- Type: `powershell`
- Right-click: Run as Administrator

**Verify Git:**
```powershell
git --version
```

**Expected Output:**
```
git version 2.45.0.windows.1
```

---

## ✅ SOLUTION 2: Use GitHub Desktop (ALTERNATIVE)

If you don't want to install Git command-line:

### Step 1: Download GitHub Desktop

**Go to:** https://desktop.github.com  
**Click:** Download

### Step 2: Install

**Double-click** the installer  
**Follow** prompts  
**Restart** computer

### Step 3: Clone Repository

**Open** GitHub Desktop  
**File** → Clone Repository  
**Select:** TaskManagerWebsite  
**Click:** Clone

### Step 4: Open in VS Code

**Repository** → Right-click  
**Open in Visual Studio Code**

### Step 5: Now Use npm Commands

```powershell
cd frontend
npm run build
npm run deploy
```

**GitHub Desktop will handle git operations automatically**

---

## 🚀 AFTER INSTALLING GIT

### Step 1: Rebuild and Deploy

```powershell
cd "c:\Git clones\TaskManagerWebsite\frontend"
npm run build
npm run deploy
```

**This will now work because git is available!**

### Step 2: Verify Deployment

**Check GitHub:** https://github.com/pmadhukar99/TaskManagerWebsite/branches

**Look for:** `gh-pages` branch  
**Status:** Should show recent push time

### Step 3: Check Your Site

**Visit:** https://pmadhukar99.github.io/TaskManagerWebsite/

**Expected:** Site loads (no 404)

---

## 🆘 STILL NOT WORKING?

### Option 1: Use Manual Git Commands

If installing Git doesn't help, use these commands:

```powershell
cd "c:\Git clones\TaskManagerWebsite"

# Create and checkout gh-pages branch
git checkout --orphan gh-pages

# Remove all files
git rm -rf .

# Copy build files
Copy-Item -Path "frontend/build/*" -Destination "." -Recurse

# Commit and push
git add .
git commit -m "GitHub Pages deployment"
git push origin gh-pages

# Return to master
git checkout master
```

### Option 2: Use GitHub Web Interface

1. **Go to:** https://github.com/pmadhukar99/TaskManagerWebsite
2. **Click:** Settings
3. **Click:** Pages
4. **Click:** Deploy from a branch (if not already selected)
5. **Branch:** main or master
6. **Folder:** /docs
7. **Create `/docs` folder locally** and put build files there
8. **Push to GitHub**

### Option 3: Enable GitHub Actions Deployment

**Create file:** `.github/workflows/deploy.yml`

```yaml
name: Deploy

on:
  push:
    branches: [ master ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Install Node
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Build
      run: |
        cd frontend
        npm install
        npm run build
    
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./frontend/build
```

**This deploys automatically on every push!**

---

## ✅ QUICK FIX CHECKLIST

- [ ] Download Git from https://git-scm.com/download/win
- [ ] Install with "Git from command line" option selected
- [ ] Restart PowerShell
- [ ] Verify: `git --version` shows version number
- [ ] Run: `npm run build && npm run deploy`
- [ ] Visit: https://pmadhukar99.github.io/TaskManagerWebsite/
- [ ] Should see Task Manager (no 404)

---

## 📞 KEY URLS

| Action | URL |
|--------|-----|
| Git Download | https://git-scm.com/download/win |
| GitHub Desktop | https://desktop.github.com |
| Your Repository | https://github.com/pmadhukar99/TaskManagerWebsite |
| Your Site | https://pmadhukar99.github.io/TaskManagerWebsite/ |

---

## 🎯 NEXT STEPS

1. **Install Git** (follow Solution 1 above)
2. **Restart PowerShell**
3. **Run deployment:**
   ```powershell
   cd "c:\Git clones\TaskManagerWebsite\frontend"
   npm run build
   npm run deploy
   ```
4. **Wait 2-3 minutes**
5. **Visit your site**
6. **Hard refresh** with Ctrl+Shift+R
7. **You should see Task Manager interface!**

---

**Once Git is installed, your deployment will work!** 🚀

