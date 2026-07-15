import express from "express";

import { register, login, logout, updateProfileC, getProfile, updateUserAvatar } from "../controllers/auth.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import uploadImage from "../middlewares/uploadImage.middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", authMiddleware, logout);

router.patch("/profile", authMiddleware, updateProfileC);

router.get("/me", authMiddleware, getProfile);

router.post("/avatar", authMiddleware, uploadImage.single("avatar"), updateUserAvatar);
export default router;