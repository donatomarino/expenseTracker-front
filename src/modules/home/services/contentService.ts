import type { Spending, SpendingRequest, GetSpendingResponse, CreateSpendingRequest} from "../../../types/types";
import instanceAxios from '../../../api/APIUtils';

const contentService = {
    getSpending: async (
    params: SpendingRequest = {}
  ): Promise<GetSpendingResponse> => {
    return instanceAxios.getRequest<GetSpendingResponse>({
      url: "/spendings",
      params,
    });
  },

  addSpending(data: CreateSpendingRequest): Promise<Spending> {
    return instanceAxios.postRequest({
      url: '/spendings',
      data: {
        description: data.description,
        amount: data.amount,
        date: data.date,
        paymentMethod: data.paymentMethod
      }
    })
  },

  editSpending(data: Spending): Promise<Spending> {
    return instanceAxios.putRequest({
      url: `/spendings/${data.id}`,
      data: {
        description: data.description,
        amount: data.amount,
        date: data.date,
        paymentMethod: data.paymentMethod
      }
    })
  },

  deleteSpending(id: number): Promise<void> {
    return instanceAxios.deleteRequest({
      url: `/spendings/${id}`,
    })
  }
}

export default contentService;