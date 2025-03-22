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

export function useReadCurrentProjectConfigApi({ projectId }: Params) {
  return useQuery({
    queryKey: [projects.readCurrentProjectConfig, projectId],
    queryFn: () => readProjectConfig({ projectId: projectId! }),
    enabled: !!projectId,
    select: normalizeData,
  });
}

export function useReadUploadedProjectConfigApi({ projectId }: Params) {
  return useQuery({
    queryKey: [projects.readUploadedProjectConfig, projectId],
    queryFn: () => Promise.resolve({}),
    enabled: !!projectId,
    select: normalizeData,
  });
}

function normalizeData(
  data: Response | Record<PropertyKey, never>
): ProjectConfig[] {
  const keys = Object.keys(data.map);

  if (!keys.length) return [];

  return keys.map((key) => ({
    id: key,
    title: data.map[key].caption,
    layers: [...data.map[key].base_layer, ...data.map[key].content_layer]
      .filter(filterByType)
      .map((item) => {
        const id = makeId(
          item.type,
          data.map[key].caption,
          item.canonical_name
        );

        return item.type === LayerType.Group
          ? normalizeGroup(id, item)
          : normalizeSingle(id, item);
      })
      .filter(Boolean),
  }));
}

function makeId(...args: string[]) {
  return args.join("-");
}

function filterByType(item: Single | Group) {
  return (
    item.type === LayerType.HiRise ||
    item.type === LayerType.Group ||
    item.type === LayerType.WMTS ||
    item.type === LayerType.MVT ||
    item.type === LayerType.CustomWms ||
    item.type === LayerType.SystemWms
  );
}

function normalizeGroup(id: string, item: Group) {
  return {
    type: item.type,
    id,
    name: item.caption ?? "Untitled",
    layers: item.layers?.map((layer) => ({
      id: layer.canonical_name,
      name: layer.caption ?? "Untitled",
    })),
  };
}

function normalizeSingle(id: string, item: Single) {
  return {
    type: item.type,
    id,
    name: item.caption ?? "Untitled",
  };
}
