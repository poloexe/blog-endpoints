import Blog from "../Model/blog.js";

//Create a blog
const createBlog = async (req, res) => {
  const { userId } = req.user;
  req.body.createdby = userId;

  try {
    const blog = await Blog.create(req.body);
    return res.status(201).json({ success: true, blog });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Get all blogs for that user
const getBlog = async (req, res) => {
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
const getSingleBlog = async (req, res) => {
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
    return res
      .status(400)
      .json({ success: false, error: "Failed to Update blogs" });
  }
};

//Delete a Blog
const deleteBlog = async (req, res) => {
  const { userId } = req.user;
  const { blogId } = req.params;
  try {
    const blogs = await Blog.findByIdAndDelete({
      createdby: userId,
      _id: blogId,
    });
    return res
      .status(200)
      .json({ success: true, msg: "Blog deleted successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Failed to Delete blogs" });
  }
};

// Get single blogs regardless of the user
const getAllUserSingleBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blogs = await Blog.findOne({ _id: blogId });
    return res.status(200).json({ success: true, blogs });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Failed to get all user blogs" });
  }
};

export {
  createBlog,
  getBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getAllUserBlog,
  getAllUserSingleBlog,
};
