🍲 Recipe App (MERN Stack)

A full-stack Recipe Management Web App built using the MERN stack.
Users can register, login,logout , create recipes, upload images,update recipes,delete recipes,and also checked the recipes that are created by the user itself

🚀 Live Demo
🌐 Frontend: add after deployment
⚙️ Backend API: add after Render deployment


🧠 Features
🔐 User Authentication (JWT + Cookies)
📝 Create, Read ,update ,delete Recipes
🖼️ Image Upload (Cloudinary integration)
⚡ Protected Routes (Auth-based access)
🔄 Async API handling with Axios
📱 Responsive design
⚠️ Proper error handling (backend + frontend)
👍 Likes functionality
👎 Dislike functionality


🛠️ Tech Stack
Frontend
React.js
Axios
React Hooks (useState, useEffect, useContext)
CSS (custom styling)
Backend
Node.js
Express.js
MongoDB + Mongoose
JWT Authentication
Cookie-based auth
Services
MongoDB Atlas
Cloudinary
Render
Vercel
📁 Project Structure
fronted/        → React frontend
backend/        → Node + Express backend
models/        → MongoDB schemas
routes/        → API routes
controllers/   → Business logic
middlewares/   → Auth & multer for file upload
utils/         → Helpers (Cloudinary, etc.)


⚙️ Installation (Local Setup)
1. Clone repo
git clone "https://github.com/Ahsanulhaq01/full-stack-web-apps.git"
cd recipe-book
2. Backend setup
cd backend
npm install
npm run dev
Create .env file:
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx


4. Frontend setup
cd fronted
npm install
npm run dev


🌐 API Endpoints

Auth
POST /api/v1/user/register
POST /api/v1/user/login
GET /api/v1/user/check-auth


Recipes
GET /api/v1/recipe/recipes
GET /api/v1/recipe/recipe/:id
GET /api/v1/recipe/myrecipes

PUT /api/v1/recipe/recipe/:id
DELETE /api/v1/recipe/recipe/:id
POST /api/v1/recipe/recipe/:id/react
POST /api/v1/recipe/upload-recipe


🔐 Authentication Flow
JWT token stored in HTTP-only cookies
Protected routes check authentication
☁️ Image Handling
Images uploaded to Cloudinary
Cloudinary returns image URL
URL stored in MongoDB
Frontend renders image via URL


🚀 Deployment

Frontend
Vercel or Netlify

Backend
Render

Database
MongoDB Atlas

Image Storage
Cloudinary


👨‍💻 Author

Ahsan Ulhaq
Software Engineering Student
MERN Stack Developer (Learning Phase → Production Level)


This project is built as a real-world full-stack application covering authentication, API design, database integration, and deployment architecture.
