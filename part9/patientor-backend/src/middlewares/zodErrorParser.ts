// Import express:
import { NextFunction, Request, Response } from "express";

// Import zod:
import { ZodError } from "zod";

// Middleware to parse Zod errors:
const zodErrorParser = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof ZodError) {
    console.log('[Express] ZodError: ', error.issues[0].message);
    res.status(400).send(error.issues[0].message);
  } else {
    next(error);
  }
};

// Export the Zod error parser middleware:
export default zodErrorParser;