import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/post/post.css";

const Post = ({ post }) => {
    const getConvertedTime = (time) => {
        let date = new Date(0);
        date.setUTCSeconds(time);
        const stringDate = date.toString().split(" ").slice(0, 5).join(" ");
        return stringDate;
    };

    return (
        <Link className="postList" to={`/post/${post.post_id}`}>
            {post.content.length > 50 ? (
                <div className="postList__content">
                    {post.content.slice(0, 70)}...
                </div>
            ) : (
                <div className="postList__content">{post.content}</div>
            )}
            <div className="postList__writter">{post.user_name}</div>
            <div className="postList__date">
                {getConvertedTime(post.updated_at)}
            </div>
        </Link>
    );
};

export default Post;
