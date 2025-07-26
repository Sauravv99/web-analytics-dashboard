const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  phone: String,
  access: {
    type: String,
    enum: ['admin', 'manager', 'user'],
  },
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
