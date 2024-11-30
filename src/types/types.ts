export interface AppwriteError extends Error {
  message: string;
  code?: number;
  success: boolean;
}
