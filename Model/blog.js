import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    tag: {
      type: String,
      enum: ["Nature", "Lifestyle", "Technology", "Sport"],
    },
    createdby: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a writer"],
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
