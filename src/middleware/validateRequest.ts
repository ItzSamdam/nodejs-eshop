import { validationResult } from "express-validator";
import ValidationException from "../exceptions/ValidationException";
import { NextFunction, Request, Response } from "express";

/**
 * A middleware to validate the incoming request.
 */
const validateRequest = (req: Request, res: Response ,next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ValidationException(errors.array());
  }

  next();
};

export default validateRequest;
