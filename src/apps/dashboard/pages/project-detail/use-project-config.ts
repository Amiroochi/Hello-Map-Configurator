import { useCallback, useMemo } from "react";

import { create } from "zustand";

import { Layer, ProjectConfig, Root } from "@/types";

import {
  useReadCurrentProjectConfigApi,
  useReadUploadedProjectConfigApi,
} from "../../api/read-project-config";
import { DeleteHandler, NodeApi } from "react-arborist";

type ProjectConfigStoreState = {
  current: ProjectConfig | undefined;
  uploaded: ProjectConfig | undefined;

  setCurrent: (config: ProjectConfig) => void;
  setUploaded: (config: ProjectConfig) => void;
};

const projectConfigStore = create<ProjectConfigStoreState>((set) => ({
  current: undefined,
  uploaded: undefined,

  setCurrent: (config) => set({ current: config }),
  setUploaded: (config) => set({ uploaded: config }),
}));

type UseCurrentProjectConfigProps = {
  projectId: string | undefined;
};

type UseProjectConfigReturnType = {
  roots: Root[] | undefined;
  config: ProjectConfig | undefined;
  setConfig: (config: ProjectConfig) => void;
  loading: boolean;
  onRootChange: (root: string) => void;
  onDelete?: DeleteHandler<Layer> | undefined;
};

export const useCurrentProjectConfig = ({
  projectId,
}: UseCurrentProjectConfigProps): UseProjectConfigReturnType => {
  const { current, setCurrent } = projectConfigStore();

  const config = useReadCurrentProjectConfigApi({
    projectId,
  });

  const roots = useMemo(() => {
    if (!config.data) return [];

    return config.data.map((item) => ({ id: item.id, title: item.title }));
  }, [config.data]);

  const onRootChange = useCallback(
    (id: string) => {
      const currentConfig = config.data?.find((item) => item.id === id);

      if (currentConfig) {
        setCurrent(currentConfig);
      }
    },
    [config]
  );

  const onDelete = useCallback(
    ({ ids, nodes }: { ids: string[]; nodes: NodeApi<Layer>[] }) => {
      console.log("ids", ids);
      console.log("nodes", current?.layers);
    },
    [current]
  );

  return {
    roots,
    config: current,
    setConfig: setCurrent,
    loading: config.isLoading,
    onRootChange,
    onDelete,
  };
};

export const useUploadedProjectConfig = ({
  projectId,
}: UseCurrentProjectConfigProps): UseProjectConfigReturnType => {
  const { uploaded, setUploaded } = projectConfigStore();

  const config = useReadUploadedProjectConfigApi({ projectId });

  const roots = useMemo(() => {
    if (!config.data) return [];

    return config.data.map((item) => ({ id: item.id, title: item.title }));
  }, [config.data]);

  const onRootChange = useCallback(
    (id: string) => {
      const uploadedConfig = config.data?.find((item) => item.id === id);

      if (uploadedConfig) {
        setUploaded(uploadedConfig);
      }
    },
    [config]
  );

  return {
    roots,
    config: uploaded,
    setConfig: setUploaded,
    loading: false,
    onRootChange,
  };
};
