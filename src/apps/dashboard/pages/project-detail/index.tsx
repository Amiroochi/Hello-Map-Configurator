import { useParams } from "react-router";

import { ArrowRight } from "lucide-react";

import { Uploady } from "@rpldy/uploady";
import { asUploadButton, ButtonProps } from "@rpldy/upload-button";

import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ProjectConfig } from "./project-config";
import { NoConfig } from "../../components/no-config";
import { useProjectDetail } from "./use-project-detail";
import { PageHeader } from "../../components/page-header";
import { Input } from "@/components/ui/input";
import { forwardRef } from "react";
import { Label } from "@/components/ui/label";

export default function ProjectDetail() {
  const { projectId } = useParams();

  const { project, isLoading } = useProjectDetail({ projectId });

  return (
    <div className="flex flex-col space-y-2 h-full">
      <PageHeader title={project?.name!} actions={<Actions />} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-1">
            <div className="flex flex-col flex-1 border-4 rounded-l-md border-slate-200 dark:border-neutral-800">
              <div className="bg-slate-200 dark:bg-neutral-800 p-4">
                <h2 className="text-xl">Imported Project Configuration</h2>
              </div>
              <div className="px-4 py-2 flex flex-1 items-center justify-center">
                <NoConfig />
              </div>
            </div>
            <div className="flex items-center justify-center px-4 bg-slate-200 dark:bg-neutral-800">
              <Button
                variant="ghost"
                className="hover:bg-slate-100 dark:hover:bg-neutral-700"
              >
                <ArrowRight />
              </Button>
            </div>
            <div className="flex flex-col flex-1 border-4 rounded-r-md border-slate-200 dark:border-neutral-800">
              <div className="bg-slate-200 dark:bg-neutral-800 p-4">
                <h2 className="text-xl">Current Project Configuration</h2>
              </div>
              <div className="h-full px-4 py-2">
                <ProjectConfig projectId={projectId} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const Actions = () => {
  const { projectId } = useParams();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Upload or Import Config</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Upload Config</SheetTitle>
          <SheetDescription>Upload project config.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 p-4">
          <Uploady
            destination={{
              url: `/projects/${projectId}/config/upload`,
              method: "POST",
            }}
          >
            <CustomUploadButton />
          </Uploady>
          <hr />
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link">WMS Link</Label>
            <Input id="link" className="col-span-4" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const CustomUploadButton = asUploadButton(
  forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
    <Button {...props} style={{ cursor: "pointer" }} size="lg" ref={ref}>
      Upload
    </Button>
  ))
);
