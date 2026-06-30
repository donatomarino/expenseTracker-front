import { useEffect, useState } from "react";
import type { AuthResponse, BaseApiResponse, FailedLoginPayload, LoginPayload } from "../../../types/types";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useLogin = () => {
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
  });

  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginPayload>({
    email: '',
    password: '',
    showPassword: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const res: AuthResponse | BaseApiResponse = await authService.login(formData);

      if (res.success && 'access_token' in res) {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('user_name', res.user_name);
        navigate('/');
      }

    } catch (e: FailedLoginPayload | any) {
      toast.error(e?.message || 'Error al iniciar sesión');
    }
  }

  return { formData, setFormData, handleChange, handleSubmit }
}

export default useLogin;