import { NextFunction, Request, Response } from 'express';

export function authenticateMiddleware(req: Request, res: Response, next: NextFunction): void {
    if (!req.headers.cookie) res.sendStatus(403);
    else next();
}
