import { v1 as uuid } from 'uuid';

// Importing the Patient type:
import { Entry, EntryWithoutId, NewPatient, NonSensitivePatient, Patient } from '../types';

// Importing the patient data:
import patients from '../data/patients';

// Function to get all patients (Sensitive Data):
const getPatients = (): Patient[] => {
  return patients;
};

// Function to get a patient by ID:
const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
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
    ...patient,
    entries: []
  };
  patients.push(newPatient);
  return newPatient;
};

// Function to add an entry to a patient:
const addEntry = (patientId: string, entry: EntryWithoutId): Patient => {
  const patient = patients.find(patient => patient.id === patientId);
  if (!patient) {
    throw new Error('Patient not found');
  }
  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };
  patient.entries.push(newEntry);
  return patient;
};

// Exporting the functions:
export default {
  getPatients,
  getPatientById,
  getNonSensitivePatients,
  addPatient,
  addEntry
};