import Axios from "axios";
import { SERVER_URL } from "../config/constant";

const instance = Axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const credential = (token: string) =>
  Axios.create({
    baseURL: SERVER_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
    },
    withCredentials: true,
  });

export const axios = instance;
export const axiosCredential = credential;
