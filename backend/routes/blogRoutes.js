const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Create a new blog
router.post('/blogs', blogController.createBlog);

// Get all blogs
router.get('/blogs', blogController.getAllBlogs);

// Get a single blog by ID
router.get('/blogs/:id', blogController.getBlogById);

// Update a blog by ID
router.put('/blogs/:id', blogController.updateBlog);

// Delete a blog by ID
router.delete('/blogs/:id', blogController.deleteBlog);

module.exports = router;