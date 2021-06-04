import axios from "axios";
import {
    POST_CREATE_FAIL,
    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
    POST_DELETE_FAIL,
    POST_DELETE_REQUEST,
    POST_DELETE_SUCCESS,
    POST_DETAILS_FAIL,
    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    POST_LIST_FAIL,
    POST_LIST_MY_FAIL,
    POST_LIST_MY_REQUEST,
    POST_LIST_MY_SUCCESS,
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_UPDATE_FAIL,
    POST_UPDATE_REQUEST,
    POST_UPDATE_SUCCESS,
} from "../constants/postConstants";

export const createPost = (title, content) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_CREATE_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios.post("/api/posts", { title, content }, config);
        dispatch({ type: POST_CREATE_SUCCESS });
    } catch (error) {
        dispatch({
            type: POST_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updatePost =
    (postId, title, content) => async (dispatch, getState) => {
        try {
            dispatch({ type: POST_UPDATE_REQUEST });
            const {
                userLogin: { userInfo },
            } = getState();
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            await axios.put(`/api/posts/${postId}`, { title, content }, config);
            dispatch({ type: POST_UPDATE_SUCCESS });
        } catch (error) {
            dispatch({
                type: POST_UPDATE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const deletePost = (postId) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_DELETE_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios.delete(`/api/posts/${postId}`, config);
        dispatch({ type: POST_DELETE_SUCCESS });
    } catch (error) {
        dispatch({
            type: POST_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getAllPosts = () => async (dispatch) => {
    try {
        dispatch({ type: POST_LIST_REQUEST });
        const { data } = await axios.get("/api/posts");
        dispatch({ type: POST_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getPostByPostId = (postId) => async (dispatch) => {
    try {
        dispatch({ type: POST_DETAILS_REQUEST });
        const config = {
            "Content-Type": "application/json",
        };
        const { data } = await axios.get(`/api/posts/${postId}`, config);
        dispatch({ type: POST_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getPostByEmail = () => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_LIST_MY_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            "Content-Type": "application/json",
        };
        const { data } = await axios.get(
            `/api/posts/user/${userInfo.email}`,
            config
        );
        dispatch({ type: POST_LIST_MY_SUCCESS, payload: POST_LIST_MY_FAIL });
    } catch (error) {
        dispatch({
            type: POST_LIST_MY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
