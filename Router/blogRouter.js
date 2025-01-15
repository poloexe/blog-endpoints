import {
  createBlog,
  getBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getAllUserBlog,
  getAllUserSingleBlog,
} from "../Controller/blogController.js";
import express from "express";
const router = express.Router();

router.post("/blog", createBlog);
router.get("/blog", getBlog);
router.get("/allBlog", getAllUserBlog);
router.get("/blog/:blogId", getSingleBlog);
router.get("/allBlog/:blogId", getAllUserSingleBlog);
router.patch("/blog/:blogId", updateBlog);
router.delete("/blog/:blogId", deleteBlog);

export default router;
