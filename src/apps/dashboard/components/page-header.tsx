interface Props {
  title: string;
}

export function PageHeader({ title }: Props) {
  return <h1 className="text-4xl pb-4">{title}</h1>;
}
