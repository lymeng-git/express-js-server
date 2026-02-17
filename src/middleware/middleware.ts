import { Request, Response } from "express-serve-static-core";

export const requestedTime = function (req: Request, res: Response, next: () => void) {
    req.requestTime = new Date()
    next(); // Pass control to the next handler
};