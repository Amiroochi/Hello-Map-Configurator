import { useMutation } from "@tanstack/react-query";

import axios from "@/lib/axios";
import { auth } from "@/endpoints";
import { IError, ISuccess } from "@/types";

type Params = {
  email: string;
  password: string;
};

function login({ email, password }: Params) {
  return axios.post(auth.login(), {
    email,
    password,
  });
}

export function useLoginApi() {
  return useMutation<ISuccess & { token: string }, IError, Params>({
    mutationFn: login,
  });
}
