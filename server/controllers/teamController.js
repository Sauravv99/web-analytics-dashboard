const TeamMember = require('../models/Team');

const getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team members.' });
  }
};

module.exports = { getAllTeamMembers };
