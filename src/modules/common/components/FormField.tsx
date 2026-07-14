import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import type { FormFieldProps } from "../../../types/types";
import FieldError from "./FieldError";

const FormField = (props: FormFieldProps) => {
  const {
    id,
    label,
    type,
    value,
    onChange,
    placeholder,
    name,
    disabled,
    error
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-semibold">
        {label}
      </label>

      {type === "password" ? (
        <>
          <div className="position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control form-control-lg bg-light border-0 shadow-sm"
              name={name}
              id={id}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              disabled={disabled}
            />

            <button
              type="button"
              className="border-0 bg-transparent position-absolute top-50 end-0 translate-middle-y me-2 d-flex align-items-center justify-content-center text-muted"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(prev => !prev);;
              }}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>

          </div>
          <FieldError error={error} />
        </>
      ) : (
        <div>
          <input
            type={type}
            id={id}
            className="form-control form-control-lg  bg-light border-0 shadow-sm"
            value={value}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
          />

          <FieldError error={error} />
        </div>
      )}
    </div>
  );
}

export default FormField;