import MonthYearNavigator from "./toolbar/MonthYearNavigator";
import PeriodSummary from "./toolbar/PeriodSummary";
import RangeAndFilters from "./toolbar/RangeAndFilters";
import "./styles/toolbar.css";

const Toolbar = () => {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 p-3 mb-4 bg-white rounded-4 shadow-sm border">
      {/* Summary period */}
      <PeriodSummary />

      {/* Navigator month/year */}
      <MonthYearNavigator />

      {/* Range and Filters */}
      <RangeAndFilters />
    </div>
  );
};

export default Toolbar;