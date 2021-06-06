import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getPostByPostId,
    deletePost,
    getAllPosts,
} from "../actions/postActions";

import "../styles/screens/postScreen/postScreen.css";
import { POST_DELETE_RESET } from "../constants/postConstants";

const PostScreen = ({ history, match }) => {
    const dispatch = useDispatch();

    const postDetails = useSelector((state) => state.postDetails);
    const { loading: postLoading, error: postError, post } = postDetails;

    const postDelete = useSelector((state) => state.postDelete);
    const {
        loading: deleteLoading,
        error: deleteError,
        success: deleteSuccess,
    } = postDelete;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (deleteSuccess) {
            dispatch(getAllPosts());
            dispatch({ type: POST_DELETE_RESET });
            history.push("/");
        }
        dispatch(getPostByPostId(match.params.id));
    }, [dispatch, history, match, deleteSuccess]);

    const getConvertedTime = (time) => {
        let date = new Date(0);
        date.setUTCSeconds(time);
        const stringDate = date.toString().split(" ").slice(0, 4).join(" ");
        return stringDate;
    };

    const handleDelete = () => {
        dispatch(deletePost(post.post_id));
    };

    return (
        <div className="post">
            {postLoading || deleteLoading ? (
                <h3 className="post__loading">Loading...</h3>
            ) : (
                ""
            )}
            {postError || deleteError ? (
                <h3 className="post__error">{postError || deleteError}</h3>
            ) : (
                ""
            )}
            {post ? (
                <div className="post__details">
                    <div className="post__details--author">
                        {post.user_name}
                    </div>
                    <div className="post__details--nickname">
                        @{post.user_email ? post.user_email.split("@")[0] : ""}
                    </div>
                    <div className="post__details--content">{post.content}</div>
                    {post.created_at ? (
                        <div className="post__details--createdAt">
                            Created at {getConvertedTime(post.created_at)}
                        </div>
                    ) : (
                        ""
                    )}
                    {post.updated_at ? (
                        <div className="post__details--updatedAt">
                            Last updated at {getConvertedTime(post.updated_at)}
                        </div>
                    ) : (
                        ""
                    )}
                    {userInfo && userInfo.email === post.user_email ? (
                        <div className="post__details--control">
                            <Link
                                className="post__details--control__update"
                                to={`/edit/post/${post.post_id}`}
                            >
                                Edit
                            </Link>
                            <div
                                className="post__details--control__delete"
                                onClick={handleDelete}
                            >
                                Delete
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default PostScreen;
