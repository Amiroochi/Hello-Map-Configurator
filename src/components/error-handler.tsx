import { useEffect } from "react";

import { useToast } from "@/hooks/use-toast";
import { ErrorStatus, IError } from "@/types";

export function ErrorHandler() {
  const { toast } = useToast();

  useEffect(() => {
    const listener = ({ error }: { error: IError }) => {
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

    // setup
    window.addEventListener("error", listener);
    // cleanup
    return () => window.removeEventListener("error", listener);
  }, []);

  return null;
}
