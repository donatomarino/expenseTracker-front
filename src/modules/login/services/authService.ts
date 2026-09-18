import type { AuthResponse, LoginPayload } from "../../../types/types";
import instanceAxios from '../../../api/APIUtils';

const authService = {
  login: (data: LoginPayload): Promise<AuthResponse> =>
    instanceAxios.postRequest({
      url: '/login',
      data: {
        email: data.email,
        password: data.password
      },
      service: "auth"
    })
}

export default authService;