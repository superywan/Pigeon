import { query } from "express";
import pool from "../config/db.js";

/*
 @desc Get All Task 
 @route GET /api/posts
 @access PUBLIC
*/
export const getAllPosts = async (req, res) => {
    try {
        const posts = await pool.query(
            "SELECT * FROM posts ORDER BY updated_at DESC"
        );
        if (posts.rows.length === 0) {
            return res.status(404).json({ error: "No post" });
        }
        res.json(posts.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "server error" });
    }
};

/*
 @desc Get Post By PostId 
 @route GET /api/posts/:postId
 @access PUBLIC
*/
export const getPostByPostId = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await pool.query(
            "SELECT * FROM posts WHERE post_id = $1",
            [postId]
        );
        if (post.rows.length === 0) {
            return res
                .status(404)
                .json({ error: `No post found with ${postId}` });
        }
        res.json(post.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "server error" });
    }
};

/*
 @desc Get Post By Email 
 @route GET /api/posts/user/:email
 @access PUBLIC
*/
export const getPostByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const posts = await pool.query(
            "SELECT * FROM posts WHERE user_email = $1",
            [email]
        );
        if (posts.rows.length === 0) {
            return res.status(404).json({ error: "No post found" });
        }
        res.json(posts.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "server error" });
    }
};

/*
 @desc Create New Post 
 @route POST /api/posts
 @access PRIVATE 
*/
export const createNewPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { name, email } = req.userInfo;

        const newPost = await pool.query(
            "INSERT INTO posts (title, content, user_email, user_name) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, content, email, name]
        );
        res.json(newPost.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "server error" });
    }
};

/*
 @desc Update Post By PostId 
 @route PUT /api/posts/:postId
 @access PRIVATE 
*/
export const updatePostByPostId = async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, content } = req.body;
        const { email } = req.userInfo;

        const post = await pool.query(
            "SELECT * FROM posts WHERE post_id = $1",
            [postId]
        );
        if (post.rows[0].user_email !== email) {
            return res
                .status(401)
                .json({ error: "Access Denied : incorrect user" });
        }

        await pool.query(
            "UPDATE posts SET title=$1, content=$2, updated_at=extract(epoch from now() at time zone 'utc') WHERE post_id = $3 RETURNING *",
            [title, content, postId]
        );
        res.json(`Successfully Updated Post ${postId}`);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "server error" });
    }
};

/*
 @desc Delete Post By PostId 
 @route DELETE /api/posts/:postId
 @access PRIVATE 
*/
export const deletePostByPostId = async (req, res) => {
    try {
        const { postId } = req.params;
        const { email } = req.userInfo;

        const post = await pool.query(
            "SELECT * FROM posts WHERE post_id = $1",
            [postId]
        );
        if (post.rows[0].user_email !== email) {
            return res
                .status(401)
                .json({ error: "Access Denied : incorrect user" });
        }

        const deletedPost = await pool.query(
            "DELETE FROM posts WHERE post_id = $1",
            [postId]
        );
        res.json(`Successfully Deleted Post ${postId}`);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "server error" });
    }
};
