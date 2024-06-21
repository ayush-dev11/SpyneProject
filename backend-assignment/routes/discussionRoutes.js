const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createDiscussion, getDiscussionsByTag, getDiscussionsByText, likeDiscussion, commentOnDiscussion, deleteDiscussion, updateDiscussion, deleteComment, updateComment, viewDiscussion } = require('../controllers/discussionController');
const router = express.Router();


router.post('/create', protect, createDiscussion);
router.get('/tag/:tag?', getDiscussionsByTag);
router.get('/search/:text', getDiscussionsByText);
router.post('/:discussionId/like', protect, likeDiscussion);
router.post('/:discussionId/comment', protect, commentOnDiscussion);
router.delete('/:discussionId', protect, deleteDiscussion);
router.put('/:discussionId', protect, updateDiscussion);
router.delete('/:discussionId/comments/:commentId', protect, deleteComment);
router.put('/:discussionId/comments/:commentId', protect, updateComment);
router.get('/:discussionId/view', viewDiscussion);

module.exports = router;