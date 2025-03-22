import { useEffect } from "react";

import { useToast } from "@/hooks/use-toast";
import { ErrorStatus, IError } from "@/types";

export function ErrorHandler() {
  const { toast } = useToast();

  useEffect(() => {
    const listener = (event: CustomEvent<{ error: IError }>) => {
      const { error } = event.detail;
      if (
        error.status === ErrorStatus.NOT_AUTHENTICATED ||
        error.status === ErrorStatus.NOT_AUTHORIZED
      )
        return;

      // show toast here
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    };

    window.addEventListener("axios-error", listener as EventListener);
    // cleanup
    return () =>
      window.removeEventListener("axios-error", listener as EventListener);
  }, []);

  return null;
}
