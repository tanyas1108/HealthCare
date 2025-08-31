const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Doctor = require('../models/Doctor');

const router = express.Router();

// Validation rules
const doctorValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('specialization').notEmpty().withMessage('Specialization is required'),
  body('experience').isInt({ min: 0 }).withMessage('Experience must be a positive number'),
  body('hospital').notEmpty().withMessage('Hospital is required')
];

// Add new doctor
router.post('/', auth, doctorValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json({ message: 'Doctor created successfully', doctor });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all doctors
router.get('/', auth, async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json({ doctors });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get specific doctor
router.get('/:id', auth, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ doctor });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update doctor
router.put('/:id', auth, doctorValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ message: 'Doctor updated successfully', doctor });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete doctor
router.delete('/:id', auth, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;