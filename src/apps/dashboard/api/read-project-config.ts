import { useQuery } from "@tanstack/react-query";

import axios from "@/lib/axios";
import { dashboard } from "@/endpoints";

import { projects } from "../query-keys";
import { ProjectConfig } from "@/types";

type Params = {
  projectId?: string;
};

type HiRise = {
  type: ".hiRise";
  caption: string;
  canonical_name: string;
};

type Group = {
  type: ".Group";
  caption: string;
  canonical_name: string;
  layers: {
    caption: string;
    canonical_name: string;
  }[];
};

type Response = Record<
  "map",
  Record<
    string,
    {
      caption: string;
      content_layer: (HiRise | Group)[];
    }
  >
>;

function readProjectConfig({ projectId }: Required<Params>) {
  return axios.get<Response>(dashboard.readProjectConfig(projectId));
}

export function useReadProjectConfigApi({ projectId }: Params) {
  return useQuery({
    queryKey: [projects.readProjectConfig, projectId],
    queryFn: () => readProjectConfig({ projectId: projectId! }),
    enabled: !!projectId,
    select: normalizeData,
  });
}

function normalizeData(data: Response): ProjectConfig[] {
  return Object.keys(data?.map).map((key) => ({
    id: key,
    title: data.map[key].caption,
    layers: data.map[key].content_layer
      .filter((item) => item.type === ".hiRise" || item.type === ".Group")
      .map((item) => {
        if (item.type === ".hiRise") {
          return {
            type: item.type,
            id: 'hirise-' + data.map[key].caption + '-' + item.canonical_name,
            name: item.caption ?? "Untitled",
          };
        }
        if (item.type === ".Group") {
          return {
            type: item.type,
            id: 'group-' + data.map[key].caption + '-' + item.canonical_name,
            name: item.caption ?? "Untitled",
            layers: item.layers?.map((layer) => ({
              id: layer.canonical_name,
              name: layer.caption ?? "Untitled",
            })),
          };
        }
      }).filter((layer) => layer !== undefined),
  }));
}
