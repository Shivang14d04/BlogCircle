# 📘 BlogCircle — Node.js Blog Application

A full-stack blog application built using **Node.js, Express, MongoDB, JWT Authentication, Cookies, Multer (file uploads), and EJS views**.  
Users can **sign up, log in, create blogs, upload images, and comment on other users’ posts**.

---

## Features

### 🔐 Authentication
- JWT-based authentication  
- Cookies for storing secure tokens  
- Protected routes for blog creation & comments  

### 📝 Blogging Features
- Create blog posts  
- Upload images using **Multer**  
- View all blogs  
- View blog details  
- Comment on any blog  

### 💬 Comments
- Only logged-in users can comment  
- Linked to both blog & user  

### 🎨 View Engine
- **EJS templating** for all pages  

### 🗄 Database
- MongoDB with **Mongoose** models:
  - User  
  - Blog  
  - Comment  

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/blogapp_project.git
cd blogapp_project
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Create .env File

Create a .env file in the project root:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
COOKIE_SECRET=your_cookie_secret
```
### 4️⃣ Start the Server

Development:
```bash
npm run dev
```
Production:
```bash
npm start
```
