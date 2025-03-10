import { useQuery } from "@tanstack/react-query";

import axios from "@/lib/axios";
import { dashboard } from "@/endpoints";
import { LayerType, ProjectConfig } from "@/types";

import { projects } from "../query-keys";

type Params = {
  projectId?: string;
};

type Single = {
  type:
    | LayerType.HiRise
    | LayerType.WMTS
    | LayerType.MVT
    | LayerType.CustomWms
    | LayerType.SystemWms;
  caption: string;
  canonical_name: string;
};

type Group = {
  type: LayerType.Group;
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
      base_layer: Single[];
      content_layer: (Single | Group)[];
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
    layers: [...data.map[key].base_layer, ...data.map[key].content_layer]
      .filter(
        (item) =>
          item.type === LayerType.HiRise ||
          item.type === LayerType.Group ||
          item.type === LayerType.WMTS ||
          item.type === LayerType.MVT ||
          item.type === LayerType.CustomWms ||
          item.type === LayerType.SystemWms
      )
      .map((item) => {
        if (item.type === LayerType.Group) {
          return {
            type: item.type,
            id: makeId(item.type, data.map[key].caption, item.canonical_name),
            name: item.caption ?? "Untitled",
            layers: item.layers?.map((layer) => ({
              id: layer.canonical_name,
              name: layer.caption ?? "Untitled",
            })),
          };
        }
        return {
          type: item.type,
          id: makeId(item.type, data.map[key].caption, item.canonical_name),
          name: item.caption ?? "Untitled",
        };
      })
      .filter((layer) => layer !== undefined),
  }));
}

function makeId(...args: string[]) {
  return args.join("-");
}
