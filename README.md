AuthFlow — User Posts & Data Relationships
A full-stack web application built with React, Node.js, Express, and MongoDB that handles user authentication and post management with relational data.

Features

🔐 User authentication (register, login, logout)
📝 Create, view, and delete posts
👤 Author name displayed on each post using .populate()
🛡️ Protected routes — only the post author can delete their own post
📧 Email utility via mailer
🔗 JWT-based auth middleware


Tech Stack
LayerTechnologyFrontendReact, ViteBackendNode.js, ExpressDatabaseMongoDB, MongooseAuthJWT (JSON Web Tokens)EmailNodemailer

Project Structure
lab23/
├── backend/
│   ├── controllers/
│   │   ├── userController.js   ← auth logic
│   │   └── postController.js   ← create, getAll, delete post
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js             ← author ref to User
│   ├── routes/
│   │   ├── auth.js
│   │   └── postRoutes.js       ← /api/posts endpoints
│   ├── utils/
│   │   └── mailer.js
│   ├── .env
│   └── server.js
└── frontend/
    └── src/
        ├── pages/
        │   ├── PostsPage.jsx
        │   ├── HomePage.jsx
        │   ├── LoginPage.jsx
        │   └── SignupPage.jsx
        ├── components/
        │   └── Navbar.jsx
        ├── App.jsx
        └── api.js

Getting Started
Prerequisites

Node.js installed
MongoDB connection URI
.env file configured (see below)

Installation & Run
bash# Terminal 1 — Backend
cd backend
npm install
node server.js

# Terminal 2 — Frontend
cd frontend
npm install
npm run dev

Environment Variables
Create a .env file in the backend/ directory:
envMONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
PORT=5000

API Endpoints
MethodRouteAuth RequiredDescriptionPOST/api/auth/registerNoRegister a new userPOST/api/auth/loginNoLogin and receive JWT tokenGET/api/postsNoFetch all posts (with author name)POST/api/postsYesCreate a new postDELETE/api/posts/:idYesDelete a post (author only)

Security Notes

Passwords are hashed before storing
JWT tokens are used for session management
Only the original author can delete their post
.env file is excluded from version control


Live Demo

🌐 Frontend: authflow-ivory-eight.vercel.app


Author
Nihal Ravi — @nihaaalravi07
