const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  excuse: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Excuse', 
    required: true 
  },
  voteType: { 
    type: String, 
    enum: ['upvote', 'downvote'], 
    required: true 
  }
}, { 
  timestamps: true 
});

// Ensure one vote per user per excuse
VoteSchema.index({ user: 1, excuse: 1 }, { unique: true });

module.exports = mongoose.models.Vote || mongoose.model('Vote', VoteSchema);