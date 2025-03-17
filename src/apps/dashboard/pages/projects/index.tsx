import { useState } from "react";
import { Link } from "react-router";

import { useDebounce } from "use-debounce";
import { useQueryClient } from "@tanstack/react-query";

import { Project } from "@/types";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/loading";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { projects } from "../../query-keys";
import { useProjects } from "./use-projects";
import { PageHeader } from "../../components/page-header";
import { useProjectsSearch } from "./use-projects-search";

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

function ProjectList() {
  const [search, setSearch] = useState<string | undefined>();
  const [term] = useDebounce(search, 500);

  const { projects, isLoading } = useProjects();

  function updateSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  const filteredProjects = useProjectsSearch({ projects, term });

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col space-y-1">
      <Input
        placeholder="Start typing to filter projects"
        value={search}
        onChange={updateSearch}
        autoFocus
        className="!text-xl !py-8 !px-6"
      />
      {filteredProjects?.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-300 my-8">
          No projects found
        </div>
      )}
      {(filteredProjects ?? []).map((project) => (
        <ProjectListItem key={project.id} project={project} />
      ))}
    </div>
  );
}

function ProjectListItem({ project }: { project: Project }) {
  const queryClient = useQueryClient();

  function selectProject() {
    queryClient.setQueryData([projects.readProject, String(project.id)], {
      ...project,
      canonical_name: project.id,
      caption: project.name,
    });
  }

  return (
    <Link to={`${project.id}`} onClick={selectProject}>
      <Card className="my-2 rounded-sm hover:bg-blue-100 dark:hover:bg-blue-950">
        <CardHeader className="flex flex-row items-center space-x-4">
          <div>
            <img src={project.icon} className="w-10" />
          </div>
          <div className="flex flex-col">
            <CardTitle>{project.name}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
