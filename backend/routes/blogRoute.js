const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

// CREATE BLOG
router.post("/create", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json({ success: true, msg: "Blog created", blog });
  } catch (err) {
    res.json({ success: false, msg: "Error creating blog" });
  }
});

// GET BLOGS
router.get("/all", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json({ success: true, blogs });
});

module.exports = router;