import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPostByPostId, updatePost } from "../actions/postActions";

const EditPostScreen = ({ history, match }) => {
    const [content, setContent] = useState("");

    const dispatch = useDispatch();

    const postDetails = useSelector((state) => state.postDetails);
    const { loading: postLoading, error: postError, post } = postDetails;

    const postUpdate = useSelector((state) => state.postUpdate);
    const {
        loading: updateLoading,
        error: updateError,
        success: updateSuccess,
    } = postUpdate;

    useEffect(() => {
        if (updateSuccess || postError) {
            history.push(`/post/${match.params.id}`);
        } else {
            if (!post.post_id || post.post_id !== match.params.id) {
                dispatch(getPostByPostId(match.parasm.id));
            } else {
                setContent(post.content);
            }
        }
    }, [dispatch, updateSuccess, postError, post, history, match]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updatePost(match.params.id, content));
    };

    return (
        <div className="update">
            <div className="update__title">Edit Post</div>
            {updateLoading || postLoading ? (
                <div className="update__loading">Loading...</div>
            ) : updateError || postError ? (
                <div className="update__error">{updateError || postError}</div>
            ) : (
                <form className="userUpdate__form" onSubmit={submitHandler}>
                    <label className="userUpdate__form--label" htmlFor="email">
                        Content
                    </label>
                    <textarea
                        className="userUpdate__form--content"
                        name="content"
                        maxLength="254"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button className="update__form--submit" type="submit">
                        Update
                    </button>
                </form>
            )}
        </div>
    );
};

export default EditPostScreen;
