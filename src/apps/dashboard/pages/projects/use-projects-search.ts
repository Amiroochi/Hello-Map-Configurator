import { useMemo } from "react";

import { Project } from "@/types";

type Props = {
  projects: Project[] | undefined;
  term: string | undefined;
};

export function useProjectsSearch({ projects, term }: Props) {
  return useMemo(() => {
    if (!term) return projects;

    return projects?.filter((p) =>
      p.name.toLowerCase().includes(term.toLowerCase())
    );
  }, [projects, term]);
}
