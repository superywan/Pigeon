import express from "express";
import validInfo from "../middlewares/validInfo.js";
import {
    authenticateUser,
    registerUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/login", validInfo, authenticateUser);
router.post("/register", validInfo, registerUser);

export default router;
