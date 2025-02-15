import Axios from "axios";

import { IError } from "@/types";
import { dispatchError } from "@/lib/utils";

const axios = Axios.create({});

axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: IError) => {
    dispatchError(error);
    return Promise.reject(error);
  }
);

export default axios;
