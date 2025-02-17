import { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";

import { useApp } from "@/app-provider";
import { useToast } from "@/hooks/use-toast";
import { useRedirect } from "@/hooks/use-redirect";

import { FormInputs } from "./schema";
import { useLoginApi } from "../apis/login";

export function useLogin() {
  const { user } = useApp();

  const { toast } = useToast();

  const { mutateAsync, isPending } = useLoginApi();

  const { redirectToDashboard } = useRedirect();

  const login: SubmitHandler<FormInputs> = useCallback((data) => {
    mutateAsync(data).then(({ token }) => {
      user.setUser({
        id: "1",
        email: data.email,
        name: "Sina Sadrzadeh",
      });
      // TODO: create a store for user that is synced with localstorage
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          id: "1",
          email: data.email,
          name: "Sina Sadrzadeh",
          token,
        })
      );
      toast({
        title: "Login Success",
        description: "You have successfully logged in",
      });
      redirectToDashboard();
    });
  }, []);

  return { login, isPending };
}
