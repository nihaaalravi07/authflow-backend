const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/userController')
const authMiddleware = require('../middleware/auth')

// Public routes
router.post('/register', registerUser)
router.post('/login', loginUser)

// Protected route
router.get('/me', authMiddleware, getMe)

module.exports = router
