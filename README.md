# E-Commerce Website

A summary

This project is a full-stack e-commerce platform that was constructed with the MERN stack and is intended to offer smooth online purchasing. It has support for key features including order tracking, safe payments, product administration, shopping cart functionality, and user authentication.

Because it has an admin dashboard for managing users and products, it is appropriate for small and medium-sized enterprises looking to launch a polished online store.

Both desktop and mobile users will enjoy a seamless experience thanks to the app's responsive design and device optimization. Razorpay is used for payment processing, Node.js with Express is used for the backend, MongoDB is used for a scalable database, and React is used for a dynamic frontend.


## Features

🛒 Easy browsing, filtering, and purchasing of products.
🔒 Secure registration and login for users.
🛍️ Shopping cart with real-time updates.
💳 Integrated payment gateway for quick transactions.
📦 Track orders and view purchase history.
📋 Admin panel for managing inventory, users, and orders.


🛠 Tech Stack

Frontend: React (developed with Vite), Tailwind CSS for styling, and React Router DOM for navigation.

Backend: Express.js, Node.js.
MongoDB is the database, and MongoDB Compass is used for management.

JSON Web Tokens (JWT) are used for secure connections as authentication.

Cloudinary and Multer are used to manage file uploads.
Payments: Razorpay is integrated.

Extra Resources:

Bcryptjs: For security and hashing passwords.

Cloudinary: For managing and storing images.

Cookie-parser: To interpret HTTP requests' cookies.

cors: To respond to requests from different origins.

Dotenv: For controlling environmental factors.

Express: The API's backend framework.

jsonwebtoken: Used to generate and validate JWTs.

MongoDB object modeling is done with mongoose.

multer: For managing uploads of files.

nodemon: To restart the server automatically while it's being developed.

validater: For the purpose of requesting data validation


🚀 Installation

## Prerequisites

Node.js and npm installed.

MongoDB instance running (local or cloud-based).

A Cloudinary account for image management.

Razorpay account for payment integration.

## Clone the Repository

git clone https://github.com/saquib123khan/Full-Stack-E-commerce-Website.git

```bash
   cd prescripto
```

## Backend Setup

1. Navigate to the backend directory:

```bash
   cd backend
```
2. Install dependencies:

```bash
   npm intall
```


## Environment Variables

3. To run this project, you will need to add the following 


environment variables to your .env file

PORT=4000

MONGODB_URI=*****

CLOUDINARY_NAME=your_cloudinary_name

CLOUDINARY_API_KEY=your_cloudinary_api_key

CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

RAZORPAY_KEY_ID=your_razorpay_key_id

RAZORPAY_KEY_SECRET=your_razorpay_key_secret

JWT_SECRET=your_jwt_secret

## backend Setup

4. Start the backend server:

```bash
   cd backend
```

```bash
  npm run dev
```
## Frontend Setup

1. Navigate to the frontend directory:

```bash
   cd frontend
```

2. Install dependencies:

```bash
   npm install
```

3. Configure environment variables by creating a .env file:

VITE_BACKEND_URL=http://localhost:5000

4. Start the frontend server:

```bash
   npm run dev
```

##  Admin Setup

1. Navigate to the admin directory:

1. Navigate to the frontend directory:

```bash
   cd admin
```

2. Install dependencies:

```bash
   npm install
```

3. Configure environment variables by creating a .env file:

VITE_BACKEND_URL=http://localhost:5000

4. Start the frontend server:

```bash
   npm run server
```

📖 Usage

Admin Features:
Manage products (add/edit/delete).
View and manage orders.
Track user activities.
User Features:
Browse products.
Add items to the cart.
Place orders and make payments.
View order history.


📂 Project Structure
ecommerce-website/
├── backend/              # Node.js & Express backend
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── controllers/      # Route logic
│   ├── utils/            # Helper functions
│   └── server.js         # Entry point
├── frontend/             # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Application pages
│   │   ├── redux/        # State management
│   │   └── App.js        # Entry point
└── README.md             # Documentation