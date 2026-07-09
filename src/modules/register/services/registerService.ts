import type { RegisterPayload, Requests, Spending } from "../../../types/types";
import instanceAxios from '../../../api/APIUtils';

const registerService = {
  register: (data: RegisterPayload): Promise<Requests<Spending>> => 
   instanceAxios.postRequest({
      url: '/register',
      data: {
        full_name: data.full_name,
        email: data.email,
        password: data.password
      }
    })
}

export default registerService;