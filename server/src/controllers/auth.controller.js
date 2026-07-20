import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import imageKit from "../config/imagekit.js";

import { registerUser, loginUser, updateAvatar, updateProfile, getCurrentUser } from "../services/auth.service.js";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
};

const register = asyncHandler( async (req, res) => {

    const user = await registerUser(req.body);
    const token = generateToken(user._id);

    res.cookie("token", token, cookieOptions)

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
    })

});


const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const user = await loginUser(email, password);

    const token = generateToken(user._id);

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: user,
    });

})


const logout = asyncHandler(async (req, res) => {

	res.clearCookie("token");

	res.status(200).json({
		success: true,
		message: "Logged out successfully",
	})

});


const updateProfileC = asyncHandler(async (req, res) => {

	const updatedUser = await updateProfile(req.user._id, req.body.targetCompany);

	res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
    });

});


const getProfile = asyncHandler(async (req, res) => {

    const user = await getCurrentUser(req.user._id);

    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user,
    });

});


const updateUserAvatar = asyncHandler(async (req, res) => {

    if(!req.file) {
        throw new Error("Avatar image is required.");
    }

    const uploadImage = await imageKit.files.upload({
        file: req.file.buffer.toString('base64'),
        fileName: `${req.user._id}-${Date.now()}`,
        folder: "/NextOffer/Avatars"
    });

    const updatedUser = await updateAvatar(req.user._id, uploadImage.url);

    res.status(200).json({
        success: true,
        message: "Avatar updated successfully",
        data: updatedUser,
    });


});


export {
    register,
    login,
    logout,
    updateProfileC,
    getProfile,
    updateUserAvatar
};
