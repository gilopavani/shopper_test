import "express-async-errors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { routes } from "./routes";
import { AppError } from "./errors/appError";

const app = express();
app.use(cors());

app.use(express.json());

app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        error_code: error.errorCode,
        error_description: error.errorDescription,
      });
    }

    return response.status(500).json({
      error_code: "INTERNAL_SERVER_ERROR",
      error_description: `Internal server error: ${error.message}`,
    });
  }
);

export { app };

app.listen(8080, "0.0.0.0", () => "server running on port 3333");
