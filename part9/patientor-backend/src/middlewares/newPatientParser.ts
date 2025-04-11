// Importing express:
import { NextFunction, Request, Response } from "express";

// Importing the NewPatientSchema:
import NewPatientSchema from "../utils/newPatientSchema";

// Middleware to parse the new patient:
const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

// Exporting the new patient parser:
export default newPatientParser;