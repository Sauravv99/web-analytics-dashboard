const express = require('express');
const router = express.Router();

const { getAllTeamMembers } = require('../controllers/teamController');

router.get('/', getAllTeamMembers);

module.exports = router;
