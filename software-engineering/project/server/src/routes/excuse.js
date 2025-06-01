const express = require('express');
const auth = require('../middleware/auth');
const { listExcuses, addExcuse } = require('../controllers/excuseController');
const router = express.Router();

// GET /api/excuses      - list user's excuses
router.get('/', auth, listExcuses);
// POST /api/excuses     - add a new excuse
router.post('/', auth, addExcuse);

module.exports = router;