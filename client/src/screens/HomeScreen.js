import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../actions/postActions";

import Post from "../components/Post";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const postList = useSelector((state) => state.postList);
    const { loading, error, posts } = postList;

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    return (
        <div className="home">
            {loading ? (
                <h3 className="home__loading">Loading...</h3>
            ) : error ? (
                <h3 className="home__error">{error}</h3>
            ) : (
                <div className="home__products">
                    {posts.map((post) => (
                        <Post key={post.post_id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomeScreen;
