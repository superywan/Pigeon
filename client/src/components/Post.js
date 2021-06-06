import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../styles/components/post/post.css";

const Post = ({ post }) => {
    return (
        <div className="postList">
            {post.content.length > 50 ? (
                <div className="postList__content">
                    <Link to={`/post/${post.post_id}`}>
                        "{post.content.slice(0, 49)}..."
                    </Link>
                </div>
            ) : (
                <div className="postList__content">
                    <Link to={`/post/${post.post_id}`}>"{post.content}"</Link>
                </div>
            )}
            <div className="postList__writter">{post.user_name}</div>
            <div className="postList__date">
                {new Date(post.updated_at).toString()}
            </div>
        </div>
    );
};

export default Post;
