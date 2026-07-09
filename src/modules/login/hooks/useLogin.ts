import { useContext, useEffect, useState } from "react";
import type { AuthResponse, BaseApiResponse, LoginPayload, RegisterErrors } from "../../../types/types";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingContext } from "../../../context/LoadingContext";
import { useLoad } from "../../common/hooks/useLoad";
import axios from "axios";

const useLogin = () => {
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');

    if (loadButton) {
      disabledButton();
    }
  }, []);

  // Navigate
  const navigate = useNavigate();

  // User datas 
  const [formData, setFormData] = useState<LoginPayload>({
    email: '',
    password: '',
    showPassword: false
  });

  // Spinner loader
  const { loading, startLoading, stopLoading } = useLoad();

  // Errores
  const [errors, setErrors] = useState<RegisterErrors>({});

  // Disabled buttons
  const { loadButton, disabledButton } = useContext(LoadingContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    disabledButton();
    startLoading();

    if (errors) setErrors({});

    try {
      const res: AuthResponse | BaseApiResponse = await authService.login(formData);

      if (res.success && 'access_token' in res) {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('user_name', res.user_name);
        navigate('/');
      }

    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const status = e.response?.status;

        if (status === 422) {
          setErrors(e.response?.data?.errors);
          return;
        } 

        if (status === 401) {
          toast.error(e.response?.data?.message);
          return;
        }

        console.error("The request failed: ", e);
        toast.error("Server error");
      }

      console.error("Unexpected error: ", e);
      toast.error("Unexpected error");
      return;
    } finally {
      disabledButton();
      stopLoading();
    }
  }

  return { formData, handleChange, handleSubmit, loadButton, loading, errors };
}

export default useLogin;