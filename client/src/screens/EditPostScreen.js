import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostByPostId, updatePost } from "../actions/postActions";
import { POST_UPDATE_RESET } from "../constants/postConstants";

import "../styles/screens/editPostScreen/editPostScreen.css";

const EditPostScreen = ({ history, match }) => {
    const [content, setContent] = useState("");
    const [prevContent, setPrevContent] = useState("");

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
        if (!post || !post.content) {
            dispatch(getPostByPostId(match.params.id));
        } else {
            setContent(post.content);
            setPrevContent(post.content);
        }

        if (updateSuccess) {
            dispatch({ type: POST_UPDATE_RESET });
            history.push(`/post/${match.params.id}`);
        }
    }, [dispatch, post, updateSuccess, history, match]);

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
                <form className="update__form" onSubmit={submitHandler}>
                    <textarea
                        className="update__form--content"
                        name="content"
                        maxLength="254"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="update__form--bottom">
                        <div
                            className="update__form--bottom__length"
                            style={{
                                color:
                                    content.length < 200
                                        ? "inherit"
                                        : "rgb(219, 96, 96)",
                            }}
                        >
                            {content.length} / 255
                        </div>
                        <button
                            className="update__form--bottom__undo"
                            onClick={(e) => {
                                e.preventDefault();
                                setContent(prevContent);
                            }}
                        >
                            Undo
                        </button>
                        <button
                            className="update__form--bottom__submit"
                            type="submit"
                        >
                            Update
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditPostScreen;
