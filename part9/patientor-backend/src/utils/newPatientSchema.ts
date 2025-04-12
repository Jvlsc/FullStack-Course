// Importing zod:
import { z } from 'zod';

// Importing the Gender type:
import { Gender } from '../types';

// Creating the NewPatientSchema:
const NewPatientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dateOfBirth: z.string().date(),
  ssn: z.string().min(1, "SSN is required"),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(1, "Occupation is required")
});

// Exporting the NewPatientSchema:
export default NewPatientSchema;
