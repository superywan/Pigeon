import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";

import "../styles/screens/loginScreen/loginScreen.css";

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { loading: loginLoading, error: loginError, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) history.push("/");
    }, [history, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <div className="login">
            <div className="login__title">Log in to Pigeon</div>
            {loginLoading ? (
                <div className="login__loading">Loading...</div>
            ) : loginError ? (
                <div className="login__error">{loginError}</div>
            ) : (
                ""
            )}
            <form className="login__form" onSubmit={submitHandler}>
                <label className="login__form--label" htmlFor="email">
                    Email
                </label>
                <input
                    className="login__form--input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="login__form--label" htmlFor="password">
                    Password
                </label>
                <input
                    className="login__form--input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login__form--submit" type="submit">
                    Sign In
                </button>
                <Link className="login__register" to="/register">
                    Sign up for Pigeon
                </Link>
            </form>
        </div>
    );
};

export default LoginScreen;
