const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  cost: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
