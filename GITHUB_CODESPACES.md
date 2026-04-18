# GitHub Codespaces Guide

Run your Task Manager entirely in your browser - no local installation needed!

## 🌐 What is GitHub Codespaces?

**GitHub Codespaces** is a cloud development environment that:
- ✅ Runs in your browser
- ✅ No local setup required
- ✅ Includes Node.js, npm, git pre-installed
- ✅ Free tier: 60 hours/month per user
- ✅ Same environment for all developers

---

## 🚀 Quick Start (5 minutes)

### Step 1: Open in Codespaces

1. Go to your GitHub repository
2. Click **<> Code** button
3. Click **Codespaces** tab
4. Click **Create codespace on main**
5. Wait 1-2 minutes for environment to load

### Step 2: Open Terminals

Once loaded:
1. Press **Ctrl + `** (backtick) to open terminal
2. Or click **Terminal** → **New Terminal**

### Step 3: Start Backend

In terminal 1:
```bash
cd backend
npm install
npm start
```

Wait for: `Server is running on port 5000`

### Step 4: Start Frontend

Open new terminal (Click **+** button in terminal):
```bash
cd frontend
npm install
npm start
```

Wait for React development server to start.

### Step 5: Access Application

1. You'll see a notification: **"Your application is running on port 3000"**
2. Click **Open in Browser**
3. Your app opens in a new tab!

---

## 🎮 Using the Editor

### VS Code Features Available

- **File Explorer**: Left sidebar
- **Search**: Ctrl+Shift+F
- **Extensions**: Install npm packages
- **Terminal**: Multiple terminals
- **Git**: Commit and push changes
- **Debugging**: Set breakpoints

### Useful Shortcuts

| Action | Shortcut |
|--------|----------|
| Open Command Palette | Ctrl+Shift+P |
| Search Files | Ctrl+P |
| Open Terminal | Ctrl+` |
| New Terminal | Ctrl+Shift+` |
| Split Terminal | Ctrl+Shift+5 |
| Save File | Ctrl+S |

---

## 💡 Common Tasks

### Create New Task

1. In frontend browser tab
2. Click **Add New Task**
3. Fill form and submit
4. Task appears in dashboard!

### Add New User

1. Click **Users** tab
2. Click **Add New User**
3. Fill form and submit

### Edit Files

1. Open any file in editor
2. Make changes
3. **Auto-save** saves changes
4. Browser automatically refreshes (hot reload)

### Run Git Commands

In terminal:
```bash
# Check status
git status

# Commit changes
git add .
git commit -m "Update feature"

# Push to GitHub
git push origin main

# Create new branch
git checkout -b feature/my-feature
```

---

## 🌐 Port Forwarding

### Automatic Port Forwarding

Codespaces automatically forwards:
- Port 3000 (Frontend)
- Port 5000 (Backend)
- Port 27017 (MongoDB - if needed)

### Access Your Ports

1. Click **Ports** tab in terminal area
2. You see your running ports
3. Click URL to access in browser
4. Or copy URL to share

---

## 🔐 Environment Variables

### Configure .env Files

1. Click file icon in editor
2. Navigate to `backend/.env`
3. Edit MONGODB_URI if needed
4. Save with Ctrl+S
5. Restart backend: Ctrl+C then `npm start`

---

## 🆘 Troubleshooting in Codespaces

### Port Already in Use

```bash
# Kill process on port
lsof -i :3000
kill -9 <PID>

# Or just stop terminal (Ctrl+C)
```

### npm install Takes Too Long

- Normal for first install (2-3 minutes)
- Subsequent installs are cached (30 seconds)
- Don't refresh page during install

### Cannot Connect Backend

1. Check backend is running (see `Backend running on 5000`)
2. Check frontend .env has correct API URL
3. Restart frontend

### Database Connection Error

1. MongoDB runs in Docker container
2. Check MONGODB_URI in .env
3. Should be: `mongodb://localhost:27017/task-manager`

---

## 📁 File Structure in Codespaces

```
TaskManagerWebsite/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env          ← Edit here
│   └── models/
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── .env          ← Edit here
│   └── public/
└── README.md
```

---

## 🔄 Workflow in Codespaces

### Edit and Test

1. Edit file in VS Code
2. Save (auto-saves)
3. Browser auto-refreshes
4. See changes immediately

### Debug Issues

1. Open browser DevTools: F12
2. Check Console for errors
3. Check Network tab for API calls
4. Check VS Code terminal for backend errors

### Commit Changes

```bash
# Stage changes
git add .

# Commit
git commit -m "Fix bug: description"

# Push
git push origin main
```

---

## 💾 Persisting Your Work

### Stop Codespace

1. Click **Settings** (gear icon)
2. Click **Stop codespace**
3. Your files are saved

### Resume Codespace

1. Go to repository
2. Click **<> Code**
3. Click **Codespaces**
4. Click your codespace name
5. Resumes from where you left off!

---

## 🚀 Advanced Features

### Forwarded Ports

Right-click port → Copy URL to share with team:
```
https://example-xyzabc.github.dev:3000
```

Team members can access your running app!

### Extensions

Install useful extensions:
1. Click **Extensions** icon
2. Search extension
3. Click **Install**

Recommended:
- ES7+ React/Redux/React-Native snippets
- MongoDB for VS Code
- Thunder Client (API testing)

### Settings

1. Click **Settings** (gear icon)
2. Edit theme, font size, etc.
3. Settings sync across sessions

---

## 📊 Performance Tips

### Improve Speed

1. **Close unused programs**
2. **Use Chrome browser** (fastest)
3. **Close extra terminals**
4. **Clear browser cache** (F12 → Application)

### Monitor Usage

1. Click **Codespaces** tab
2. See hours used this month
3. See storage used
4. Manage codespaces

---

## 🎯 Typical Codespaces Session

```
1. Open Codespaces (2 min)
   ↓
2. Install dependencies (3 min)
   ↓
3. Start servers (1 min)
   ↓
4. Edit and test (30+ min)
   ↓
5. Commit changes (1 min)
   ↓
6. Stop codespace (0 min)
```

Total productive time: 30+ minutes
Total cost: ~0.2 hours (free tier includes 60 hours/month)

---

## 💰 Codespaces Pricing

### Free Tier
- **Hours/month**: 60 hours
- **Storage**: 15 GB
- **Cost**: $0

### Pro Tier
- **Additional hours**: $0.18/hour
- **Additional storage**: $0.07/GB/month
- **Usually not needed**

### Calculate Your Usage

- Development session: 2-3 hours
- Free tier allows: 20-30 sessions per month
- Perfect for side projects!

---

## 🌍 Share Your Codespace

### Option 1: Share URL (Temporary)

1. Right-click forwarded port
2. Copy URL
3. Share with team
4. They access your running app
5. Works while Codespace is running

### Option 2: Share Repository

1. Push code to main branch
2. Team clones repository
3. They open their own Codespace
4. Same setup, no conflicts

### Option 3: Collaborative Editing (Enterprise)

1. Settings → Codespaces
2. Enable shared sessions
3. Invite team members
4. Real-time collaboration

---

## 🔐 Security

### Keep Secrets Safe

1. Never commit `.env` file
2. Already in `.gitignore`
3. Use GitHub Secrets for sensitive data
4. Environment variables stay local

### Access Control

- Only you can see your Codespaces
- Repository collaborators can't see your codespace
- Always review code before pushing

---

## 🆚 Codespaces vs Local Development

| Feature | Codespaces | Local |
|---------|-----------|-------|
| Setup Time | 2 min | 15 min |
| Installation | None | Full |
| Consistency | Always same | Machine-dependent |
| Offline | ❌ Need internet | ✅ Works offline |
| Cost | Free (60h/mo) | Computer cost |
| Resources | Powerful server | Laptop dependent |
| Collaboration | Easy sharing | Git required |

---

## 📚 Learn More

### Inside Codespaces:
- Press **Ctrl+Shift+P** → "Help: Welcome"
- Built-in tutorial available

### GitHub Docs:
- https://docs.github.com/en/codespaces
- Official tutorials and guides

---

## 🎉 You're Ready!

Now you can:
- ✅ Develop without local setup
- ✅ Collaborate with team
- ✅ Share running application
- ✅ Test in same environment
- ✅ Push changes to GitHub

**Start now**: Go to your repository → Code → Codespaces → Create!

---

## 💡 Pro Tips

1. **Bookmark your codespace** for quick access
2. **Use keyboard shortcuts** to work faster
3. **Set up extensions** before heavy editing
4. **Commit frequently** to save progress
5. **Share URLs** for real-time collaboration

---

## 🐛 Need Help?

### Common Issues

| Issue | Solution |
|-------|----------|
| Slow load | Refresh page, check internet |
| Port not open | Refresh Ports tab |
| npm stuck | Ctrl+C, then retry |
| Can't commit | Check git config or network |
| Out of storage | Delete node_modules, reinstall |

---

**Happy coding in the cloud!** ☁️✨
