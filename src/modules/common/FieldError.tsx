import type { FieldErrorProps } from "../../../../types/types";

const FieldError = ({ error }: FieldErrorProps) => {
  if (!error || error.length === 0) return null;

  return (
    <div className="mt-1">
      <span className="text-danger">{error[0]}</span>
    </div>
  );
};

export default FieldError;