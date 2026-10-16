import type { EmptyStateProps } from "../../../../../types/types";
import FullPageLoader from "../../../../common/components/FullPageLoader";

const EmptyState = ({ loading, variant = "table" }: EmptyStateProps) => {
  if (variant === "card") {
    return (
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body text-center py-5 px-4">
          {loading ? (
            <FullPageLoader loading={loading} variant="inline" />
          ) : (
            <>
              <div className="mb-2 fs-3">💸</div>
              <h6 className="fw-semibold text-dark mb-1">No expenses found</h6>
              <p className="text-muted small mb-0">Try changing the filters or add a new expense.</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <tr>
      <td colSpan={5} className="text-center py-5 text-muted position-relative">
        {loading ? (
          <FullPageLoader loading={loading} variant="inline" />
        ) : (
          "No expenses found."
        )}
      </td>
    </tr>
  );
};

export default EmptyState;