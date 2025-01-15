import {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getAllSingleBlog,
} from "../Controller/blogController.js";
import express from "express";
const router = express.Router();

router.post("/blog", createBlog);
router.get("/blog", getBlogs);
router.get("/allBlog", getAllBlogs);
router.get("/blog/:blogId", getBlog);
router.get("/allBlog/:blogId", getAllSingleBlog);
router.patch("/blog/:blogId", updateBlog);
router.delete("/blog/:blogId", deleteBlog);

export default router;
