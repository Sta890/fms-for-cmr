# 🍃 MongoDB Setup Guide for Farm App

## Option 1: MongoDB Atlas (Cloud - Recommended)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/atlas
2. Click "Try Free" and create account
3. Create a new project called "Farm App"

### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose "FREE" shared cluster
3. Select your preferred region
4. Name your cluster "farm-app-cluster"
5. Click "Create Cluster"

### Step 3: Create Database User
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Username: `farmapp`
4. Password: Generate secure password (save it!)
5. Database User Privileges: "Read and write to any database"
6. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password

### Step 6: Update Your App
1. Open `backend/.env` file
2. Replace the MONGODB_URI with your Atlas connection string:
```
MONGODB_URI=mongodb+srv://farmapp:<password>@farm-app-cluster.xxxxx.mongodb.net/farm-app?retryWrites=true&w=majority
```

---

## Option 2: Local MongoDB Installation

### Step 1: Download MongoDB
1. Go to https://www.mongodb.com/try/download/community
2. Download MongoDB Community Server for Windows
3. Run the installer with default settings

### Step 2: Download MongoDB Compass
1. Go to https://www.mongodb.com/try/download/compass
2. Download and install MongoDB Compass
3. This gives you a visual interface for your database

### Step 3: Start MongoDB Service
Open Command Prompt as Administrator and run:
```cmd
net start MongoDB
```

### Step 4: Connect with Compass
1. Open MongoDB Compass
2. Use connection string: `mongodb://localhost:27017`
3. Click "Connect"

### Step 5: Create Database
1. In Compass, click "Create Database"
2. Database Name: `farm-app`
3. Collection Name: `farms`
4. Click "Create Database"

---

## 🚀 Running the Farm App

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Setup Environment
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string
```

### Step 3: Seed Database
```bash
npm run db:seed
```

### Step 4: Start Backend
```bash
npm run dev
```

### Step 5: Start Frontend
```bash
cd ../frontend
npm run dev
```

---

## 🔍 Viewing Your Database

### With MongoDB Compass:
1. Open MongoDB Compass
2. Connect to your database
3. Browse collections: `farms`, `users`, `activities`, `crops`
4. View, edit, and manage your data visually

### With MongoDB Atlas:
1. Go to your Atlas dashboard
2. Click "Browse Collections"
3. View your data in the web interface

---

## 📊 Database Collections

Your Farm App will create these collections:

### `farms` Collection
- Farm details, location, size, crops
- Financial data (revenue, expenses)
- Owner and manager information

### `users` Collection  
- User accounts for login
- Roles and permissions

### `activities` Collection
- Farm activities and tasks
- Scheduling and completion status

### `crops` Collection
- Crop information and health data
- Planting and harvest schedules

---

## 🛠️ Troubleshooting

### Connection Issues:
- Check if MongoDB service is running
- Verify connection string is correct
- Check network access settings (Atlas)

### Permission Issues:
- Ensure database user has correct permissions
- Check IP whitelist settings (Atlas)

### Data Not Showing:
- Run the seed command: `npm run db:seed`
- Check if collections were created
- Verify API endpoints are working

---

## 🎯 Next Steps

1. **Setup MongoDB** (Atlas or Local)
2. **Update connection string** in `.env`
3. **Run seed command** to populate data
4. **Start the application**
5. **Open MongoDB Compass** to view your data
6. **Test the app** - add farms, generate reports

Your data will be stored in a real MongoDB database that you can view and manage!
