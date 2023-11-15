import IErrorMessage from "../interfaces/i.error.message";
import CustomException from "./CustomException";
import httpStatus from "http-status";

class BadRequestException extends CustomException {
  public statusCode = httpStatus.BAD_REQUEST;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestException.prototype);
  }

  serialize(): IErrorMessage {
    return { statusCode: this.statusCode, status: "error", message: this.message };
  }
}

export default BadRequestException;
