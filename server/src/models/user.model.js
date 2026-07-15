import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    avatar: {
      type: String,
      default: "",
    },

    leetcodeUsername: {
      type: String,
      required: [true, "LeetCode username is required"],
      trim: true,
    },

    codeforcesUsername: {
      type: String,
      required: [true, "Codeforces username is required"],
      trim: true,
    },

    currentResume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      default: null,
    },

    targetCompany: {
      type: String,
      default: "",
      required: [true, "Required! you can change later"],
      trim: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;