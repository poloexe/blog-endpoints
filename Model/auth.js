import mongoose from "mongoose";
import validator from "validator";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      validate: [validator.isEmail, "Please provide a correct email address"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [7, "A minimum of 7 characters"],
    },
  },
  { timestamps: true }
);

//Hash pass
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.comparePassword = async function name(userPassword) {
  const isCorrect = await bcrypt.compare(userPassword, this.password);

  return isCorrect;
};

//gen jwt token
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.jwt_secret,
    { expiresIn: "1d" }
  );
};

const User = mongoose.model("User", userSchema);
export default User;
