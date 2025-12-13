import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { LoginReq, LoginRes } from "./type";
import AxiosApi from "../axios";

function useLogin() {
  const mutation = useMutation<LoginRes, AxiosError, LoginReq>({
    mutationFn: (body: LoginReq): Promise<LoginRes> => {
      return AxiosApi.post("/login", body).then((response) => response.data);
    },
  });

  return mutation;
}

export default useLogin;
