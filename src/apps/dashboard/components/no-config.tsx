import { LucideSettings2 } from "lucide-react";

export function NoConfig() {
  return (
    <div className="flex flex-1 items-center justify-center self-center h-full">
      <div className="flex flex-col items-center">
        <div><LucideSettings2 size={48} /></div>
        <h1>No Config</h1>
        <p>There is no config available</p>
      </div>
    </div>
  )
}