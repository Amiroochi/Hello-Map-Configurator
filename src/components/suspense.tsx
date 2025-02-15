import { Suspense as ReactSuspense, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export function Suspense({ children }: IProps) {
  return <ReactSuspense fallback={<>Loading...</>}>{children}</ReactSuspense>;
}
