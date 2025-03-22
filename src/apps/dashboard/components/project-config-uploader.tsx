import { forwardRef, useMemo, useRef } from "react";

import { useQueryClient } from "@tanstack/react-query";
import Uploady, { UPLOADER_EVENTS } from "@rpldy/uploady";
import { asUploadButton, ButtonProps } from "@rpldy/upload-button";
import UploaderUrlInput, { UploadMethod } from "@rpldy/upload-url-input";

import { Button } from "@/components/ui/button";

import { projects } from "../query-keys";

type ProjectConfigUploaderProps = {
  projectId: string | undefined;
  closeSheet: () => void;
};

export function ProjectConfigFileUploader({
  projectId,
  closeSheet,
}: ProjectConfigUploaderProps) {
  const queryClient = useQueryClient();

  const listeners = useMemo(
    () => ({
      [UPLOADER_EVENTS.ITEM_FINISH]: (item: any) => {
        queryClient.setQueryData(
          [projects.readUploadedProjectConfig, projectId],
          JSON.parse(item.uploadResponse.data)
        );
        closeSheet();
      },
    }),
    []
  );

  return (
    <Uploady
      destination={{
        url: `/projects/${projectId}/config/upload`,
        method: "POST",
      }}
      listeners={listeners}
    >
      <CustomUploadButton />
    </Uploady>
  );
}

export function ProjectConfigUrlUploader({
  projectId,
  closeSheet,
}: ProjectConfigUploaderProps) {
  const uploadRef = useRef<UploadMethod>(() => {});

  const onUpload = () => {
    if (uploadRef && uploadRef.current) {
      uploadRef.current();
      closeSheet();
    }
  };

  return (
    <Uploady destination={{ url: `/projects/${projectId}/config/import` }}>
      <UploaderUrlInput
        id="wms-link"
        placeholder="WMS link"
        className="border-1 py-2 px-4 rounded-md dark:border-neutral-300"
        uploadRef={uploadRef}
      />
      <Button onClick={onUpload} size="lg">
        Upload
      </Button>
    </Uploady>
  );
}

const CustomUploadButton = asUploadButton(
  forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
    <Button {...props} size="lg" ref={ref}>
      Upload
    </Button>
  ))
);
