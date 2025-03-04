import { useQuery } from "@tanstack/react-query";

import axios from "@/lib/axios";
import { dashboard } from "@/endpoints";

import { projects } from "../query-keys";
import { Project } from "@/types";

type Params = {
  projectId?: string;
};

type Response = {
  canonical_name: string;
  caption: string;
  description?: string;
  icon_url?: string;
};

function readProject({ projectId }: Required<Params>) {
  return axios.get<Response>(dashboard.readProject(projectId));
}

export function useReadProjectApi({ projectId }: Params) {
  return useQuery({
    queryKey: [projects.readProject, projectId],
    queryFn: () => readProject({ projectId: projectId! }),
    enabled: !!projectId,
    select: normalizeData,
  });
}

function normalizeData(data: Response): Project {
  return {
    id: data.canonical_name,
    name: data.caption,
    description: data.description,
    icon: data.icon_url,
  };
}
