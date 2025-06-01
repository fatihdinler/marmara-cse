const express = require('express');
const auth = require('../middleware/auth');
const { getHallOfFame, getUserVote, voteExcuse } = require('../controllers/voteController');

const router = express.Router();

// 1) Oy verme: POST /api/votes/:excuseId
//    İstek gövdesinde { voteType: 'upvote' } veya { voteType: 'downvote' } beklenir.
router.post('/:excuseId', auth, voteExcuse);

// 2) Kullanıcının belirli bir mazerete daha önce oy verip vermediğini GET ile kontrol etme:
//    GET /api/votes/:excuseId/user  → { voteType: 'upvote' } veya { voteType: 'downvote' } ya da { voteType: null }
router.get('/:excuseId/user', auth, getUserVote);

// 3) Hall of Fame mazeretlerini listeleme (public, en yüksek skordan başlayarak):
//    GET /api/votes/hall-of-fame
router.get('/hall-of-fame', auth, getHallOfFame);

module.exports = router;
