import React, { useState, useEffect } from "react";
import "./App.css";

const limits = {
  Twitter: 280,
  Instagram: 2200,
  LinkedIn: 3000,
};

function PostComposer() {
  const [text, setText] = useState("");
  const [platform, setPlatform] = useState("Twitter");
  const [posts, setPosts] = useState([]);

  // Load saved posts when the app starts
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);

  const limit = limits[platform];
  const isExceeded = text.length > limit;

  const handlePost = () => {
    if (text.trim() === "") {
      alert("Please write something!");
      return;
    }

    if (isExceeded) {
      alert(`Character limit exceeded for ${platform}!`);
      return;
    }

    const newPost = {
      text: text,
      platform: platform,
      date: new Date().toLocaleString(),
    };

    const updatedPosts = [newPost, ...posts];

    // Update React state
    setPosts(updatedPosts);

    // Save posts in browser local storage
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    alert(`Post saved successfully for ${platform}!`);

    // Clear textarea
    setText("");
  };

  const deletePost = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);

    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="container">
      <h1>Dynamic Post Composer</h1>

      <label>Select Platform:</label>

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option value="Twitter">Twitter</option>
        <option value="Instagram">Instagram</option>
        <option value="LinkedIn">LinkedIn</option>
      </select>

      <textarea
        placeholder="Write your post here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <p className={isExceeded ? "error" : "counter"}>
        Characters: {text.length} / {limit}
      </p>

      {isExceeded && (
        <p className="error">
          Character limit exceeded!
        </p>
      )}

      <button
        onClick={handlePost}
        disabled={isExceeded}
      >
        Save Post
      </button>

      <h2>Saved Posts</h2>

      {posts.length === 0 && <p>No saved posts yet.</p>}

      {posts.map((post, index) => (
        <div key={index} className="post-card">
          <h3>{post.platform}</h3>
          <p>{post.text}</p>
          <small>{post.date}</small>

          <button onClick={() => deletePost(index)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default PostComposer;