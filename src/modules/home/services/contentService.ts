import type { BaseApiResponse, Requests, Spending } from "../../../types/types";
import instanceAxios from '../../../api/APIUtils';

const contentService = {
  getSpending(): Promise<Requests<Spending[]>> {
    return instanceAxios.getRequest({ url: '/spendings' })
  },

  addSpending(data: Spending): Promise<Requests<Spending>> {
    return instanceAxios.postRequest({
      url: '/spendings',
      data: {
        description: data.description,
        amount: data.amount,
        date: data.date
      }
    })
  },

  editSpending(data: Spending): Promise<Requests<Spending>> {
    return instanceAxios.putRequest({
      url: '/spendings',
      data: {
        id: data.id,
        description: data.description,
        amount: data.amount,
        date: data.date
      }
    })
  },

  deleteSpending(id: number): Promise<BaseApiResponse> {
    return instanceAxios.deleteRequest({
      url: `/spendings/${id}`,
    })
  }
}

export default contentService;