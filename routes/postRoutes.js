const express = require('express')
const router = express.Router()
const { createPost, getAllPosts, deletePost } = require('../controllers/postController')
const authMiddleware = require('../middleware/auth')

// GET /api/posts — public (anyone can read posts)
router.get('/', getAllPosts)

// POST /api/posts — protected (must be logged in)
router.post('/', authMiddleware, createPost)

// DELETE /api/posts/:id — protected (only author can delete)
router.delete('/:id', authMiddleware, deletePost)

module.exports = router
