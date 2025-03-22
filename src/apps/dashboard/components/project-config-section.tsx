import { useState } from "react";

import { ProjectConfig, Root } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ProjectConfigTree } from "./project-config-tree";

type ProjectConfigSectionProps = {
  roots: Root[] | undefined;
  config: ProjectConfig | undefined;
  onRootChange: (root: string) => void;
};

export function ProjectConfigSection({
  roots,
  config,
  onRootChange,
}: ProjectConfigSectionProps) {
  const [selectedRoot, setSelectedRoot] = useState<string | undefined>();

  const updateRoot = (root: string) => {
    setSelectedRoot(root);
    onRootChange(root);
  };

  return (
    <div>
      <div>
        <Select onValueChange={updateRoot}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a map to see layers" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {roots?.map((root) => (
                <SelectItem key={root.id} value={root.id}>
                  {root.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1">
        <ProjectConfigTree root={selectedRoot} layers={config?.layers} />
      </div>
    </div>
  );
}
