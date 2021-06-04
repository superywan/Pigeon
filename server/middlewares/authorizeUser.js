import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const authorizeUser = async (req, res, next) => {
    let token;
    const auth = req.headers.authorization;
    if (auth && auth.startsWith("Bearer")) {
        try {
            token = auth.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await pool.query(
                "SELECT * FROM users WHERE user_id = $1",
                [decoded.user]
            );
            req.userInfo = {
                name: `${user.rows[0].first_name} ${user.rows[0].last_name}`,
                email: user.rows[0].email,
            };
            next();
        } catch (error) {
            res.status(401).json({ error: "Not authorized : token failed" });
        }
    }

    if (!token) {
        return res.status(401).json({ error: "Not authorized : no token" });
    }
};
