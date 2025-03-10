import { useState } from "react";
import { Tree } from "react-arborist";

import { LucideHexagon, LucideLayers } from "lucide-react";

import { LayerType } from "@/types";
import { Loading } from "@/components/loading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useProjectConfig } from "./use-project-config";

type ProjectConfigProps = {
  projectId: string | undefined;
};

export function ProjectConfig({ projectId }: ProjectConfigProps) {
  const [selectedRoot, setSelectedRoot] = useState<string | undefined>();

  const { projectConfig, layers, isLoading, onRootChange } = useProjectConfig({
    projectId,
  });

  const updateRoot = (root: string) => {
    setSelectedRoot(root);
    onRootChange(root);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col space-y-2 h-full">
      <div>
        <Select onValueChange={updateRoot}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a map to see layers" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {projectConfig?.map((root) => (
                <SelectItem key={root.id} value={root.id}>
                  {root.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1">
        <Tree
          key={selectedRoot}
          data={layers}
          // @ts-ignore
          childrenAccessor={(d) => {
            if (d.type === LayerType.Group) {
              return d.layers!;
            }
          }}
          openByDefault={false}
          width="100%"
          height={650}
        >
          {Node}
        </Tree>
      </div>
    </div>
  );
}

function Node({
  node,
  style,
  dragHandle,
}: {
  node: any;
  style: any;
  dragHandle?: any;
}) {
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    node.toggle();
  };

  return (
    <a
      ref={dragHandle}
      className="hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer"
      style={style}
      onClick={onClick}
    >
      <Icon node={node} />
      {node.data.name}
    </a>
  );
}

function Icon({ node }: { node: any }) {
  if (node.isLeaf) return <LucideHexagon className="inline pr-1" />;

  if (node.isInternal) {
    return <LucideLayers className="inline pr-1" />;
  }

  return null;
}
