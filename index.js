import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const URI = process.env.MONGO_URI;
import authRouter from "./Router/authRouter.js";
import auth from "./middleware/authentication.js";
import blogRouter from "./Router/blogRouter.js";
import notFound from "./utils/notFound.js";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// jwt middleware
app.get("/api/v1/test", auth, (req, res) => {
  return res.send("Authentication passed!!");
});

// Routers
app.use("/api/v1", authRouter);
app.use("/api/v1", auth, blogRouter);

//Error route
app.use(notFound);

const start = async () => {
  try {
    await mongoose.connect(URI);

    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}....`);
    });
  } catch (error) {
    console.log(`Error is this: ${error}`);
  }
};

start();
