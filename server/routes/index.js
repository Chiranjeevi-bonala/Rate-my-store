const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const storeRoutes = require('./store');
// Placeholder for admin/user/owner routes

router.use('/auth', authRoutes);
router.use('/stores', storeRoutes);

module.exports = router;
