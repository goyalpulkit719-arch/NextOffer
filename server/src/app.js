import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

import errorHandler from "./middlewares/error.middleware.js";
import appRoutes from "./routes/auth.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import leetcodeRoutes from "./routes/leetcode.routes.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended: true,
}));

app.use(cookieParser());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

// Default route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "NextOffer API is running.",
    })
});

app.use("/api/auth", appRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/leetcode", leetcodeRoutes);


app.use(errorHandler);

export default app;