// Importing express:
import { NextFunction, Request, Response } from "express";

// Importing the NewEntrySchema:
import entrySchema from "../utils/newEntrySchema";

// Middleware to parse the new entry:
const newEntryParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    entrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

// Exporting the new entry parser:
export default newEntryParser;