// Importing express:
import express from 'express';

// Import Services & Utils:
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/validationRequest';

// Creating a router:
const router = express.Router();

// GET Route (Fetching all patients):
router.get('/', (_req, res) => {
  try {
    console.log('[Express] Fetching all patients...');
    const patients = patientService.getNonSensitivePatients();
    console.log('[Express] Patients fetched successfully!');
    res.json(patients);
  } catch (error: unknown) {
    let errorMessage = '[Express] Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.error(errorMessage);
    res.status(400).send(errorMessage);
  }
});

// POST Route (Saving a patient):
router.post('/', (_req, res) => {
  try {
    console.log('[Express] Saving a patient...');
    const newPatient = toNewPatientEntry(_req.body);
    const addedPatient = patientService.addPatient(newPatient);
    console.log('[Express] Patient saved successfully!');
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = '[Express] Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.error(errorMessage);
    res.status(400).send(errorMessage);
  }
});

// Exporting the router:
export default router;