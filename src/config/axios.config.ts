import axios, {
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError
} from "axios";
import { ENV } from "./constants/constants";

const baseURL = ENV.VITE_API_URL;

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

// Request interceptor
instance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  function (error: AxiosError): Promise<never> {
    return Promise.reject(error);
  }
);

// Answer interceptor
instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<never> => {
    const status = error.response?.status;
    const requestUrl = error.config?.url ?? "";

    if(status === 401 && !requestUrl.includes("/login")) {
      // Delete expired token
      localStorage.removeItem("token");
      localStorage.removeItem("user_name");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default instance;
