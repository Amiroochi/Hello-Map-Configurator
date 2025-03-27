import { DeleteHandler, Tree } from "react-arborist";

import { LucideHexagon, LucideLayers, LucideTrash2 } from "lucide-react";

import { Layer, LayerType } from "@/types";
import { Button } from "@/components/ui/button";

type ProjectConfigTreeProps = {
  root: string | undefined;
  layers: Layer[] | undefined;
  onDelete?: DeleteHandler<Layer> | undefined;
};

function layersOrNull(data: Layer) {
  if (data.type === LayerType.Group) return data.layers;

  return null;
}

export function ProjectConfigTree({
  root,
  layers,
  onDelete,
}: ProjectConfigTreeProps) {
  return (
    <Tree
      width="100%"
      height={650}
      openByDefault={false}
      key={root}
      data={layers}
      onDelete={onDelete}
      // @ts-ignore
      childrenAccessor={layersOrNull}
    >
      {onDelete ? NodeWithDelete : Node}
    </Tree>
  );
}

function NodeWithDelete({
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

  const triggerBackspace = (node: any) => {
    const event = new KeyboardEvent("keydown", {
      key: "Backspace",
      code: "Backspace",
      keyCode: 8,
      charCode: 8,
      which: 8,
      bubbles: true,
      cancelable: true,
    });

    node.dispatchEvent(event);
  };

  return (
    <a
      ref={dragHandle}
      className="group hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer flex items-center"
      style={style}
      onClick={onClick}
    >
      <Icon node={node} />
      <div className="flex-1">{node.data.name}</div>
      <Button
        variant="ghost"
        className="hover:bg-transparent dark:hover:text-red-300 hover:text-red-500 invisible group-hover:visible"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          node.focus();
          triggerBackspace(document.activeElement);
        }}
      >
        <LucideTrash2 />
      </Button>
    </a>
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
