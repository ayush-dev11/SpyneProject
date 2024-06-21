const Discussion = require('../models/Discussion');

exports.createDiscussion = async (req, res) => {
  const { text, hashtags } = req.body;
  const discussion = await Discussion.create({
    text,
    hashtags: hashtags.split(','),
    user: req.user._id,
    image: req.file ? req.file.path : null,
  });

  if (discussion) {
    res.status(201).json(discussion);
  } else {
    res.status(400).json({ message: 'Invalid data' });
  }
};

exports.getDiscussionsByTag = async (req, res) => {
  const { tag } = req.params;
  let discussions;

  if (tag) {
    discussions = await Discussion.find({ hashtags: tag });
  } else {
    discussions = await Discussion.find();
  }

  res.status(200).json(discussions);
};

exports.getDiscussionsByText = async (req, res) => {
  const { text } = req.params;
  const discussions = await Discussion.find({ text: { $regex: text, $options: 'i' } });
  res.status(200).json(discussions);
};

exports.likeDiscussion = async (req, res) => {
  const { discussionId } = req.params;
  const discussion = await Discussion.findById(discussionId);

  if (!discussion.likes.includes(req.user._id)) {
    discussion.likes.push(req.user._id);
    await discussion.save();
    res.status(200).json({ message: 'Discussion liked' });
  } else {
    res.status(400).json({ message: 'Discussion already liked' });
  }
};

exports.commentOnDiscussion = async (req, res) => {
  const { discussionId } = req.params;
  const { text } = req.body;

  const discussion = await Discussion.findById(discussionId);

  const comment = {
    text,
    user: req.user._id,
    likes: [],
  };

  discussion.comments.push(comment);
  await discussion.save();

  res.status(201).json(discussion);
};

exports.deleteDiscussion = async (req, res) => {
  const { discussionId } = req.params;
  const discussion = await Discussion.findById(discussionId);

  if (discussion.user.toString() === req.user._id.toString()) {
    await Discussion.deleteOne({ _id: discussionId });
    res.status(200).json({ message: 'Discussion deleted' });
  } else {
    res.status(401).json({ message: 'Not authorized to delete this discussion' });
  }
};

exports.updateDiscussion = async (req, res) => {
  const { discussionId } = req.params;
  const { text, hashtags } = req.body;

  const discussion = await Discussion.findById(discussionId);

  if (discussion.user.toString() === req.user._id.toString()) {
    discussion.text = text || discussion.text;
    discussion.hashtags = hashtags ? hashtags.split(',') : discussion.hashtags;
    await discussion.save();
    res.status(200).json(discussion);
  } else {
    res.status(401).json({ message: 'Not authorized to update this discussion' });
  }
};

exports.deleteComment = async (req, res) => {
  const { discussionId, commentId } = req.params;
  const discussion = await Discussion.findById(discussionId);

  const comment = discussion.comments.id(commentId);

  if (comment.user.toString() === req.user._id.toString()) {
    comment.remove();
    await discussion.save();
    res.status(200).json({ message: 'Comment deleted' });
  } else {
    res.status(401).json({ message: 'Not authorized to delete this comment' });
  }
};

exports.updateComment = async (req, res) => {
  const { discussionId, commentId } = req.params;
  const { text } = req.body;

  const discussion = await Discussion.findById(discussionId);

  const comment = discussion.comments.id(commentId);

  if (comment.user.toString() === req.user._id.toString()) {
    comment.text = text || comment.text;
    await discussion.save();
    res.status(200).json(discussion);
  } else {
    res.status(401).json({ message: 'Not authorized to update this comment' });
  }
};

exports.viewDiscussion = async (req, res) => {
  const { discussionId } = req.params;
  const discussion = await Discussion.findById(discussionId);
  discussion.viewCount += 1;
  await discussion.save();
  res.status(200).json(discussion);
};
