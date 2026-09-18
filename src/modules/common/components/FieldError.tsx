import type { FieldErrorProps } from "../../../types/types";

const FieldError = ({ error }: FieldErrorProps) => {
  if (!error) return null;

  const message = Array.isArray(error) ? error[0] : error;
  if (!message || message.length === 0) return null;

  return (
    <div className="mt-1">
      <span className="text-danger">{message}</span>
    </div>
  );
};

export default FieldError;