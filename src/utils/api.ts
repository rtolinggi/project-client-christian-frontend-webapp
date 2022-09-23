import {axios} from "../utils/axios";
import {InputSignIn} from "./types";

export const SignIn = async(input: InputSignIn) => {
  const response = await axios.post("/auth/signin",input)
  return response;
}

export const GetSession = async() => {
  const response = await axios.get("/user");
  return response;
}