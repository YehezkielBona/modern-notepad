import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    res.status(401).json({
      status: 'error',
      message: 'Access token required',
    });
    return;
  }

  const secret = process.env.JWT_SECRET || 'default_jwt_secret';

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(403).json({
        status: 'error',
        message: 'Invalid or expired token',
      });
      return;
    }

    req.user = decoded as { id: string; email: string };
    next();
  });
};
