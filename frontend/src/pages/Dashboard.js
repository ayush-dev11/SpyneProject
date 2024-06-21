import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDiscussionsByTag, getDiscussionsByText, followUser, likeDiscussion, commentOnDiscussion, deleteDiscussion, updateDiscussion, deleteComment, updateComment, viewDiscussion, likeComment } from '../services/api';

const Dashboard = () => {
  const [discussions, setDiscussions] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await getDiscussionsByTag(''); // Fetch all discussions initially
        setDiscussions(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDiscussions();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await getDiscussionsByText(search);
      setDiscussions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  

  const handleLikeComment = async (discussionId, commentId) => {
    try {
      const token = localStorage.getItem('token');
      await likeComment(discussionId, commentId, token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLikeDiscussion = async (discussionId) => {
    try {
      const token = localStorage.getItem('token');
      await likeDiscussion(discussionId, token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDiscussion = async (discussionId) => {
    try {
      const token = localStorage.getItem('token');
      await deleteDiscussion(discussionId, token);
      setDiscussions(discussions.filter(discussion => discussion._id !== discussionId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFollowUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await followUser({ followId: userId }, token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">Search Discussions</button>
      </form>
      
      <Link to="/create-discussion">
        <button>Create Discussion</button>
      </Link>
      <ul>
        {discussions.map((discussion) => (
          <li key={discussion._id}>
            {discussion.text}
            <button onClick={() => handleLikeDiscussion(discussion._id)}>Like</button>
            <button onClick={() => handleDeleteDiscussion(discussion._id)}>Delete</button>
            <button onClick={() => viewDiscussion(discussion._id)}>View</button>
            <ul>
              {discussion.comments.map((comment) => (
                <li key={comment._id}>
                  {comment.text}
                  <button onClick={() => handleLikeComment(discussion._id, comment._id)}>Like</button>
                  <button onClick={() => deleteComment(discussion._id, comment._id)}>Delete</button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
