import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
    return (
        <div className="postList">
            <div className="postList__content">
                <Link to={`/post/${post.post_id}`}>
                    <h3 className="postList__content--title">{post.title}</h3>
                </Link>
                {post.content.length > 50 ? (
                    <p className="postList__content--content">
                        {post.content.slice(0, 49)}...
                    </p>
                ) : (
                    <p className="postList__content--content">{post.content}</p>
                )}
            </div>
        </div>
    );
};

export default Post;
