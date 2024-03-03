import axios from "axios";

/** @type {import('axios').AxiosRequestConfig} */
const instanceConfig = {
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: false,
};
export const api = axios.create(instanceConfig);
