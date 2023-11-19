import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export default async function validateIdMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    response.status(400).json({ message: "Invalid ID" });
  }

  return next();
}
