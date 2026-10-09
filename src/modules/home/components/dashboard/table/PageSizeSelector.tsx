import type { PageSizeSelectorProps } from "../../../../../types/types";
import { PAGE_SIZE_OPTIONS } from "../constants/pageSizeOptions";

export const PageSizeSelector = ({ pageSize, onChange, }: PageSizeSelectorProps) => (
  <div className="d-flex align-items-center gap-2">
    <label htmlFor="page-size-select" className="text-muted small mb-0">
      Items per page
    </label>

    <select
      id="page-size-select"
      className="form-select form-select-sm w-auto"
      value={pageSize}
      onChange={onChange}
      aria-label="Select page size"
    >
      {PAGE_SIZE_OPTIONS.map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
  </div>
);