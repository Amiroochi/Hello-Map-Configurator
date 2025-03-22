import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  ProjectConfigFileUploader,
  ProjectConfigUrlUploader,
} from "./project-config-uploader";

type ProjectConfigSheetProps = {
  projectId: string | undefined;
};

export function ProjectConfigSheet({ projectId }: ProjectConfigSheetProps) {
  const [open, setOpen] = useState(false);

  const openSheet = () => setOpen(true);

  const closeSheet = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" onClick={openSheet}>
          Upload / Import Config
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Upload / Import Config</SheetTitle>
          <SheetDescription>
            You can upload a new QGIS file, or alternatively, import it using a
            WMS link.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex-1 flex flex-col space-y-2 w-full p-4 bg-neutral-100 dark:bg-neutral-900">
            <p>Select a QGIS file that contains the project configuration.</p>
            <ProjectConfigFileUploader projectId={projectId} closeSheet={closeSheet} />
          </div>
          <div className="flex-1 flex flex-col space-y-2 w-full p-4 bg-neutral-100 dark:bg-neutral-900">
            <p>
              Alternatively, you can import the project config using a WMS link.
            </p>
            <ProjectConfigUrlUploader projectId={projectId} closeSheet={closeSheet}/>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
