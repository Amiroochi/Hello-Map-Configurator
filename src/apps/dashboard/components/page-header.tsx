interface Props {
  title: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, actions }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-4xl pb-4">{title}</h1>
      {actions}
    </div>
  );
}
