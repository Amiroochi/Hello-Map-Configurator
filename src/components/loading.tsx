import { LucideLoaderCircle } from "lucide-react";

export function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center self-center h-full">
      <LucideLoaderCircle className="w-10 h-10 animate-spin" />
    </div>
  );
}
