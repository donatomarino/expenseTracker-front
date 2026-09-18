import { useContext, useState } from "react";
import type { AuthResponse, LoginPayload, RegisterErrors } from "../../../types/types";
import authService from "../services/authService";
import { toast } from "react-toastify";
import { LoadingContext } from "../../../context/LoadingContext";
import { useLoad } from "../../common/hooks/useLoad";
import axios from "axios";

const useLogin = () => {
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
      const res: AuthResponse = await authService.login(formData);

      if ('access_token' in res) {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('name', res.user_name);
        window.location.replace("/");
      }

    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const status = e.response?.status;

        if (status === 401) {
          toast.error(e.response?.data?.message);
          return;
        }

        if (status === 400) {
          setErrors(e.response?.data);
          return;
        }

        console.error("The request failed: ", e);
        toast.error("Server error");
        return;
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