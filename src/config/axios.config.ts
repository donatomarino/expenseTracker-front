import axios, {
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError
} from "axios";
import { ENV } from "./constants/constants";

const baseURL = ENV.VITE_API_URL;
const authURL = ENV.VITE_AUTH_URL;

const commonConfig = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
};

const apiInstance = axios.create({
  baseURL,
  ...commonConfig
});

const authInstance = axios.create({
  baseURL: authURL,
  ...commonConfig
});

/** Clear user session data */
const clearSession = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
}

/** Redirect to Login if not already on login page */
const redirectToLogin = (): void => {
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
}

// Request interceptor API principal
apiInstance.interceptors.request.use(
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

// Answer interceptor API principal
apiInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<never> => {
    const status = error.response?.status;
    const requestUrl = error.config?.url ?? "";

    const isAuthRequest =
      requestUrl.includes("/login") || requestUrl.includes("/register");

    if (status === 401 && !isAuthRequest) {
      clearSession();
      redirectToLogin();
    }

    return Promise.reject(error);
  }
);

//** Answer interceptor auth */
authInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<never> => {
    return Promise.reject(error);
  }
);

export { apiInstance, authInstance };