import { User } from "@/types";

export type UseUserReturn = {
  user: User | null;
};

export function useUser(): UseUserReturn {
  return {
    user: null,
  };
}
