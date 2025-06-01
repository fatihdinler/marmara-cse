const mongoose = require('mongoose');

const ExcuseSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scenario: {
    type: String,
    enum: ['work', 'school', 'social'],
    required: true
  },
  type: {
    type: String,
    enum: ['believable', 'funny', 'dramatic', 'sarcastic', 'urgent'],
    required: true
  },
  isPublic: { type: Boolean, default: false },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  score: { type: Number, default: 0 }, // upvotes - downvotes
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Index for Hall of Fame queries
ExcuseSchema.index({ isPublic: 1, score: -1, upvotes: -1 });

// Prevent OverwriteModelError: use existing model if compiled
module.exports = mongoose.models.Excuse || mongoose.model('Excuse', ExcuseSchema);