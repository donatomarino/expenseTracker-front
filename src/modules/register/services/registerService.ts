import type { RegisterPayload, RegisterResponse } from "../../../types/types";
import instanceAxios from '../../../api/APIUtils';

const registerService = {
  register: (data: RegisterPayload): Promise<RegisterResponse> => 
   instanceAxios.postRequest({
      url: '/register',
      data: {
        full_name: data.full_name,
        email: data.email,
        password: data.password
      },
      service: "auth"
    })
}

export default registerService;