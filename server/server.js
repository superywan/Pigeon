import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { notFound } from "./middlewares/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);

app.use(notFound);

const listener = app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${listener.address().port}`);
});
