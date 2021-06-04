import bcrypt from "bcrypt";
import pool from "../config/db.js";
import generateToken from "../utils/generateToken.js";

export const authenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        if (user.rows.length === 0) {
            return res
                .status(401)
                .json({ error: "password or email Incorrect" });
        }

        const isValidPwd = await bcrypt.compare(
            password,
            user.rows[0].password
        );
        if (!isValidPwd) {
            return res.status(401).json({ error: "Invalid credential" });
        }

        const token = generateToken(user.rows[0].user_id);
        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "server error" });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        if (user.rows.length !== 0) {
            return res.status(401).json({ error: "user already exist" });
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const newUser = await pool.query(
            "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [firstName, lastName, email, encryptedPassword]
        );
        const token = generateToken(newUser.rows[0].user_id);
        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "server error" });
    }
};
