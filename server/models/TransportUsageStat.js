const mongoose = require('mongoose');

const TransportUsageStatSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  mode: {
    type: String,
    required: true,
  },
  japan: {
    type: Number,
    required: true,
  },
  france: {
    type: Number,
    required: true,
  },
  us: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('transport_usage_stats', TransportUsageStatSchema);
