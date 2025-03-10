import { useCallback, useState } from "react";

import { Layer, ProjectConfig } from "@/types";

import { useReadProjectConfigApi } from "../../api/read-project-config";

type UseProjectConfigProps = {
  projectId?: string;
};

type UseProjectConfigReturn = {
  projectConfig: ProjectConfig[] | undefined;
  layers: Layer[] | undefined;
  isLoading: boolean;
  onRootChange: (root: string) => void;
};

export function useProjectConfig({
  projectId,
}: UseProjectConfigProps): UseProjectConfigReturn {
  const [layers, setLayers] = useState<Layer[] | undefined>();

  const { data: projectConfig, isLoading } = useReadProjectConfigApi({
    projectId,
  });

  const onRootChange = useCallback(
    (id: string) => {
      const config = projectConfig?.find((item) => item.id === id);
      setLayers(config?.layers);
    },
    [projectConfig]
  );

  return { projectConfig, layers, isLoading, onRootChange };
}
