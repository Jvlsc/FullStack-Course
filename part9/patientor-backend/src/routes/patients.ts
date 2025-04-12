// Importing express:
import express from 'express';
import { Request, Response } from 'express';

// Import Services & Utils:
import patientService from '../services/patientService';

// Import Middleware:
import newPatientParser from '../middlewares/newPatientParser';
import newEntryParser from '../middlewares/newEntryParser';

// Import Types:
import { EntryWithoutId, NewPatient, Patient } from '../types';

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

// GET Route (Fetching a patient by ID):
router.get('/:id', (req: Request, res: Response) => {
  try {
    console.log('[Express] Fetching a patient by ID...');
    const patient = patientService.getPatientById(req.params.id);
    console.log('[Express] Patient fetched successfully!');
    res.json(patient);
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
router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  console.log('[Express] Saving a patient...');
  const addedPatient = patientService.addPatient(req.body);
  console.log('[Express] Patient saved successfully!');
  res.json(addedPatient);
});

// POST Route (Adding an entry to a patient):
router.post('/:id/entries', newEntryParser, (req: Request<{ id: string }, unknown, EntryWithoutId>, res: Response<Patient>) => {
  console.log('[Express] Adding an entry to a patient...');
  const addedEntry = patientService.addEntry(req.params.id, req.body);
  console.log('[Express] Entry added successfully!');
  res.json(addedEntry);
});

// Exporting the router:
export default router;