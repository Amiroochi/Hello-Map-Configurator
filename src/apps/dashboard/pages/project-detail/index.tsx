import { useParams } from "react-router";

import { ArrowRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";

import { ProjectConfig } from "./project-config";
import { NoConfig } from "../../components/no-config";
import { useProjectDetail } from "./use-project-detail";
import { PageHeader } from "../../components/page-header";

export default function ProjectDetail() {
  const { projectId } = useParams();

  const { project, isLoading } = useProjectDetail({ projectId });

  return (
    <div className="flex flex-col space-y-2 h-full">
      <PageHeader title={project?.name!} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div><Input type="file" /></div>
          <div className="flex flex-1">
            <div className="flex flex-col flex-1 border-4 rounded-l-md border-slate-200 dark:border-neutral-800">
              <div className="bg-slate-200 dark:bg-neutral-800 p-4">
                <h2 className="text-xl">Imported Project Configuration</h2>
              </div>
              <div className="px-4 py-2 flex flex-1 items-center justify-center">
                <NoConfig />
              </div>
            </div>
            <div className="flex items-center justify-center px-4 bg-slate-200 dark:bg-neutral-800">
              <Button
                variant="ghost"
                className="hover:bg-slate-100 dark:hover:bg-neutral-700"
              >
                <ArrowRight />
              </Button>
            </div>
            <div className="flex flex-col flex-1 border-4 rounded-r-md border-slate-200 dark:border-neutral-800">
              <div className="bg-slate-200 dark:bg-neutral-800 p-4">
                <h2 className="text-xl">Current Project Configuration</h2>
              </div>
              <div className="h-full px-4 py-2">
                <ProjectConfig projectId={projectId} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// const data = [
//   { id: "1", name: "Unread" },
//   { id: "2", name: "Threads" },
//   {
//     id: "3",
//     name: "Chat Rooms",
//     children: [
//       { id: "c1", name: "General" },
//       { id: "c2", name: "Random" },
//       { id: "c3", name: "Open Source Projects" },
//     ],
//   },
//   {
//     id: "4",
//     name: "Direct Messages",
//     children: [
//       { id: "d1", name: "Alice" },
//       { id: "d2", name: "Bob" },
//       { id: "d3", name: "Charlie" },
//     ],
//   },
// ];
