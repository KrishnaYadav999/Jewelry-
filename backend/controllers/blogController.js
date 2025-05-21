const Blog = require("../models/Blog");

// ✅ Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;

    // ✅ Check if required fields are missing
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const blog = new Blog({ title, content, imageUrl });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error("🔥 Error creating blog:", error);
    res.status(500).json({ error: "Failed to create blog", details: error.message });
  }
};

// ✅ Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("🔥 Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to fetch blogs", details: error.message });
  }
};

// ✅ Get a single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("🔥 Error fetching blog:", error);
    res.status(500).json({ error: "Failed to fetch blog", details: error.message });
  }
};

// ✅ Update a blog by ID
exports.updateBlog = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;

    // ✅ Check if required fields are missing
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, imageUrl },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("🔥 Error updating blog:", error);
    res.status(500).json({ error: "Failed to update blog", details: error.message });
  }
};

// ✅ Delete a blog by ID
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("🔥 Error deleting blog:", error);
    res.status(500).json({ error: "Failed to delete blog", details: error.message });
  }
};
