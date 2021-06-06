import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";

const RegisterScreen = ({ history }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const { loading: registerLoading, error: registerError } = userRegister;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) history.push("/");
    }, [history, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) setError("Password should match");
        else dispatch(register(firstName, lastName, email, password));
    };

    return (
        <div className="register">
            <div className="register__title">Register</div>
            {registerError && (
                <div className="register__error">{registerError}</div>
            )}
            {registerLoading && (
                <div className="register__loading">Loading...</div>
            )}
            <form className="register__form" onSubmit={submitHandler}>
                <label className="register__form--label" htmlFor="name">
                    First Name
                </label>
                <input
                    className="register__form--input"
                    type="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label className="register__form--label" htmlFor="name">
                    Last Name
                </label>
                <input
                    className="register__form--input"
                    type="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label className="register__form--label" htmlFor="email">
                    Email
                </label>
                <input
                    className="register__form--input"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="register__form--label" htmlFor="password">
                    Password
                </label>
                <input
                    className="register__form--input"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label
                    className="register__form--label"
                    htmlFor="confirmPassword"
                >
                    Re-enter password
                </label>
                <input
                    className="register__form--input"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <div className="register__error">{error}</div>}
                <button className="register__form--submit" type="submit">
                    Register
                </button>
            </form>
            <div className="register__login">
                <Link to="/loign">Login</Link>
            </div>
        </div>
    );
};

export default RegisterScreen;
