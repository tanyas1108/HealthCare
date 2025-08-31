const express = require('express');
const auth = require('../middleware/auth');
const {
  getMappings,
  getDoctorsForPatient,
  createMapping,
  deleteMapping
} = require('../controllers/mappingController');

const router = express.Router();

router
  .route('/')
  .get(auth, getMappings)
  .post(auth, createMapping);

router.get('/:patientId/doctors', auth, getDoctorsForPatient);
router.delete('/:id', auth, deleteMapping);

module.exports = router;