# 💰 Expense Tracker — Full Stack (React + Node.js)

A responsive Full Stack Expense Tracker built with React and Node.js. It allows users to securely manage income and expenses with real-time updates and persistent storage in MongoDB.

---

## 🚀 Features

- 🔐 **User Authentication:** Secure Sign Up and Login using JWT.
- 📊 **Real-time Balance:** Automatic calculation of balance, income, and expenses.
- ➕ **Transaction Management:** Add and delete transactions (expenses/budget).
- 🔍 **Search & Filter:** Easily find transactions by name, amount, or type.
- 💾 **Persistent Storage:** Data is stored in MongoDB, ensuring it's available across devices.
- 📱 **Responsive Design:** Works seamlessly on mobile and desktop.

---

## Live Demo 

### Expense tracker (https://expense-pro-green.vercel.app/)
## 🛠️ Tech Stack

### Frontend
- **Framework:** React (Vite)
- **Routing:** React Router DOM
- **API Client:** Axios
- **Styling:** CSS

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JSON Web Tokens (JWT) & BcryptJS

---

## ⚙️ Installation & Setup

### 1. Clone the repository
git clone https://github.com/Ahsanulhaq01/full-stack-web-apps/blob/master/expense-tracker
cd expense-tracker

### 2. Install dependencies
# Install root dependencies (for orchestration)
npm install

# Install all sub-project dependencies
npm run install-all

### 3. Environment Setup
Create a `.env` file in the `backend` directory and add:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

### 4. Run the application
# Start both frontend and backend from the root
npm run dev


👨‍💻 Author

Ahsan Ul Haq
MERN Stack Developer
