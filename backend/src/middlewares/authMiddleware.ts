import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = "WASTE_MANAGEMENT_SYSTEM"

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if(!token) {
    return res.status(401).json({ message: "User not logged in" });
  }

  try{
    const decoded =jwt.verify(token, JWT_SECRET);
    req.body.user = decoded
    next();
  }
  catch(error) {
    console.log(error)
    return res.status(401).json({ message: "Invalid token" });
  }
}