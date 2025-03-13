import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

// Error handler middleware
const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // If response headers are already sent, pass the error to the next middleware
    if (res.headersSent) {
        return next(err);
    }

    // Determine status code
    const statusCode = res.statusCode >= 400 ? res.statusCode : 500;
    res.status(statusCode);

    // Log error stack trace in development mode for debugging
    if (process.env.NODE_ENV !== "production") {
        console.error(err);
    }

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

export default errorHandler;
