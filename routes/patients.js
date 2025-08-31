const express = require('express');
const auth = require('../middleware/auth');
const {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient
} = require('../controllers/patientController');

const router = express.Router();

router
  .route('/')
  .get(auth, getPatients)
  .post(auth, createPatient);

router
  .route('/:id')
  .get(auth, getPatient)
  .put(auth, updatePatient)
  .delete(auth, deletePatient);

module.exports = router;