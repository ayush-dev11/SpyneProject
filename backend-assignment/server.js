const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const discussionRoutes = require('./routes/discussionRoutes');

dotenv.config();

connectDB();

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
