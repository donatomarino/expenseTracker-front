import type { RangeProps } from "../../../../../../types/types";
import Button from "../../../../../common/components/Button";

const Range = ({
  dateSearchMode,
  toggleLast90Days
}: RangeProps) => {
  return (
    <Button
      variant={dateSearchMode === "last90Days" ? "primary" : "light"}
      className="range-button px-3 d-flex align-items-center justify-content-center gap-2"
      onClick={() => toggleLast90Days()}
    >
      <i className="bi bi-calendar3" aria-hidden="true"></i>
      <span>Last 90 days</span>
    </Button>
  )
}

export default Range;