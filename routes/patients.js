const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Patient = require('../models/Patient');

const router = express.Router();

// Validation rules
const patientValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('age').isInt({ min: 0, max: 150 }).withMessage('Age must be between 0 and 150'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
  body('address').notEmpty().withMessage('Address is required')
];

// Add new patient
router.post('/', auth, patientValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const patient = new Patient({
      ...req.body,
      createdBy: req.user._id
    });

    await patient.save();
    res.status(201).json({ message: 'Patient created successfully', patient });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all patients created by authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const patients = await Patient.find({ createdBy: req.user._id });
    res.json({ patients });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get specific patient
router.get('/:id', auth, async (req, res) => {
  try {
    const patient = await Patient.findOne({ 
      _id: req.params.id, 
      createdBy: req.user._id 
    });
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json({ patient });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update patient
router.put('/:id', auth, patientValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const patient = await Patient.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json({ message: 'Patient updated successfully', patient });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete patient
router.delete('/:id', auth, async (req, res) => {
  try {
    const patient = await Patient.findOneAndDelete({ 
      _id: req.params.id, 
      createdBy: req.user._id 
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;