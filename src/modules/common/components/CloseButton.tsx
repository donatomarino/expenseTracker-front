import type { CloseButtonProps } from "../../../types/types";

const CloseButton = ({...props}: CloseButtonProps) => (
  <button
    type="button"
    className="btn-close"
    aria-label="Close"
    {...props}
  />
)

export default CloseButton;