import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostByEmail } from "../actions/postActions";
import Post from "../components/Post";

import "../styles/screens/profileScreen/profileScreen.css";

const ProfileScreen = ({ history }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const dispatch = useDispatch();

    const postListMy = useSelector((state) => state.postListMy);
    const { loading, error, posts } = postListMy;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            setFirstName(userInfo.firstName);
            setLastName(userInfo.lastName);
            dispatch(getPostByEmail(userInfo.email));
        }
    }, [dispatch, history, userInfo]);

    return (
        <div className="profile">
            {loading ? (
                <div className="profile__loading">Loading...</div>
            ) : error ? (
                <div className="profile__error">{error}</div>
            ) : (
                <Fragment>
                    <div className="profile__title">
                        {`${firstName} ${lastName}`}'s Recent Posts
                    </div>
                    <div className="profile__posts">
                        {posts.map((post) => (
                            <Post key={post.post_id} post={post} />
                        ))}
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default ProfileScreen;
