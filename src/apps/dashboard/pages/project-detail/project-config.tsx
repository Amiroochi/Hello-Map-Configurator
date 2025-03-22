import { Loading } from "@/components/loading";

import { NoConfig } from "../../components/no-config";
import { ProjectConfigSection } from "../../components/project-config-section";
import {
  useCurrentProjectConfig,
  useUploadedProjectConfig,
} from "./use-project-config";

type ProjectConfigProps = {
  projectId: string | undefined;
};

export function CurrentProjectConfig({ projectId }: ProjectConfigProps) {
  const { roots, config, loading, onRootChange } = useCurrentProjectConfig({
    projectId,
  });

  if (loading) return <Loading />;

  return (
    <ProjectConfigSection
      roots={roots}
      config={config}
      onRootChange={onRootChange}
    />
  );
}

export function UploadedProjectConfig({ projectId }: ProjectConfigProps) {
  const { roots, config, loading, onRootChange } = useUploadedProjectConfig({
    projectId,
  });

  if (!roots || roots.length === 0) return <NoConfig />;

  if (loading) return <Loading />;

  return (
    <ProjectConfigSection
      roots={roots}
      config={config}
      onRootChange={onRootChange}
    />
  );
}
