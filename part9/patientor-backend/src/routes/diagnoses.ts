// Importing express:
import express from 'express';

// Import Services:
import diagnoseService from '../services/diagnoseService';

// Creating a router:
const router = express.Router();

// GET Route (Fetching all diagnoses):
router.get('/', (_req, res) => {
  console.log('[Express] Fetching all diagnoses!');
  const diagnoses = diagnoseService.getEntries();
  res.json(diagnoses);
});

// POST Route (Saving a diagnosis):
router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});

// Exporting the router:
export default router;