const Excuse = require('../models/Excuse');
const Vote = require('../models/Vote');

// Vote for an excuse
exports.voteExcuse = async (req, res) => {
  try {
    const { excuseId } = req.params;
    const { voteType } = req.body; // 'upvote' or 'downvote'
    
    // Check if user already voted for this excuse
    const existingVote = await Vote.findOne({ 
      user: req.user.id, 
      excuse: excuseId 
    });
    
    if (existingVote) {
      // Update existing vote
      existingVote.voteType = voteType;
      await existingVote.save();
    } else {
      // Create new vote
      const vote = new Vote({
        user: req.user.id,
        excuse: excuseId,
        voteType
      });
      await vote.save();
    }
    
    // Calculate total votes for the excuse
    const upvotes = await Vote.countDocuments({ excuse: excuseId, voteType: 'upvote' });
    const downvotes = await Vote.countDocuments({ excuse: excuseId, voteType: 'downvote' });
    
    // Update excuse vote counts
    await Excuse.findByIdAndUpdate(excuseId, {
      upvotes,
      downvotes,
      score: upvotes - downvotes
    });
    
    res.json({ upvotes, downvotes, score: upvotes - downvotes });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get Hall of Fame excuses
exports.getHallOfFame = async (req, res) => {
  try {
    const excuses = await Excuse.find({ isPublic: true })
      .populate('user', 'name')
      .sort('-score -upvotes')
      .limit(50);
    
    res.json(excuses);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get user's vote for a specific excuse
exports.getUserVote = async (req, res) => {
  try {
    const { excuseId } = req.params;
    const vote = await Vote.findOne({ 
      user: req.user.id, 
      excuse: excuseId 
    });
    
    res.json({ voteType: vote ? vote.voteType : null });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};