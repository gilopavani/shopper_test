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
        message: error.message,
      });
    }

    return response.status(500).json({
      status: "Error",
      message: `Internal server error ${error.message}`,
    });
  }
);

app.listen(3333, "0.0.0.0", () => "server running on port 3333");
