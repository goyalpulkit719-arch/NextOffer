import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

const authMiddleware = asyncHandler(async(req, res, next) => {

    const token = req.cookies.token;

    if(!token) {
        res.status(401);
        throw new Error("Please login to continue");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if(!user) {
        res.status(401);
        throw new Error("User not found");
    }

    req.user = user;
    next();

});


export default authMiddleware;