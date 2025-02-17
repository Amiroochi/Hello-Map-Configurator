import { useState } from "react";

import { User } from "@/types";

export type UseUserReturn =
  | Partial<User> & {
      setUser: (user: User | null) => void;
    };

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(() => {
    const user = window.localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  return { ...user, setUser };
}
