import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";


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


export default app;