const Excuse = require('../models/Excuse');

// list
exports.listExcuses = async (req, res) => {
  const excuses = await Excuse.find({ user: req.user.id }).sort('-createdAt');
  res.json(excuses);
};

// add
exports.addExcuse = async (req, res) => {
  const { text } = req.body;
  // placeholder: AI logic later
  const excuse = new Excuse({ text, user: req.user.id });
  await excuse.save();
  res.json(excuse);
};