// Import express:
import { NextFunction, Request, Response } from "express";

// Import zod:
import { ZodError } from "zod";

// Middleware to parse Zod errors:
const zodErrorParser = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof ZodError) {
    const path = error.issues[0].path.join('.');
    const message = error.issues[0].message;
    console.log(`[Express] ZodError: ${path} - ${message}`);
    res.status(400).send(`${path} - ${message}`);
  } else {
    next(error);
  }
};

// Export the Zod error parser middleware:
export default zodErrorParser;