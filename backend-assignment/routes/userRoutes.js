const express = require('express');
const { registerUser, authUser, searchUsers, followUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/follow', protect, followUser);

module.exports = router;
