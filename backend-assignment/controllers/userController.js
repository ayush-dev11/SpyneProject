const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
  const { name, mobile, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ name, mobile, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

exports.authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};


exports.followUser = async (req, res) => {
  const { followId } = req.body;
  const user = await User.findById(req.user._id);

  if (!user.following.includes(followId)) {
    user.following.push(followId);
    await user.save();

    const followedUser = await User.findById(followId);
    followedUser.followers.push(req.user._id);
    await followedUser.save();

    res.status(200).json({ message: 'User followed' });
  } else {
    res.status(400).json({ message: 'User already followed' });
  }
};
