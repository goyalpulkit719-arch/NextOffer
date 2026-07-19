import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Resume from "../models/resume.model.js";

const registerUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });

  const createdUser = await User.findById(user._id).select("-password");

  return createdUser;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  const loggedInUser = await User.findById(user._id).select("-password");

  return loggedInUser;
};

const updateProfile = async (userId, targetCompany) => {

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            targetCompany,
        },
        {
            new: true,
            runValidators: true,
        }
    ).select("-password");

    if (!updatedUser) {
        throw new Error("User not found");
    }

    return updatedUser;
};

const updateAvatar = async (userId, avatarUrl) => {

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            avatar: avatarUrl,
        },
        {
            new: true,
            runValidators: true,
        }
    ).select("-password");

    if (!updatedUser) {
        throw new Error("User not found");
    }

    return updatedUser;
};

const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select("-password").populate("currentResume", "fileUrl originalName");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export { registerUser, loginUser, updateProfile, updateAvatar, getCurrentUser };
