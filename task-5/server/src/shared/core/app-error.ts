export interface UseCaseError {
  message: string;
}

export class UnexpectedError extends Error implements UseCaseError {
  public constructor() {
    super(`An unexpected error occurred.`);
    this.message = 'An unexpected error occurred.';
  }
}
