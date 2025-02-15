import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import { IError } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createError(error: IError) {
  if (error.status === 400)
    return { status: error.status, message: "Bad Request" };

  if (error.status === 401)
    return { status: error.status, message: "Unauthorized" };

  if (error.status === 403)
    return { status: error.status, message: "Forbidden" };

  if (error.status === 404)
    return { status: error.status, message: "Not Found" };

  if (error.status === 409)
    return { status: error.status, message: "Conflict" };

  if (error.status === 500)
    return { status: error.status, message: "Internal Server Error" };

  return { status: error.status, message: "Unknown Error" };
}

export function dispatchError(error: IError) {
  return window.dispatchEvent(
    new CustomEvent("error", { detail: createError(error) })
  );
}
