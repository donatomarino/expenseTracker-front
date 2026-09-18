import type { AxiosResponse } from "axios"
import type { RequestParams } from "../types/types"
import { authInstance, apiInstance } from "../config/axios.config";

export default {
  // getRequest: async<T>({
  //   url,
  //   params = {}
  // }: RequestParams): Promise<T> => {
  //   try {
  //     const res: AxiosResponse = await apiInstance.get(url, { params });
  //     return res.data;
  //   } catch (e: any) {
  //     return (e);
  //   }
  // },

  postRequest: async<T>({
    url,
    data = {},
    params = {},
    service = "api"
  }: RequestParams): Promise<T> => {
    try {
      const instance =
        service === "auth" ? authInstance : apiInstance;
      const res: AxiosResponse = await instance.post(url, data, { params });
      return res.data;
    } catch (e: any) {
      throw e;
    }
  },

  // putRequest: async<T>({
  //   url,
  //   data = {},
  //   params = {},
  // }: RequestParams): Promise<Requests<T>> => {
  //   try {
  //     const res: AxiosResponse = await apiInstance.put(url, data, { params });
  //     return res.data;
  //   } catch (e: any) {
  //     throw e;
  //   }
  // },

  // deleteRequest: async ({ url }: RequestParams): Promise<BaseApiResponse> => {
  //   try {
  //     const res: AxiosResponse = await apiInstance.delete(url);
  //     return res.data;
  //   } catch (e: any) {
  //     throw e;
  //   }
  // }
};
