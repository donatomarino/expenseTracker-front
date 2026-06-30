import type { Requests, Spending } from "../../../types/types";
import instanceAxios from '../../../api/APIUtils';

const contentService = {
  getSpending(): Promise<Requests<Spending[]>> {
    return instanceAxios.getRequest({ url: '/get-all-spendings' })
  },

  editSpending(data: Spending): Promise<Requests<Spending>> {
    return instanceAxios.putRequest({
      url: '/edit-spending',
      data: {
        id: data.id,
        description: data.description,
        amount: data.amount,
        date: data.date
      }
    })
  }
}

export default contentService;