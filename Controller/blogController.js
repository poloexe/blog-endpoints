import Blog from "../Model/blog.js";
import handleBlogError from "../utils/handleBlogError.js";

//Create a blog
const createBlog = async (req, res) => {
  const { userId } = req.user;
  req.body.createdby = userId;

  try {
    const blog = await Blog.create(req.body);
    return res.status(201).json({ success: true, blog });
  } catch (error) {
    const errors = handleBlogError(error);
    return res.status(400).json({ errors });
  }
};

// Get all blogs for that user
const getBlogs = async (req, res) => {
  const { userId } = req.user;
  try {
    const blogs = await Blog.find({ createdby: userId });
    return res.status(200).json({ success: true, blogs });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Failed to fetch blogs" });
  }
};

// Get a single blog for that user
const getBlog = async (req, res) => {
  const { userId } = req.user;
  const { blogId } = req.params;
  try {
    const blogs = await Blog.findOne({ createdby: userId, _id: blogId });
    return res.status(200).json({ success: true, blogs });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Failed to fetch blog" });
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  const { userId } = req.user;
  const { blogId } = req.params;
  try {
    const blogs = await Blog.findByIdAndUpdate(
      {
        createdby: userId,
        _id: blogId,
      },
      req.body,
      { new: true, runValidators: true }
    );
    return res.status(200).json({ success: true, blogs });
  } catch (error) {
    const errors = handleBlogError(error);
    return res.status(400).json(errors);
  }
};

//Delete a Blog
const deleteBlog = async (req, res) => {
  const { userId } = req.user;
  const { blogId } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete({
      createdby: userId,
      _id: blogId,
    });
    return res
      .status(200)
      .json({ success: true, msg: "Blog deleted successfully" });
  } catch (error) {
    const errors = handleBlogError(error);
    return res.status(400).json(errors);
  }
};

// Get all blogs regardless of the user
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    return res.status(200).json({ success: true, blogs });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Failed to get all blogs" });
  }
};

// Get single blog regardless of the user
const getAllSingleBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findOne({ _id: blogId });
    return res.status(200).json({ success: true, blog });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Failed to get blog" });
  }
};

export {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getAllSingleBlog,
};
