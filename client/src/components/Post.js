import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/post/post.css";

const Post = ({ post }) => {
    return (
        <Link className="postList" to={`/post/${post.post_id}`}>
            {post.content.length > 50 ? (
                <div className="postList__content">
                    "{post.content.slice(0, 49)}..."
                </div>
            ) : (
                <div className="postList__content">"{post.content}"</div>
            )}
            <div className="postList__writter">{post.user_name}</div>
            <div className="postList__date">
                {new Date(post.updated_at).toString()}
            </div>
        </Link>
    );
};

export default Post;
