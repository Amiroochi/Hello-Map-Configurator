import { useParams } from "react-router";

import { useProjectDetail } from "./use-project-detail";
import { PageHeader } from "../../components/page-header";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/loading";
import { NoConfig } from "../../components/no-config";
import { ProjectConfig } from "./project-config";

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
          <Input type="file" />
          <div className="flex flex-1">
            <div className="flex flex-col flex-1 border-4 rounded-l-md border-slate-200">
              <div className="bg-slate-200 p-4">
                <h2 className="text-xl">Imported Project Configuration</h2>
              </div>
              <div className="px-4 py-2 flex flex-1 items-center justify-center">
                <NoConfig />
              </div>
            </div>
            <div className="flex items-center justify-center px-4 bg-slate-200">
              <Button variant="ghost" size="lg">
                <ArrowRight />
              </Button>
            </div>
            <div className="flex flex-col flex-1 border-4 rounded-r-md border-slate-200">
              <div className="bg-slate-200 p-4">
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
