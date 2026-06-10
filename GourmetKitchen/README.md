# GourmetKitchen 🍳

GourmetKitchen is a full-stack, feature-rich web application designed for culinary enthusiasts. It allows users to discover, share, and save delicious recipes from around the world. With a built-in social system, chefs can follow each other and receive real-time notifications when their creations are appreciated.

## 🔗 Live Demo
[View the Live Masterpiece Here](https://gourmetkitchen-one.vercel.app/)

## 🚀 Tech Stack

### Frontend
- **React 19** (Vite-powered)
- **React Router Dom** (Navigation)
- **Axios** (API Requests)
- **React Hook Form** (Form Management)
- **React Toastify** (Notifications)
- **React Icons**

### Backend
- **Node.js & Express**
- **MongoDB & Mongoose** (Database)
- **JWT & Cookie-parser** (Authentication)
- **Multer & Cloudinary** (Image Uploads)
- **Bcrypt** (Password Hashing)

---

## ✨ Key Features

### 🔐 Robust Authentication
- **Secure Sign-up & Login:** Uses JWT and HTTP-only cookies for persistent, secure sessions.
- **Profile Management:** Users can upload profile pictures and manage their personal information.

### 📖 Recipe Exploration & Management
- **Discover Recipes:** Browse recipes by categories like Breakfast, Lunch, Dinner, Dessert, and Vegetarian.
- **Advanced Search:** Real-time debounced search to find recipes by title, ingredients, or cuisine.
- **Full CRUD:** Creators can add, update (with pre-populated fields), and delete their own recipes.
- **Image Integration:** Seamlessly upload high-quality recipe photos via Cloudinary.

### 🤝 Social Features
- **Follow System:** Follow your favorite chefs and build a community.
- **Save Collection:** Save recipes created by others to your personal "Saved Recipes" collection.
- **Profile Sharing:** Share chef profiles directly using the Web Share API or copy link fallback.

### 🔔 Activity Notifications
- **In-App Notifications:** Get notified instantly when someone follows you or saves one of your recipes.
- **Unread Badge:** Keep track of new activity with a dynamic notification count.

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB URI
- Cloudinary Account (for image uploads)

### 1. Clone the Repository
```bash
git clone https://github.com/Ahsanulhaq01/full-stack-web-apps/tree/master/GourmetKitchen
cd GourmetKitchen
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
RREFRESH_TOKEN_SECRET=your_refresh_token_secret
RREFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
Run the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../fronted
npm install
```
Run the development server:
```bash
npm run dev
```

---

## 📁 Project Structure

```text
/
├── backend/
│   ├── src/
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # Database schemas
│   │   ├── routes/       # API endpoints
│   │   ├── middleware/   # Auth & Upload handlers
│   │   └── utils/        # Helpers (Cloudinary, AsyncHandlers)
│   └── public/upload/    # Temporary local storage for Multer
└── fronted/
    ├── src/
    │   ├── components/   # Reusable UI (Navbar, Cards, etc.)
    │   ├── pages/        # Main views (Home, Profile, Details)
    │   ├── customHook/   # Logic reuse (Auth, Fetching)
    │   ├── context/      # Auth state management
    │   └── utils/        # Axios configuration
```

## 📜 License
This project is [MIT](LICENSE) licensed.

---
Made with ❤️ by Ahsanulhaq
