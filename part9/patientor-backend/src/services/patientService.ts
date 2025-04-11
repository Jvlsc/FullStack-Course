import { v1 as uuid } from 'uuid';

// Importing the Patient type:
import { NewPatient, NonSensitivePatient, Patient } from '../types/patient';

// Importing the patient data:
import patients from '../data/patients';

// Function to get all patients (Sensitive Data):
const getPatients = (): Patient[] => {
  return patients;
};

// Function to get all patients (Non-Sensitive Data):
const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(patient => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation
  }));
};

// Function to add a patient:
const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

// Exporting the functions:
export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};