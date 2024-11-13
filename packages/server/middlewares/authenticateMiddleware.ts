import { NextFunction, Request, Response } from 'express';

export function authenticateMiddleware(req: Request, res: Response, next: NextFunction): void {
    if (!req.headers.cookie) res.status(403).send('Not authorized');
    else next();
}
