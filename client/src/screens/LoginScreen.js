import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";

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
            <h1 className="login__title">Sign In</h1>
            {loginLoading ? (
                <h3 className="login__loading">Loading...</h3>
            ) : loginError ? (
                <h3 className="login__error">{loginError}</h3>
            ) : (
                ""
            )}
            <div className="login__form">
                <form onSubmit={submitHandler}>
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
                    <div className="login__register">
                        <Link to="/register">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;
