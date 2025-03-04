import { useReadProjectsApi } from "../../api/read-projects";

export function useProjects() {
  const { data: projects, isLoading } = useReadProjectsApi({ userId: "1" });

  return { projects, isLoading };
}
