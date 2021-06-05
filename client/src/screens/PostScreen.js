import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostByPostId } from "../actions/postActions";

const PostScreen = ({ match }) => {
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

    return (
        <div className="post">
            <h1 className="post__title">Post Detail</h1>
            {postLoading ? (
                <h3 className="post__loading">Loading...</h3>
            ) : postError ? (
                <h3 className="post__error">{postError}</h3>
            ) : (
                <div className="post__details">
                    <div className="post__details--title">{post.title}</div>
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
                        <div className="post__details--edit">
                            Edit and Delete
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            )}
        </div>
    );
};

export default PostScreen;
