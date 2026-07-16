import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import type { FormFieldProps } from "../../../types/types";
import FieldError from "./FieldError";
import Button from "./Button";

const FormField = (props: FormFieldProps) => {
  const {
    id,
    label,
    type,
    disabled,
    error,
    ...inputProps
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-semibold">
        {label}
      </label>

      <div className="position-relative">
        <input
          id={id}
          type={inputType}
          disabled={disabled}
          className="form-control form-control-lg bg-light border-0 shadow-sm"
          {...inputProps}
        />

        {type === "password" && (
          <Button
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            aria-pressed={showPassword}
            aria-controls={id}
            disabled={disabled}
            className="border-0 bg-transparent position-absolute top-50 end-0 translate-middle-y d-flex align-items-center justify-content-center text-muted"
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(prev => !prev);
            }}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </Button>
        )}
      </div>

      <FieldError error={error} />
    </div>
  )
}

export default FormField;