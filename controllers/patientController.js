const Patient = require('../models/Patient');

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ createdBy: req.user._id });
    res.json({ patients });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPatient = async (req, res) => {
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
};

exports.createPatient = async (req, res) => {
  try {
    const patient = new Patient({
      ...req.body,
      createdBy: req.user._id
    });

    await patient.save();
    res.status(201).json({ message: 'Patient created successfully', patient });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPatient = await Patient.findOneAndUpdate(
      { _id: id, createdBy: req.user._id },
      req.body
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json({ message: 'Updated successfully', patient: updatedPatient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deletePatient = async (req, res) => {
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
};
