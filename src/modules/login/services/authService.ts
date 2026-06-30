import type { AuthResponse, BaseApiResponse, LoginPayload } from "../../../types/types";
import instanceAxios from '../../../api/APIUtils';

const authService = {
  login: (data: LoginPayload): Promise<AuthResponse | BaseApiResponse> =>
    instanceAxios.postRequest({
      url: '/login',
      data: {
        email: data.email,
        password: data.password
      }
    })
}

export default authService;