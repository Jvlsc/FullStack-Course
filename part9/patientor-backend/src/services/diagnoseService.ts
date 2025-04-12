// Importing the Diagnosis type:
import { Diagnosis } from '../types';

// Importing the diagnose data:
import diagnoses from '../data/diagnoses';

// Function to get all diagnoses:
const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

// Function to add a diagnose:
const addDiagnose = () => {
  return null;
};

// Exporting the functions:
export default {
  getDiagnoses,
  addDiagnose
};