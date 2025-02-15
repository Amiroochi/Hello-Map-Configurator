import { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";

import { FormInputs } from "./schema";

export function useLogin() {
  const login: SubmitHandler<FormInputs> = useCallback((data) => {
    // do login
    console.log(data);
  }, []);

  return login;
}
