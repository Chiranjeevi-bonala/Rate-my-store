const express = require('express');
const { Store, Rating, User } = require('../models');
const router = express.Router();

// Get all stores (with avg rating, and user's rating if logged in)
router.get('/', async (req, res) => {
  const stores = await Store.findAll({
    include: [
      {
        model: Rating,
        as: 'ratings',
        attributes: ['rating', 'user_id'],
      },
      { model: User, as: 'owner', attributes: ['name', 'email'] },
    ],
  });
  // Map to add average rating & user's rating
  const storesWithRatings = stores.map((s) => {
    const ratings = s.ratings.map((r) => r.rating);
    const avg = ratings.length ? ratings.reduce((a, b) => a + b) / ratings.length : null;
    return {
      id: s.id,
      name: s.name,
      address: s.address,
      owner: s.owner,
      avgRating: avg,
    };
  });
  res.json(storesWithRatings);
});

module.exports = router;
