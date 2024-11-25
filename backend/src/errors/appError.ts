export class AppError extends Error {
  public readonly errorCode: string;
  public readonly errorDescription: string;
  public readonly statusCode: number;

  constructor(errorCode: string, errorDescription: string, statusCode = 400) {
    super(errorDescription);
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
