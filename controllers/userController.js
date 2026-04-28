const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { sendWelcomeEmail } = require('../utils/mailer')

// ── POST /api/auth/register ──────────────────────────────────────────────────
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' })
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' })
    }

    // Check duplicate
    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(409).json({ message: 'An account with that email already exists.' })
    }

    // Hash password — plain-text never hits the DB
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Save user
    const user = new User({ name, email, password: hashedPassword })
    await user.save()

    // Send welcome email — wrapped in try/catch so email failure
    // never crashes the registration response
    try {
      await sendWelcomeEmail(user.email, user.name)
      console.log(`✓ Welcome email sent to ${user.email}`)
    } catch (emailErr) {
      console.error('✗ Email failed (non-fatal):', emailErr.message)
    }

    res.status(201).json({ message: 'Account created successfully! Please log in.' })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ message: 'Server error. Please try again.' })
  }
}

// ── POST /api/auth/login ─────────────────────────────────────────────────────
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password.' })
    }

    // Sign JWT — expires in 1 hour
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.status(200).json({
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Server error. Please try again.' })
  }
}

// ── GET /api/auth/me (protected) ─────────────────────────────────────────────
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found.' })
    res.status(200).json({ user })
  } catch (err) {
    res.status(500).json({ message: 'Server error.' })
  }
}
