const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  txId: { type: String, required: true },
  user: { type: String, required: true },
  date: { type: String, required: true },
  cost: { type: String, required: true }
});

module.exports = mongoose.model('Transaction', transactionSchema);
