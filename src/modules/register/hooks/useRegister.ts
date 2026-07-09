import { useContext, useState } from "react";
import type { RegisterErrors, RegisterPayload, Requests, Spending } from "../../../types/types";
import { LoadingContext } from "../../../context/LoadingContext";
import { toast } from "react-toastify";
import registerService from "../services/registerService";
import { useNavigate } from "react-router-dom";

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

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      disabledButton();
      return;
    }

    try {
      const res: Requests<Spending> = await registerService.register(formData);

      if (res.success) {
        toast.success("Account created successfully. Please log in.");
        setIsRegistered(prev => !prev);
      } else {
        toast.error("Error creating account. Please try again.");
      }

    } catch (e: any) {
      if (e.response && e.response.status === 422) {
        const errors = e.response.data.errors;
        disabledButton();
        setErrors(errors);
      } else {
        console.error("The request failed: ", e);
        disabledButton();
        toast.error("Server error");
      }
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
    handleSubmit
  }
}

export default useRegister;