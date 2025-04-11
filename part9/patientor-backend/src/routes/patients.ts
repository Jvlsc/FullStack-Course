// Importing express:
import express from 'express';

// Import Services:
import patientService from '../services/patientService';

// Creating a router:
const router = express.Router();

// GET Route (Fetching all patients):
router.get('/', (_req, res) => {
  console.log('[Express] Fetching all patients!');
  const patients = patientService.getNonSensitivePatients();
  res.json(patients);
});

// POST Route (Saving a patient):
router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

// Exporting the router:
export default router;