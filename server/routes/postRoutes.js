import express from "express";
import { authorizeUser } from "../middlewares/authorizeUser.js";
import {
    createNewPost,
    deletePostByPostId,
    getAllPosts,
    getPostByEmail,
    getPostByPostId,
    updatePostByPostId,
} from "../controllers/postControllers.js";

const router = express.Router();

/*
  @routes
    createNewPost (POST /api/posts)
    getAllPosts (GET /api/posts)
    getPostByPostId (GET /api/posts/:id)
    getPostByEmail (GET /api/posts/user/:email)
    updatePostByPostId (PUT /api/posts/:id)
    deletePostByPostId (DELETE /api/posts/:id)
*/
router.route("/").get(getAllPosts).post(authorizeUser, createNewPost);
router
    .route("/:postId")
    .get(getPostByPostId)
    .put(authorizeUser, updatePostByPostId)
    .delete(authorizeUser, deletePostByPostId);
router.route("/user/:email").get(getPostByEmail);

export default router;
