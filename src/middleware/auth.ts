import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User';


export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: 'Missing token' });

    const token = authHeader.split(' ')[1];

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET!) as IUser;
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};