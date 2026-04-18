# Task Manager - Deployment Guide

## Deployment Options

### Option 1: Local Deployment with Docker Compose

**Requirements:**
- Docker
- Docker Compose

**Steps:**

1. Clone the repository:
```bash
git clone <your-repo-url>
cd TaskManagerWebsite
```

2. Build and run containers:
```bash
docker-compose up -d
```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

---

### Option 2: Heroku Deployment

#### Backend Deployment

1. Create a Heroku account and install Heroku CLI

2. Create a new Heroku app:
```bash
cd backend
heroku create your-task-manager-backend
```

3. Add MongoDB Atlas to your app:
   - Sign up at https://www.mongodb.com/cloud/atlas
   - Create a cluster and get connection string
   - Set environment variable:
```bash
heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager
heroku config:set JWT_SECRET=your-secret-key
```

4. Deploy:
```bash
git push heroku main
```

#### Frontend Deployment

1. Update backend URL in frontend:
   - Create `.env` file in frontend directory:
```
REACT_APP_API_URL=https://your-task-manager-backend.herokuapp.com/api
```

2. Deploy to Vercel:
   - Go to https://vercel.com
   - Connect your GitHub repository
   - Set environment variables
   - Deploy

---

### Option 3: AWS EC2 Deployment

#### Prerequisites:
- AWS Account
- EC2 instance (Ubuntu 20.04 or later)
- SSH key pair

#### Steps:

1. Connect to your EC2 instance:
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

2. Install dependencies:
```bash
sudo apt update
sudo apt install -y nodejs npm mongodb
```

3. Clone your repository:
```bash
git clone <your-repo-url>
cd TaskManagerWebsite
```

4. Setup backend:
```bash
cd backend
npm install
npm start &
```

5. Setup frontend:
```bash
cd ../frontend
npm install
npm run build
npm install -g serve
serve -s build -l 3000 &
```

6. Install Nginx as reverse proxy:
```bash
sudo apt install -y nginx
```

7. Configure Nginx:
Create `/etc/nginx/sites-available/task-manager`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }

    location /api {
        proxy_pass http://localhost:5000;
    }
}
```

8. Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/task-manager /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

### Option 4: DigitalOcean App Platform

1. Push code to GitHub

2. Go to DigitalOcean App Platform

3. Create new app and select GitHub repository

4. Configure:
   - Backend: Node.js service
   - Frontend: Static site
   - Database: Managed MongoDB

5. Set environment variables and deploy

---

### Option 5: Render.com Deployment

#### Backend:

1. Create account at https://render.com

2. Create new Web Service:
   - Connect GitHub repository
   - Select backend folder
   - Build command: `npm install`
   - Start command: `npm start`

3. Add environment variables

4. Add MongoDB:
   - Create new PostgreSQL database
   - Update connection string

#### Frontend:

1. Create Static Site:
   - Connect GitHub repository
   - Build command: `npm run build`
   - Publish directory: `build`

---

## Production Checklist

- [ ] Update `.env` files with production values
- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS for production domain
- [ ] Set up database backups
- [ ] Enable logging and monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure email notifications (optional)
- [ ] Test all features in production
- [ ] Set up automated deployments (CI/CD)

## Monitoring & Maintenance

### Logs
```bash
# Backend logs
pm2 logs

# Frontend logs
tail -f /var/log/nginx/error.log
```

### Database Backup
```bash
# MongoDB backup
mongodump --uri=mongodb+srv://... --out=./backup

# MongoDB restore
mongorestore --uri=mongodb+srv://... ./backup
```

### Performance Monitoring
- Use PM2 for process management
- Monitor CPU and memory usage
- Set up alerts for downtime

## Troubleshooting

### Application won't start
- Check logs: `npm start` (see full error)
- Verify all environment variables are set
- Check database connection

### Frontend can't reach backend
- Verify backend URL in `.env`
- Check CORS settings
- Ensure backend is running

### Database connection issues
- Verify connection string
- Check IP whitelist (if using MongoDB Atlas)
- Test connection locally first

## Support

For issues or questions, refer to the main README.md or check GitHub issues.
