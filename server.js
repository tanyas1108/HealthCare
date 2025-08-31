const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');

const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const mappingRoutes = require('./routes/mappings');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/mappings', mappingRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Healthcare Backend API is running!' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});