export type ErrorStatus = 400 | 401 | 403 | 404 | 409 | 500;

export type SuccessStatus = 200 | 201 | 204;

export interface IError {
  message?: string;
  status: ErrorStatus;
}
export interface ISuccess {
  message?: string;
  status: SuccessStatus;
}

export type User = {
  id: string;
  name: string;
  email: string;
};
