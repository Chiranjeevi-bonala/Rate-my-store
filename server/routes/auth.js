const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validateUserRegister, validatePassword } = require('../utils/validator');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, address, password } = req.body;
    const err = validateUserRegister({ name, email, address, password });
    if (err) return res.status(400).json({ error: err });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, address, password_hash: hash, role: 'user' });
    res.json({ message: 'Registered', user: { id: user.id, email: user.email, role: user.role } });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
