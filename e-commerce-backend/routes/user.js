const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  res.status(201).send('User registered');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
});

router.put('/:userId/username', auth, async (req, res) => {
  const { username } = req.body;

  try {
    if (req.user.id !== req.params.userId) {
      return res.status(403).send('Forbidden: You cannot update this username');
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    await User.findByIdAndUpdate(req.params.userId, { username });
    res.status(200).send('Username updated successfully');
  } catch (err) {
    res.status(500).send('Error updating username');
  }
});

router.put('/:userId/password', auth, async (req, res) => {
  const { password } = req.body;

  try {
    if (req.user.id !== req.params.userId) {
      return res.status(403).send('Forbidden: You cannot update this username');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });
    res.status(200).send('Password updated successfully');
  } catch (err) {
    res.status(500).send('Error updating password');
  }
});

module.exports = router;
