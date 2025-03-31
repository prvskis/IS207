import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { usePostActions } from "../hooks/usePostActions";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import "./Home.css";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { allPosts, handleLike, handleComment, handleDelete, handleCreatePost } = usePostActions();

  return (
    <div className="container">
      <h2>Trang chủ</h2>
      <CreatePost onCreatePost={handleCreatePost} />
      <div className="posts">
        {allPosts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
