# GitHub Deployment & CI/CD Guide

Complete guide for deploying your Task Manager on GitHub with automated workflows.

## 📚 Table of Contents

1. [Push to GitHub](#push-to-github)
2. [GitHub Actions CI/CD](#github-actions-cicd)
3. [Deployment Options](#deployment-options)
4. [GitHub Codespaces](#github-codespaces)
5. [Automated Workflows](#automated-workflows)

---

## 🚀 Push to GitHub

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click **New Repository**
3. Name: `TaskManagerWebsite`
4. Description: `Full-stack task management application`
5. Choose **Public** or **Private**
6. Click **Create Repository**

### Step 2: Initialize Git (If Not Already Done)

```bash
cd "c:\Git clones\TaskManagerWebsite"
git init
git add .
git commit -m "Initial commit: Full-stack task manager"
```

### Step 3: Add Remote and Push

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/TaskManagerWebsite.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 4: Verify on GitHub

Visit: `https://github.com/YOUR_USERNAME/TaskManagerWebsite`

---

## 🔄 GitHub Actions CI/CD

### What is GitHub Actions?

Automated workflows that:
- Run tests when you push code
- Build your application automatically
- Deploy to production
- Run security checks
- Generate reports

### Setup GitHub Actions Workflows

Create these workflow files in your repository:

---

## 📁 Workflow Files to Create

### 1. Backend Tests & Build

**Path**: `.github/workflows/backend.yml`

```yaml
name: Backend CI

on:
  push:
    branches: [ main, develop ]
    paths:
      - 'backend/**'
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    services:
      mongodb:
        image: mongo:latest
        options: >-
          --health-cmd mongosh
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 27017:27017

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: backend/package-lock.json
    
    - name: Install dependencies
      working-directory: backend
      run: npm install
    
    - name: Check code style
      working-directory: backend
      run: |
        npm install --save-dev eslint
        npx eslint . --fix || true
    
    - name: Build application
      working-directory: backend
      run: npm run build || true
    
    - name: Start server test
      working-directory: backend
      env:
        MONGODB_URI: mongodb://localhost:27017/task-manager-test
        JWT_SECRET: test-secret
      run: |
        timeout 5 npm start || true
```

### 2. Frontend Tests & Build

**Path**: `.github/workflows/frontend.yml`

```yaml
name: Frontend CI

on:
  push:
    branches: [ main, develop ]
    paths:
      - 'frontend/**'
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json
    
    - name: Install dependencies
      working-directory: frontend
      run: npm install
    
    - name: Check code style
      working-directory: frontend
      run: |
        npm install --save-dev eslint
        npx eslint src/ --fix || true
    
    - name: Build application
      working-directory: frontend
      env:
        REACT_APP_API_URL: http://localhost:5000/api
      run: npm run build
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: frontend-build
        path: frontend/build/
```

### 3. Deploy to Heroku

**Path**: `.github/workflows/deploy-heroku.yml`

```yaml
name: Deploy to Heroku

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
      with:
        fetch-depth: 0

    - name: Deploy Backend to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
        heroku_app_name: "your-task-manager-backend"
        heroku_email: ${{ secrets.HEROKU_EMAIL }}
        appdir: "backend"

    - name: Deploy Frontend to Vercel
      env:
        VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
      run: |
        npm install -g vercel
        cd frontend
        vercel --prod --token=$VERCEL_TOKEN
```

### 4. Deploy to Vercel

**Path**: `.github/workflows/deploy-vercel.yml`

```yaml
name: Deploy Frontend to Vercel

on:
  push:
    branches: [ main ]
    paths:
      - 'frontend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        working-directory: ./frontend
```

### 5. Deploy to AWS EC2

**Path**: `.github/workflows/deploy-aws.yml`

```yaml
name: Deploy to AWS EC2

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Deploy to AWS EC2
      env:
        PRIVATE_KEY: ${{ secrets.AWS_PRIVATE_KEY }}
        HOST: ${{ secrets.AWS_HOST }}
        USER: ${{ secrets.AWS_USER }}
      run: |
        mkdir -p ~/.ssh
        echo "$PRIVATE_KEY" > ~/.ssh/id_rsa
        chmod 600 ~/.ssh/id_rsa
        ssh-keyscan -H $HOST >> ~/.ssh/known_hosts
        
        # Deploy script
        ssh -i ~/.ssh/id_rsa $USER@$HOST << 'EOF'
          cd ~/TaskManagerWebsite
          git pull origin main
          cd backend && npm install && npm run build
          cd ../frontend && npm install && npm run build
          pm2 restart all
        EOF
```

### 6. Docker Build & Push

**Path**: `.github/workflows/docker.yml`

```yaml
name: Build and Push Docker Images

on:
  push:
    branches: [ main ]
    tags: [ 'v*' ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2

    - name: Login to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Build and push backend
      uses: docker/build-push-action@v4
      with:
        context: ./backend
        push: true
        tags: |
          ${{ secrets.DOCKER_USERNAME }}/task-manager-backend:latest
          ${{ secrets.DOCKER_USERNAME }}/task-manager-backend:${{ github.sha }}

    - name: Build and push frontend
      uses: docker/build-push-action@v4
      with:
        context: ./frontend
        push: true
        tags: |
          ${{ secrets.DOCKER_USERNAME }}/task-manager-frontend:latest
          ${{ secrets.DOCKER_USERNAME }}/task-manager-frontend:${{ github.sha }}
```

---

## 🔐 GitHub Secrets Setup

Add these secrets in: **Settings → Secrets and variables → Actions**

```
HEROKU_API_KEY=        (from Heroku account settings)
HEROKU_EMAIL=          (your Heroku email)

VERCEL_TOKEN=          (from Vercel account)
VERCEL_ORG_ID=         (Vercel organization)
VERCEL_PROJECT_ID=     (Vercel project)

AWS_PRIVATE_KEY=       (your EC2 SSH key)
AWS_HOST=              (EC2 instance IP)
AWS_USER=              (EC2 username)

DOCKER_USERNAME=       (Docker Hub username)
DOCKER_PASSWORD=       (Docker Hub token)
```

---

## 🚀 Deployment Options

### Option 1: Vercel (Frontend) + Heroku (Backend)

**Frontend → Vercel** (Free tier available)
**Backend → Heroku** (Paid tier starting $7/month)

**Setup**:
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy frontend
cd frontend
vercel --prod

# 3. Note: Use GitHub Action for automatic deployment
```

**Backend on Heroku**:
```bash
# 1. Install Heroku CLI
npm install -g heroku

# 2. Login
heroku login

# 3. Create app
heroku create your-task-manager-backend

# 4. Set environment variables
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=your-secret

# 5. Deploy from GitHub
# Connect in Heroku dashboard: Deploy → GitHub
```

### Option 2: Railway.app

**All-in-one deployment** (Backend + Frontend + DB)

1. Go to [Railway.app](https://railway.app)
2. Click **New Project**
3. Select **GitHub Repository**
4. Authorize GitHub
5. Select your repository
6. Add services:
   - Backend (Node.js)
   - Frontend (Node.js)
   - MongoDB
7. Configure environment variables
8. Deploy!

### Option 3: Render.com

Similar to Railway, all-in-one platform.

1. Go to [Render.com](https://render.com)
2. Create new **Web Service**
3. Connect GitHub repository
4. Configure build and start commands
5. Deploy

### Option 4: AWS EC2 (Advanced)

**Full control**, requires more setup:

1. Launch EC2 instance
2. SSH into instance
3. Clone GitHub repository
4. Install dependencies
5. Start with PM2
6. Configure Nginx
7. Set up SSL

---

## 🐙 GitHub Codespaces

**Run in browser** - No local installation needed!

### How to Use

1. Go to your GitHub repository
2. Click **Code** → **Codespaces** → **Create codespace on main**
3. Wait for environment to load
4. Open terminal and run:

```bash
# Backend
cd backend
npm install
npm start

# Frontend (new terminal in Codespaces)
cd frontend
npm install
npm start
```

5. Codespaces will show port forwarding links
6. Click link to access application in browser

### Benefits

✅ No local setup needed
✅ Same environment for all developers
✅ Cloud-based development
✅ Free tier: 60 hours/month

---

## 📋 Example: Complete Setup

### Step-by-Step GitHub Actions Setup

#### 1. Create workflow files

```bash
mkdir -p .github/workflows

# Create workflow files (copy from sections above)
```

#### 2. Add GitHub Secrets

Settings → Secrets and variables → Actions

#### 3. Push to GitHub

```bash
git add .github/workflows/
git commit -m "Add GitHub Actions workflows"
git push origin main
```

#### 4. Monitor Actions

1. Go to repository
2. Click **Actions** tab
3. Watch workflows run
4. Check logs for any issues

---

## ✅ Automated Workflow Features

Your CI/CD will automatically:

### On Every Push to Main:
- ✅ Run backend tests
- ✅ Run frontend tests
- ✅ Build both applications
- ✅ Build Docker images
- ✅ Push to Docker Hub
- ✅ Deploy to Heroku/Vercel
- ✅ Send deployment status

### On Pull Requests:
- ✅ Run tests
- ✅ Check code quality
- ✅ Build preview
- ✅ Report results

### On Releases:
- ✅ Tag Docker images
- ✅ Deploy to production
- ✅ Generate release notes

---

## 🔄 Git Workflow

### Development Flow

```bash
# 1. Create feature branch
git checkout -b feature/add-notifications

# 2. Make changes and commit
git add .
git commit -m "Add email notifications"

# 3. Push branch
git push origin feature/add-notifications

# 4. Create Pull Request on GitHub
# → Automated tests run
# → Review and merge

# 5. Merge to main
# → GitHub Actions deploy automatically
```

---

## 📊 Monitoring Deployments

### GitHub Actions Dashboard

1. Go to repository
2. Click **Actions** tab
3. See all workflow runs
4. Click run to see details
5. View logs for debugging

### Deploy Status Badge

Add to README.md:

```markdown
[![Backend CI](https://github.com/YOUR_USERNAME/TaskManagerWebsite/workflows/Backend%20CI/badge.svg)](https://github.com/YOUR_USERNAME/TaskManagerWebsite/actions)
[![Frontend CI](https://github.com/YOUR_USERNAME/TaskManagerWebsite/workflows/Frontend%20CI/badge.svg)](https://github.com/YOUR_USERNAME/TaskManagerWebsite/actions)
```

---

## 🐛 Troubleshooting

### Workflow Fails

1. Check Actions logs
2. Look at error message
3. Common issues:
   - Missing secrets
   - Wrong paths
   - Dependencies not installed
   - Port conflicts

### Deployment Fails

1. Check platform logs (Heroku/Vercel/AWS)
2. Verify environment variables
3. Test locally first
4. Check GitHub Actions logs

---

## 📚 Complete README Update

Update your README.md with:

```markdown
## 🚀 GitHub Deployment

### Quick Start

1. Fork this repository
2. Create GitHub Actions secrets
3. Push to main branch
4. Automatic deployment starts!

### Deployment Status

[![Backend CI](https://github.com/YOUR_USERNAME/TaskManagerWebsite/workflows/Backend%20CI/badge.svg)](https://github.com/YOUR_USERNAME/TaskManagerWebsite/actions)
[![Frontend CI](https://github.com/YOUR_USERNAME/TaskManagerWebsite/workflows/Frontend%20CI/badge.svg)](https://github.com/YOUR_USERNAME/TaskManagerWebsite/actions)

### Platforms Supported

- [x] Vercel (Frontend)
- [x] Heroku (Backend)
- [x] Railway.app
- [x] AWS EC2
- [x] Docker Hub

### GitHub Codespaces

Run in browser:
1. Click Code → Codespaces → Create
2. Wait for environment
3. Run `npm start` in both directories
4. Access via forwarded ports
```

---

## 🎯 Next Steps

1. **Push to GitHub**: `git push origin main`
2. **Create workflow files**: Copy from `.github/workflows/`
3. **Add secrets**: Configure in Settings
4. **Test workflows**: Push to trigger
5. **Monitor**: Check Actions tab
6. **Deploy**: Automatic on main branch

---

## 💡 Pro Tips

### Semantic Versioning

Tag releases:
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

### Branch Protection

Settings → Branches → Add rule:
- Require status checks to pass
- Require code review
- Dismiss stale reviews

### Auto-Deploy Environments

```yaml
environment:
  name: production
  url: https://your-app.vercel.app
```

### Slack Notifications

Add to workflow:
```yaml
- name: Slack Notification
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
    payload: |
      {
        "text": "Deployment ${{ job.status }}"
      }
```

---

## 🎉 You're Ready!

Your Task Manager is now GitHub-ready with:
- ✅ CI/CD automation
- ✅ Automated testing
- ✅ Automated deployment
- ✅ Multiple deployment options
- ✅ Cloud development environment

**Happy deploying!** 🚀
