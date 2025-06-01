const express = require('express');
const auth = require('../middleware/auth');
const { generateExcuse, getOptions, surpriseMe } = require('../controllers/generatorController');
const router = express.Router();

// GET /api/excuses      - list user's excuses
router.post('/generate', auth, generateExcuse);
router.post('/surprise', auth, surpriseMe);
router.get('/options', auth, getOptions);

module.exports = router;