import { Tree } from "react-arborist";

import { LucideHexagon, LucideLayers } from "lucide-react";

import { Layer, LayerType } from "@/types";

type ProjectConfigTreeProps = {
  root: string | undefined;
  layers: Layer[] | undefined;
};

function layersOrNull(data: Layer) {
  if (data.type === LayerType.Group) return data.layers;

  return null;
}

export function ProjectConfigTree({ root, layers }: ProjectConfigTreeProps) {
  return (
    <Tree
      width="100%"
      height={650}
      openByDefault={false}
      key={root}
      data={layers}
      // @ts-ignore
      childrenAccessor={layersOrNull}
    >
      {Node}
    </Tree>
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
