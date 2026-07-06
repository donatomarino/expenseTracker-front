import type { AxiosResponse } from "axios"
import type { RequestParams, Requests, BaseApiResponse } from "../types/types"
import instance from "../config/axios.config";

export default {
  getRequest: async<T>({
    url,
    params = {}
  }: RequestParams): Promise<T> => {
    try {
      const res: AxiosResponse = await instance.get(url, { params });
      return res.data;
    } catch (e: any) {
      return (e);
    }
  },

  postRequest: async<T>({
    url,
    data = {},
    params = {}
  }: RequestParams): Promise<Requests<T>> => {
    try {
      const headers = { "Content-Type": "application/json" };
      const res: AxiosResponse = await instance.post(url, data, { params, headers });
      return res.data;
    } catch (e: any) {
      throw e;
    }
  },

  putRequest: async<T>({
    url,
    data = {},
    params = {},
  }: RequestParams): Promise<Requests<T>> => {
    try {
      const headers = { "Content-Type": "application/json" };
      const res: AxiosResponse = await instance.put(url, data, { params, headers });
      return res.data;
    } catch (e: any) {
      throw e;
    }
  },

  deleteRequest: async ({ url }: RequestParams): Promise<BaseApiResponse> => {
    try {
      const res: AxiosResponse = await instance.delete(url);
      return res.data;
    } catch (e: any) {
      throw e;
    }
  }
};
