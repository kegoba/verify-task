import { NextFunction, Request, Response } from "express";
import ResponseManager from "./response-manager";

export class ApplicationError extends Error {
  constructor(public message: string, public statusCode?: number) {
    super(message);
    this.name = "ApplicationError";
    this.statusCode = statusCode || 400;
  }
}
  
function errorHandler(err: ApplicationError, req: Request, res: Response, next: NextFunction) {
  if (err.statusCode) ResponseManager.error(res, err.name, err.message, err.statusCode);
  else ResponseManager.error(res, err.name, err.message, 500);
 if (!err.statusCode || err.statusCode >= 500) console.log(err, req);
}

export default errorHandler;
