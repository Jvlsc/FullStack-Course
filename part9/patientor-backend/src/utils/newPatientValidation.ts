// Importing the NewPatient type:
import { Gender, NewPatient } from '../types/patient';

// Function to check if the text is a valid string:
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// Function to parse the string:
const parseString = (text: unknown, fieldName: string): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing ' + fieldName);
  }
  return text;
};

// Function to check if the date is valid:
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// Function to parse the date:
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// Function to check if the gender is valid:
const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(gender);
};

// Function to parse the gender:
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// Function to parse the patient entry:
const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseString(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, 'occupation'),
      entries: []
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

// Exporting the function to validate the patient entry:
export default toNewPatientEntry;