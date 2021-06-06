import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";

import pigeonLogo from "../images/pigeon-logo.png";
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
                    src={pigeonLogo}
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
                    <Link className="header__menu--profile" to="/profile">
                        Profile
                    </Link>
                </div>
            ) : (
                <Link className="header__login" to="/login">
                    Login
                </Link>
            )}
        </div>
    );
};

export default Header;
