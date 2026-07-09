import { useContext, useEffect, useState } from "react";
import type { AuthResponse, BaseApiResponse, LoginPayload } from "../../../types/types";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingContext } from "../../../context/LoadingContext";

const useLogin = () => {
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');

    if(loadButton) {
      disabledButton();
    }    
  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginPayload>({
    email: '',
    password: '',
    showPassword: false
  });

  const {loadButton, disabledButton} = useContext(LoadingContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      disabledButton();
      const res: AuthResponse | BaseApiResponse = await authService.login(formData);

      if (res.success && 'access_token' in res) {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('user_name', res.user_name);
        navigate('/');
      }

    } catch (e: any) {
      toast.error(e?.message || 'Error al iniciar sesión');
    } finally {
      disabledButton();
    }
  }

  return { formData, handleChange, handleSubmit, loadButton };
}

export default useLogin;