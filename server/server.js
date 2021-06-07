import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { notFound } from "./middlewares/errorHandler.js";

const app = express();

// Config "dotenv" to get access to environment variables
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);

const __dirname = path.resolve(); // Setting absolute path !!IMPORTANT!!
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send(`Server is running on port ${process.env.PORT}`);
    });
}

app.use(notFound);

const listener = app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${listener.address().port}`);
});
