const mongoose = require('mongoose');

const rechargeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  operator: {
    type: String,
    required: [true, 'Operator is required'],
    enum: ['Airtel', 'Jio', 'Vi', 'BSNL']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [10, 'Minimum recharge amount is ₹10']
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Recharge', rechargeSchema);