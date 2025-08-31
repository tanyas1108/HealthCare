const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  specialization: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  hospital: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);