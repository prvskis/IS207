import { useState } from 'react';
import { posts } from '../data/posts';
import { users } from '../data/users';

export const usePostActions = () => {
  // Hàm helper để lấy thông tin user từ userId
  const getUserInfo = (userId) => {
    const user = users.find(u => u.id === userId);
    return {
      username: user?.name || "Người dùng",
      avatar: user?.avatar || "/default-avatar.png"
    };
  };

  // Đảm bảo mọi post đều có commentList khi khởi tạo
  const [allPosts, setAllPosts] = useState(posts.map(post => ({
    ...post,
    likes: post.likes || 0,
    comments: post.comments || 0,
    likedBy: post.likedBy || [],
    commentList: Array.isArray(post.commentList) 
      ? post.commentList.map(comment => ({
          ...comment,
          ...getUserInfo(comment.userId)
        }))
      : []
  })));

  const syncWithGlobalPosts = (updatedPosts) => {
    // Đảm bảo mọi post đều có thông tin user trong comments
    const postsWithUserInfo = updatedPosts.map(post => ({
      ...post,
      commentList: Array.isArray(post.commentList) 
        ? post.commentList.map(comment => ({
            ...comment,
            ...getUserInfo(comment.userId)
          }))
        : []
    }));

    // Cập nhật global posts
    posts.length = 0;
    posts.push(...postsWithUserInfo);
    // Cập nhật local posts
    setAllPosts(postsWithUserInfo);
  };

  const handleCreatePost = (postData) => {
    const newPost = {
      id: Math.max(...allPosts.map(p => p.id), 0) + 1,
      ...postData,
      likes: 0,
      comments: 0,
      likedBy: [],
      commentList: [],
      createdAt: new Date().getTime()
    };

    const updatedPosts = [newPost, ...allPosts];
    syncWithGlobalPosts(updatedPosts);
    return newPost;
  };

  const handleLike = (postId, isLiked) => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!savedUser) return;

    const updatedPosts = allPosts.map((post) => {
      if (post.id === postId) {
        const newLikes = isLiked ? post.likes - 1 : post.likes + 1;
        const newLikedBy = isLiked
          ? post.likedBy.filter((id) => id !== savedUser.id)
          : [...post.likedBy, savedUser.id];
        return { ...post, likes: newLikes, likedBy: newLikedBy };
      }
      return post;
    });
    syncWithGlobalPosts(updatedPosts);
  };

  const handleComment = async (postId, content, commentId = null) => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!savedUser) return;

      // Kiểm tra user có tồn tại trong users array không
      const user = users.find(u => u.id === savedUser.id);
      if (!user) return;

      if (commentId) {
        // Xóa hoặc sửa comment
        const updatedPosts = allPosts.map((post) => {
          if (post.id === postId) {
            if (content === "") {
              // Xóa comment
              return {
                ...post,
                commentList: post.commentList.filter((comment) => comment.id !== commentId),
                comments: post.comments - 1,
              };
            } else {
              // Sửa comment
              return {
                ...post,
                commentList: post.commentList.map((comment) => {
                  if (comment.id === commentId) {
                    return { ...comment, content };
                  }
                  return comment;
                }),
              };
            }
          }
          return post;
        });
        setAllPosts(updatedPosts);
        syncWithGlobalPosts(updatedPosts);
        return;
      }

      // Thêm comment mới
      const newComment = {
        id: Date.now(),
        content,
        userId: user.id,
        username: user.name,
        avatar: user.avatar,
        createdAt: Date.now(),
      };

      const updatedPosts = allPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            commentList: [...(post.commentList || []), newComment],
            comments: (post.comments || 0) + 1,
          };
        }
        return post;
      });

      setAllPosts(updatedPosts);
      syncWithGlobalPosts(updatedPosts);
    } catch (error) {
      console.error("Error handling comment:", error);
    }
  };

  const handleDelete = (postId) => {
    const updatedPosts = allPosts.filter((post) => post.id !== postId);
    syncWithGlobalPosts(updatedPosts);
  };

  return {
    allPosts,
    handleLike,
    handleComment,
    handleDelete,
    handleCreatePost
  };
}; 