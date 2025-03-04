import { Tree } from "react-arborist";
import { useProjectConfig } from "./use-project-config";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loading } from "@/components/loading";
import { LucideBox, LucideHexagon, LucideLayers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MouseEventHandler } from "react";

type ProjectConfigProps = {
  projectId: string | undefined;
};

export function ProjectConfig({ projectId }: ProjectConfigProps) {
  const { projectConfig, layers, isLoading, onRootChange } = useProjectConfig({
    projectId,
  });

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col space-y-2">
      <div>
        <Select onValueChange={onRootChange}>
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
      <div>
        <Tree
          data={layers}
          // @ts-ignore
          childrenAccessor={(d) => {
            if (d.type === ".Group") {
              return d.layers!;
            }
          }}
          openByDefault={false}
          width="100%"
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
      className="hover:text-blue-500 cursor-pointer"
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
