import useRangeAndDateFilters from "../../../hooks/useRangeAndDateFilters";
import Filters from "./components/Filters";
import Range from "./components/Range";

const RangeAndFilters = () => {
  const { toggleLast90Days, dateSearchMode, handleChange, applyFilters, resetFilters, draft } = useRangeAndDateFilters();

  return (
    <div className="range-and-filters d-flex align-items-stretch align-items-sm-center gap-2">
      {/* Quick range */}
      <Range
        dateSearchMode={dateSearchMode}
        toggleLast90Days={toggleLast90Days}
      />

      {/* Filters dropdown */}
      <Filters
        draft={draft}
        handleChange={handleChange}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
      />
    </div>
  );
};

export default RangeAndFilters;