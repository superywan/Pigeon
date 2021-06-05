import axios from "axios";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGOUT,
} from "../constants/userConstants";
import { POST_LIST_MY_RESET } from "../constants/postConstants";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.post(
            "/api/auth/login",
            { email, password },
            config
        );
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: POST_LIST_MY_RESET });
};

export const register =
    (firstName, lastName, email, password) => async (dispatch) => {
        try {
            dispatch({ type: USER_REGISTER_REQUEST });
            const config = {
                headers: { "Content-Type": "application/json" },
            };
            const { data } = await axios.post(
                "/api/auth/register",
                { firstName, lastName, email, password },
                config
            );
            dispatch({ type: USER_REGISTER_SUCCESS });
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
