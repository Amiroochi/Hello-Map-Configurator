import { useParams } from "react-router";

import { useProjectDetail } from "./use-project-detail";
import { PageHeader } from "../../components/page-header";
import { ProjectConfigSheet } from "../../components/project-config-sheet";
import { CurrentProjectConfig, UploadedProjectConfig } from "./project-config";

export default function ProjectDetail() {
  const { projectId } = useParams();

  const projectDetail = useProjectDetail({ projectId });

  return (
    <div className="flex flex-col space-y-2 h-full">
      <PageHeader title={projectDetail.project?.name!} actions={<Actions />} />
      <div className="flex flex-1">
        <div className="flex flex-col flex-1 border-4 rounded-l-md border-slate-200 dark:border-neutral-800">
          <div className="bg-slate-200 dark:bg-neutral-800 p-4">
            <h2 className="text-xl">Imported Project Configuration</h2>
          </div>
          <div className="h-full px-4 py-2">
            <UploadedProjectConfig projectId={projectId} />
          </div>
        </div>
        <div className="flex flex-col flex-1 border-4 rounded-r-md border-slate-200 dark:border-neutral-800">
          <div className="bg-slate-200 dark:bg-neutral-800 p-4">
            <h2 className="text-xl">Current Project Configuration</h2>
          </div>
          <div className="h-full px-4 py-2">
            <CurrentProjectConfig projectId={projectId} />
          </div>
        </div>
      </div>
    </div>
  );
}

const Actions = () => {
  const { projectId } = useParams();

  return <ProjectConfigSheet projectId={projectId} />;
};
