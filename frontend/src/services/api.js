import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const register = (userData) => axios.post(`${API_URL}/users/register`, userData);

const login = (userData) => axios.post(`${API_URL}/users/login`, userData);

const createDiscussion = (discussionData, token) => axios.post(`${API_URL}/discussions/create`, discussionData, {
  headers: { Authorization: `Bearer ${token}` }
});

const getDiscussionsByTag = (tag) => axios.get(`${API_URL}/discussions/tag/${tag}`);

const getDiscussionsByText = (text) => axios.get(`${API_URL}/discussions/search/${text}`);

const followUser = (followData, token) => axios.post(`${API_URL}/users/follow`, followData, {
  headers: { Authorization: `Bearer ${token}` }
});

const likeDiscussion = (discussionId, token) => axios.post(`${API_URL}/discussions/${discussionId}/like`, {}, {
  headers: { Authorization: `Bearer ${token}` }
});

const commentOnDiscussion = (discussionId, commentData, token) => axios.post(`${API_URL}/discussions/${discussionId}/comment`, commentData, {
  headers: { Authorization: `Bearer ${token}` }
});

const deleteDiscussion = (discussionId, token) => axios.delete(`${API_URL}/discussions/${discussionId}`, {
  headers: { Authorization: `Bearer ${token}` }
});

const updateDiscussion = (discussionId, discussionData, token) => axios.put(`${API_URL}/discussions/${discussionId}`, discussionData, {
  headers: { Authorization: `Bearer ${token}` }
});

const deleteComment = (discussionId, commentId, token) => axios.delete(`${API_URL}/discussions/${discussionId}/comments/${commentId}`, {
  headers: { Authorization: `Bearer ${token}` }
});

const updateComment = (discussionId, commentId, commentData, token) => axios.put(`${API_URL}/discussions/${discussionId}/comments/${commentId}`, commentData, {
  headers: { Authorization: `Bearer ${token}` }
});

const viewDiscussion = (discussionId) => axios.get(`${API_URL}/discussions/${discussionId}/view`);



const likeComment = (discussionId, commentId, token) => axios.post(`${API_URL}/discussions/${discussionId}/comments/${commentId}/like`, {}, {
  headers: { Authorization: `Bearer ${token}` }
});

export { register, login, createDiscussion, getDiscussionsByTag, getDiscussionsByText, followUser, likeDiscussion, commentOnDiscussion, deleteDiscussion, updateDiscussion, deleteComment, updateComment, viewDiscussion, likeComment };
