// Importing zod:
import { z } from 'zod';

// Importing the types:
import { EntryType, HealthCheckRating } from '../types';

// Creating the base entry schema:
const baseEntrySchema = z.object({
  description: z.string({
    required_error: "Description field is required",
    invalid_type_error: "Description must be a text"
  }).min(1, "Description cannot be empty")
    .max(1000, "Description cannot exceed 1000 characters"),

  date: z.string({
    required_error: "Date field is required",
    invalid_type_error: "Date must be a string"
  }).date("Invalid date. Use format YYYY-MM-DD"),

  specialist: z.string({
    required_error: "Specialist field is required",
    invalid_type_error: "Specialist must be a text"
  }).min(1, "Specialist name cannot be empty")
    .max(100, "Specialist name is too long"),

  diagnosisCodes: z.array(z.string()).optional()
    .refine(codes => codes === undefined || codes.every(code => code.trim().length > 0), {
      message: "Diagnosis codes cannot be empty"
    }),
});

// Creating the health check entry schema:
const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal(EntryType.HealthCheck),
  healthCheckRating: z.nativeEnum(HealthCheckRating, {
    required_error: "Health check rating is required",
    invalid_type_error: "Health check rating must be a valid number (0-3)"
  })
});

// Creating the hospital entry schema:
const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal(EntryType.Hospital),

  discharge: z.object({
    date: z.string({
      required_error: "Date field is required",
      invalid_type_error: "Date must be a string"
    }).date("Invalid date. Use format YYYY-MM-DD"),
    criteria: z.string({
      required_error: "Discharge criteria is required",
      invalid_type_error: "Discharge criteria must be a text"
    }).min(1, "Discharge criteria cannot be empty")
      .max(500, "Discharge criteria is too long")
  }, { 
    required_error: "Discharge information is required",
    invalid_type_error: "Discharge must be an object"
  })
});

// Creating the occupational healthcare entry schema:
const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal(EntryType.OccupationalHealthcare),

  employerName: z.string({
    required_error: "Employer name is required",
    invalid_type_error: "Employer name must be a text"
  }).min(1, "Employer name cannot be empty")
    .max(100, "Employer name is too long"),

  sickLeave: z.object({
    startDate: z.string({
      required_error: "Start date is required",
      invalid_type_error: "Start date must be a string"
    }).date("Invalid sick leave start date. Use format YYYY-MM-DD"),
    endDate: z.string({
      required_error: "End date is required",
      invalid_type_error: "End date must be a string"
    }).date("Invalid sick leave end date. Use format YYYY-MM-DD")
  }).optional()
    .refine(
      (data) => {
        if (!data) return true;
        return new Date(data.startDate) <= new Date(data.endDate);
      },
      { message: "End date must be after start date" }
    )
});

// Creating the entry schema:
const entrySchema = z.discriminatedUnion('type', [
  healthCheckEntrySchema,
  hospitalEntrySchema,
  occupationalHealthcareEntrySchema
], {
  errorMap: (issue, ctx) => {
    if (issue.code === 'invalid_type') {
      return { message: "Entry type is required" };
    }
    if (issue.code === 'invalid_union_discriminator') {
      return { 
        message: "Invalid entry type. Must be one of: 'HealthCheck', 'Hospital', or 'OccupationalHealthcare'" 
      };
    }
    return { message: ctx.defaultError };
  }
});

// Exporting the entry schema:
export default entrySchema;
