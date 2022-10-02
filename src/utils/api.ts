import { AxiosError } from "axios";
import { axios } from "../utils/axios";
import { InputSignIn } from "./types";

export const SignIn = async (input: InputSignIn) => {
  try {
    const res = await axios.post("/auth/signin", input);
    const result = await res.data;
    return result;
  } catch (err) {
    const error = err as AxiosError;
    const errorResult = {
      status: error.response?.status,
      data: error.response?.data,
    };
    throw errorResult;
  }
};

export const GetSession = async () => {
  const res = await axios.get("/auth/token");
  const result = await res.data;
  return result;
};
