import { useReadProjectApi } from "../../api/read-project";

export function useProjectDetail({ projectId }: { projectId?: string }) {
  const { data: project, ...rest } = useReadProjectApi({ projectId });

  return { project, ...rest };
}
