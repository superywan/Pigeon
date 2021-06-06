import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../actions/postActions";

import CreatePost from "../components/CreatePost";

import Post from "../components/Post";

const HomeScreen = () => {
    const dispatch = useDispatch();

    const postList = useSelector((state) => state.postList);
    const { loading, error, posts } = postList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    return (
        <div className="home">
            {userInfo ? <CreatePost /> : ""}
            {loading ? (
                <div className="home__loading">Loading...</div>
            ) : error ? (
                <div className="home__error">{error}</div>
            ) : (
                <div className="home__posts">
                    {posts.map((post) => (
                        <Post key={post.post_id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomeScreen;
