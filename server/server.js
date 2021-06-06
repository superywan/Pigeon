import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import { notFound } from "./middlewares/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

// Config "dotenv" to get access to environment variables
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(process.cwd(), "client/build")));
}

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);

app.use(notFound);

app.get("*", (req, res) => {
    res.sendFile(path.join(process.cwd(), "client/build/index.html"));
});

const listener = app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${listener.address().port}`);
});
