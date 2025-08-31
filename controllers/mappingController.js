const Mapping = require('../models/Mapping');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

exports.getMappings = async (req, res) => {
  try {
    const mappings = await Mapping.find({ assignedBy: req.user._id })
      .populate('patient', 'name email')
      .populate('doctor', 'name specialization hospital');
    
    res.json({ mappings });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getDoctorsForPatient = async (req, res) => {
  try {
    // Check if patient belongs to user
    const patient = await Patient.findOne({ 
      _id: req.params.patientId, 
      createdBy: req.user._id 
    });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const mappings = await Mapping.find({ patient: req.params.patientId })
      .populate('doctor', 'name specialization hospital experience');
    
    const doctors = mappings.map(mapping => mapping.doctor);
    res.json({ patient: patient.name, doctors });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createMapping = async (req, res) => {
  try {
    const { patientId, doctorId } = req.body;

    // Check if patient exists and belongs to user
    const patient = await Patient.findOne({ 
      _id: patientId, 
      createdBy: req.user._id 
    });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if mapping already exists
    const existingMapping = await Mapping.findOne({ 
      patient: patientId, 
      doctor: doctorId 
    });
    if (existingMapping) {
      return res.status(400).json({ message: 'This doctor is already assigned to this patient' });
    }

    const mapping = new Mapping({
      patient: patientId,
      doctor: doctorId,
      assignedBy: req.user._id
    });

    await mapping.save();
    await mapping.populate(['patient', 'doctor']);

    res.status(201).json({ 
      message: 'Doctor assigned to patient successfully', 
      mapping 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteMapping = async (req, res) => {
  try {
    const mapping = await Mapping.findOne({
      _id: req.params.id,
      assignedBy: req.user._id
    });

    if (!mapping) {
      return res.status(404).json({ message: 'Mapping not found' });
    }

    await mapping.remove();
    res.json({ message: 'Doctor-patient mapping removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
