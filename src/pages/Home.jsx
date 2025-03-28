import { useState, useContext } from "react";
import { posts as initialPosts } from "../data/posts";
import { AuthContext } from "../context/AuthContext";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [forceUpdate, setForceUpdate] = useState(0);
  const { user } = useContext(AuthContext);

  const handleLike = (id, isLiked) => {
    if (!user) return; // Nếu chưa đăng nhập thì không cho like
    
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              likes: isLiked ? post.likes - 1 : post.likes + 1,
              likedBy: isLiked
                ? post.likedBy.filter((userId) => userId !== user.id)
                : [...post.likedBy, user.id],
            }
          : post
      )
    );
  };

  const handleComment = (id, commentData) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              comments: post.comments + 1,
              commentList: [...(post.commentList || []), commentData],
            }
          : post
      )
    );
  };

  const handlePostCreated = () => {
    setForceUpdate(forceUpdate + 1);
  };

  return (
    <div className="container">
      <h2>Trang chủ</h2>
      <CreatePost onPostCreated={handlePostCreated} />
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onLike={handleLike}
          onComment={handleComment}
        />
      ))}
    </div>
  );
};

export default Home;
