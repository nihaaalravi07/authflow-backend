require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/postRoutes')

const app = express()
const PORT = process.env.PORT || 4001

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

// Health check
app.get('/', (req, res) => res.json({ status: 'Lab 23 Auth + Posts API running ✓' }))

// ── MongoDB connection ─────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✓ MongoDB connected')
    app.listen(PORT, () => console.log(`✓ Server running on http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('✗ MongoDB connection failed:', err.message)
    process.exit(1)
  })
