import { useState } from "react";
import type { Errors } from "../../../types/types";

const useFormErrors = () => {
  const [errors, setErrors] = useState<Errors>({});

  const clearErrors = () => setErrors({});

  return { errors, setErrors, clearErrors };
};

export default useFormErrors;