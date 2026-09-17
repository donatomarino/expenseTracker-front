import type { EmptyStateProps } from "../../../../../types/types";

const EmptyState = (props: EmptyStateProps) => {
  const {
    title,
    description,
  } = props;

  return (
    <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center py-5">
      <h3 className="fw-bold mb-2">{title}</h3>
      <p className="text-muted mb-0" style={{ maxWidth: "520px" }}>
        {description}
      </p>
    </div>
  )
}

export default EmptyState;