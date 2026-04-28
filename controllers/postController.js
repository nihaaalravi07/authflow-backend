const Post = require('../models/Post')

// ── POST /api/posts ───────────────────────────────────────────────────────────
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' })
    }

    const post = new Post({
      title,
      content,
      author: req.user.id, // comes from JWT authMiddleware
    })

    await post.save()

    // Populate author name before returning
    await post.populate('author', 'name email')

    res.status(201).json({ message: 'Post created successfully.', post })
  } catch (err) {
    console.error('Create post error:', err)
    res.status(500).json({ message: 'Server error.' })
  }
}

// ── GET /api/posts ────────────────────────────────────────────────────────────
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 }) // newest first

    res.status(200).json({ posts })
  } catch (err) {
    console.error('Get posts error:', err)
    res.status(500).json({ message: 'Server error.' })
  }
}

// ── DELETE /api/posts/:id ─────────────────────────────────────────────────────
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' })
    }

    // Security check — only the author can delete their own post
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized. You can only delete your own posts.' })
    }

    await post.deleteOne()
    res.status(200).json({ message: 'Post deleted successfully.' })
  } catch (err) {
    console.error('Delete post error:', err)
    res.status(500).json({ message: 'Server error.' })
  }
}
