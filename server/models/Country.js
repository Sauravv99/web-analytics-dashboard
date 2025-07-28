const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Country', CountrySchema);
