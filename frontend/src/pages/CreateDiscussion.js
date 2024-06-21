import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDiscussion } from '../services/api';

const CreateDiscussion = () => {
  const [text, setText] = useState('');
  const [hashtags, setHashtags] = useState('');
  const navigate = useNavigate();

  const handleCreateDiscussion = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await createDiscussion({ text, hashtags }, token);
      console.log(response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateDiscussion}>
        <textarea placeholder="Text" value={text} onChange={(e) => setText(e.target.value)}></textarea>
        <input type="text" placeholder="Hashtags" value={hashtags} onChange={(e) => setHashtags(e.target.value)} />
        <button type="submit">Create Discussion</button>
      </form>
    </div>
  );
};

export default CreateDiscussion;
