import type { ButtonProps, ButtonVariant } from "../../../types/types";

const Button = ({
  type = "button",
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) => {
  const base = "btn rounded-pill py-2";
  const map: Record<ButtonVariant, string> = {
    primary: "btn-primary",
    outlinePrimary: "btn-outline-primary",
    secondary: "btn-outline-secondary",
    danger: "btn-danger",
    outlineDanger: "btn-outline-danger",
    light: "btn-light"
  };

  const classes = `${base} ${map[variant]} ${className ?? ""}`;

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;