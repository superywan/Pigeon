import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { createPost, getAllPosts } from "../actions/postActions";
import { POST_CREATE_RESET } from "../constants/postConstants";

import "../styles/components/createPost/createPost.css";

const CreatePost = withRouter(({ history }) => {
    const [content, setContent] = useState("");

    const dispatch = useDispatch();

    const postCreate = useSelector((state) => state.postCreate);
    const {
        loading: createLoading,
        error: createError,
        success: createSuccess,
    } = postCreate;

    // Need to fix issue not refreshing after submit
    useEffect(() => {
        if (createSuccess) {
            dispatch(getAllPosts());
            dispatch({ type: POST_CREATE_RESET });
            history.push("/");
        }
    }, [dispatch, history, createSuccess]);

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(createPost(content));
    };

    return (
        <div className="createPost">
            {createLoading ? (
                <div className="createPost__loading">loading...</div>
            ) : (
                ""
            )}
            {createError ? (
                <div className="createPost__error">{createError}</div>
            ) : (
                ""
            )}
            <form className="createPost__form" onSubmit={submitHandler}>
                <textarea
                    className="createPost__form--content"
                    name="content"
                    maxLength="255"
                    placeholder="Messenger pigeon is ready!"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className="createPost__form--bottom">
                    <div
                        className="createPost__form--bottom__length"
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
                        className="createPost__form--bottom__submit"
                        type="submit"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
});

export default CreatePost;
