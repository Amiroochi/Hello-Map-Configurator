import { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";

import { useToast } from "@/hooks/use-toast";
import { useRedirect } from "@/hooks/use-redirect";

import { FormInputs } from "./schema";
import { useLoginApi } from "../apis/login";

export function useLogin() {
  const { toast } = useToast();

  const { mutateAsync, isPending } = useLoginApi();

  const { redirectToDashboard } = useRedirect();

  const login: SubmitHandler<FormInputs> = useCallback((data) => {
    mutateAsync(data).then(() => {
      toast({
        title: "Login Success",
        description: "You have successfully logged in",
      });
      redirectToDashboard();
    });
  }, []);

  return { login, isPending };
}
