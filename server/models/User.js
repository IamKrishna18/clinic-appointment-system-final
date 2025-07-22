const mongoose = require('mongoose');
const User = require('../models/User');
// Define the schema for a user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true // Remember to hash passwords in production!
  },
  phone: { type: String },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'admin'],
    default: 'patient'
  }
});

// Export the model
module.exports = mongoose.model('User', userSchema);
