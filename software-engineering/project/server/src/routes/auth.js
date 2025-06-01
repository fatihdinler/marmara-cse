const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = express.Router();

// POST /api/auth/register
router.post('/register', register);
// POST /api/auth/login
router.post('/login', login);
// GET /api/auth/profile
router.get('/profile', auth, getProfile);

module.exports = router;