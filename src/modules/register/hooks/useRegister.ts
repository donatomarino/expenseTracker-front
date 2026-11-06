import { useContext, useState } from "react";
import type { RegisterErrors, RegisterPayload, RegisterResponse } from "../../../types/types";
import { LoadingContext } from "../../../context/LoadingContext";
import { toast } from "react-toastify";
import registerService from "../services/registerService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoad } from "../../common/hooks/useLoad";

const useRegister = () => {
  const { loadButton, disabledButton } = useContext(LoadingContext);

  const [formData, setFormData] = useState<RegisterPayload>({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isRegistred, setIsRegistered] = useState<boolean>(false);
  const [errors, setErrors] = useState<RegisterErrors>({});

  // Spinner loader
  const { loading, startLoading, stopLoading } = useLoad();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    disabledButton();
    startLoading();
    setErrors({});

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      disabledButton();
      stopLoading();
      return;
    }

    try {
      const res: RegisterResponse = await registerService.register(formData);
      if (res.success) {
        toast.success("Account created successfully. Please log in.");
        setIsRegistered(prev => !prev);
      } else {
        toast.error("Error creating account. Please try again.");
      }

    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const status = e.response?.status;

        if (status === 400) {
          setErrors(e.response?.data);
          return;
        }

        if (status === 409) {
          toast.error(e.response?.data?.message);
          return;
        }

        console.error("The request failed: ", e);
        toast.error("Server error");
        return;
      }

      console.error("Unexpected error: ", e);
      toast.error("Unexpected error");
    } finally {
      disabledButton();
      stopLoading();
    }
  }
  return {
    loadButton,
    disabledButton,
    formData,
    isRegistred,
    errors,
    navigate,
    handleChange,
    handleSubmit,
    loading
  }
}

export default useRegister;