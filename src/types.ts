export enum ErrorStatus {
  BAD_REQUEST = 400,
  NOT_AUTHENTICATED = 401,
  NOT_AUTHORIZED = 403,
  NOT_FOUND = 404,
  DUPLICATE_ENTITY = 409,
  SERVER_ERROR = 500,
}

export enum SuccessStatus {
  ACCEPTED = 200,
  CREATED = 201,
  UPDATED = 204,
}

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

export type Project = {
  id: string;
  name: string;
  description?: string;
  icon?: string;
};

export enum LayerType {
  HiRise = ".hiRise",
  Group = ".Group",
  WMTS = ".WMTS",
  MVT = ".MVT",
  CustomWms = ".CustomWms",
  SystemWms = ".SystemWms",
}

type Single = {
  type:
    | LayerType.HiRise
    | LayerType.WMTS
    | LayerType.MVT
    | LayerType.CustomWms
    | LayerType.SystemWms;
  id: string;
  name: string;
};

type Group = {
  type: LayerType.Group;
  id: string;
  name: string;
  layers:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
};

export type Layer = Single | Group;

export type ProjectConfig = {
  id: string;
  title: string;
  layers: Layer[];
};

export type Root = Pick<ProjectConfig, "id" | "title">;