const express = require('express');
const auth = require('../middleware/auth');
const {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctorController');

const router = express.Router();

router
  .route('/')
  .get(auth, getDoctors)
  .post(auth, createDoctor);

router
  .route('/:id')
  .get(auth, getDoctor)
  .put(auth, updateDoctor)
  .delete(auth, deleteDoctor);

module.exports = router;