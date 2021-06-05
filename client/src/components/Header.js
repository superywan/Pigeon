import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";

const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <div className="header">
            <h1 className="header__title">
                <Link to="/">Twitter Clone</Link>
            </h1>
            {userInfo ? (
                <div className="header__logout" onClick={logoutHandler}>
                    Logout
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
