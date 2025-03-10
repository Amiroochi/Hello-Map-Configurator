import { useQuery } from "@tanstack/react-query";

import axios from "@/lib/axios";
import { Project } from "@/types";
import { dashboard } from "@/endpoints";

import { projects } from "../query-keys";

type Params = {
  userId: string;
};

type Response = {
  canonical_name: string;
  caption: string;
  description?: string;
  icon_url?: string;
};

function readProjects({ userId }: Params) {
  return axios.get<Response[]>(dashboard.readProjects(userId));
}

export function useReadProjectsApi({ userId }: Params) {
  return useQuery({
    queryKey: [projects.readProjects, userId],
    queryFn: () => readProjects({ userId }),
    select: normalizeData,
  });
}

function normalizeData(data: Response[]): Project[] {
  return data.map((item) => ({
    id: item.canonical_name,
    name: item.caption,
    description: item.description,
    icon: item.icon_url,
  }));
}
