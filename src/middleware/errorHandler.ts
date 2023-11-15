import { NextFunction, Request, Response } from "express";
import CustomException from "../exceptions/CustomException";
import { logger } from "../utils/logger.utils";
import httpStatus from "http-status";

/**
 * A Error Handler middleware.
 */

const errorHandler = async (err: (Error | CustomException), req: Request, res: Response, next: NextFunction) => {
  // console.log(req.originalUrl)
  // console.log(req.params);
  // Handling custom errors/exceptions
  if(err instanceof CustomException) {
    return res.status(err.statusCode).json(err.serialize());
      
      // json(err.serialize());
    // return res.send(err.serialize())
  }

  console.log(err);
  logger.error(err);

  // Handling Prisma errors/exceptions
  if(err.constructor.name.includes("Prisma")) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ statusCode: httpStatus.INTERNAL_SERVER_ERROR, status: "error", message: "Internal server error", errors: err });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({statusCode: httpStatus.INTERNAL_SERVER_ERROR, status: "error", message: "Internal Server Error", errors: err});
}

export default errorHandler;
