import { useMutation } from "@tanstack/react-query";

import axios from "@/lib/axios";

type Params = {
  projectId: string;
};

type Response = {};

function uploadProjectConfig({ projectId }: Params): Promise<Response[]> {
  return axios.post(`/projects/${projectId}/config/upload`);
}

export function useUploadProjectConfig() {
  return useMutation({
    mutationFn: uploadProjectConfig,
  });
}
