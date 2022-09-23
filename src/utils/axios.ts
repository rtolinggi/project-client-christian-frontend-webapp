import Axios from "axios";
import {SERVER_URL} from "../config/constant";

const instance = Axios.create({
  baseURL: SERVER_URL,
  withCredentials:true,
  headers:{
    "Content-Type": "application/json"
  } 
})

export const axios = instance;