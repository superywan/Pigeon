import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";

import twitterLogo from "../images/twitter-logo.svg";
import "../styles/components/header/header.css";

const Header = ({ history }) => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <div className="header">
            <Link to="/">
                <img
                    className="header__logo"
                    src={twitterLogo}
                    alt="company logo"
                />
            </Link>
            {userInfo ? (
                <div className="header__menu">
                    <div
                        className="header__menu--logout"
                        onClick={logoutHandler}
                    >
                        Logout
                    </div>
                    <div className="header__menu--profile">
                        <Link to="/profile">Profile</Link>
                    </div>
                </div>
            ) : (
                <div className="header__login">
                    <Link to="/login">Login</Link>
                </div>
            )}
        </div>
    );
};

export default Header;
