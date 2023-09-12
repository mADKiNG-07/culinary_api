const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const { username, email, user_password } = req.body;

  // checks if user exists
  const user = await User.findOne({ where: { email: email } });
  if (user) return res.status(404).send('User already exists');

  bcrypt.hash(user_password, 10, async (err, hash) => {
    if (err) return console.error(err);

    const user = await User.create({
      username: username,
      email: email,
      user_password: hash
    });

    res.status(201).json({
      message: "User created successfully...",
      user: user,
    });
  });

});

router.post('/login', async (req, res) => {
  const { email, user_password } = req.body;

  // checks if user exists
  let user = await User.findOne({ where: { email: email } });
  if (!user) return res.status(400).send('Invalid username!');

  // compares and verifies user password
  bcrypt.compare(user_password, user.user_password, (err, result) => {
    if (err) return console.error(err);

    if (!result) {
      return res.status(401).json({ message: 'Authentication failed. Invalid password.' });
    }
    console.log(process.env.JWT_SECRET);
    // create token
    const token = jwt.sign({ email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).cookie('jwt', token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      secure: false,
      httpOnly: true
    });

    res.json({
      message: 'Authentication successful.',
    });
  });
});

module.exports = router