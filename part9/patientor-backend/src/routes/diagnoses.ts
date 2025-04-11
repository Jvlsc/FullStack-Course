// Importing express:
import express from 'express';

// Import Services:
import diagnoseService from '../services/diagnoseService';

// Creating a router:
const router = express.Router();

// GET Route (Fetching all diagnoses):
router.get('/', (_req, res) => {
  try {
    console.log('[Express] Fetching all diagnoses!');
    const diagnoses = diagnoseService.getDiagnoses();
    res.json(diagnoses);
  } catch (error: unknown) {
    let errorMessage = '[Express] Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.error(errorMessage);
    res.status(400).send(errorMessage);
  }
});

// POST Route (Saving a diagnosis):
router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});

// Exporting the router:
export default router;