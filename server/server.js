import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import { notFound } from "./middlewares/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

// Config "dotenv" to get access to environment variables
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);

app.use(notFound);

// filenames across platforms
const __dirname = dirname(fileURLToPath(import.meta.url));
// production.env.NODE_ENV => production or undefined
if (process.env.NODE_ENV === "production") {
    // serve build version of react (static files)
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    );
}

const listener = app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${listener.address().port}`);
});
