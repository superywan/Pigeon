import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPostByPostId, deletePost } from "../actions/postActions";

const PostScreen = ({ history, match }) => {
    const dispatch = useDispatch();

    const postDetails = useSelector((state) => state.postDetails);
    const { loading: postLoading, error: postError, post } = postDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch(getPostByPostId(match.params.id));
    }, [dispatch, match]);

    const getConvertedTime = (time) => {
        let date = new Date(0);
        date.setUTCSeconds(time);
        return date.toString();
    };

    const handleDelete = () => {
        dispatch(deletePost(post.post_id));
        history.push("/");
    };

    return (
        <div className="post">
            {postLoading ? (
                <h3 className="post__loading">Loading...</h3>
            ) : postError ? (
                <h3 className="post__error">{postError}</h3>
            ) : (
                <div className="post__details">
                    <div className="post__details--author">
                        {post.user_name}
                    </div>
                    <div className="post__details--content">{post.content}</div>
                    {post.created_at ? (
                        <div className="post__details--createdAt">
                            {getConvertedTime(post.created_at)}
                        </div>
                    ) : (
                        ""
                    )}
                    {post.updated_at ? (
                        <div className="post__details--updatedAt">
                            {getConvertedTime(post.updated_at)}
                        </div>
                    ) : (
                        ""
                    )}
                    {userInfo && userInfo.email === post.user_email ? (
                        <Fragment>
                            <div className="post__details--update">
                                <Link to={`/edit/post/${post.post_id}`}>
                                    Edit
                                </Link>
                            </div>
                            <div
                                className="post__details--delete"
                                onClick={handleDelete}
                            >
                                Delete
                            </div>
                        </Fragment>
                    ) : (
                        ""
                    )}
                </div>
            )}
        </div>
    );
};

export default PostScreen;
