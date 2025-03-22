import { ProjectList } from "./project-list";
import { PageHeader } from "../../components/page-header";

export default function Projects() {
  return (
    <div className="flex flex-col space-y-2 h-full">
      <PageHeader title="Projects" />
      <div className="flex-1 h-full">
        <ProjectList />
      </div>
    </div>
  );
}
