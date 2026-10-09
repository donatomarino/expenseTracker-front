import { useSpendingContext } from "../../../../../context/SpendingContext";

const PeriodSummary = () => {
  const { year, month, dateSearchMode } = useSpendingContext();

  return (
    <div className="period-summary d-flex flex-column">
      <span className="text-muted text-uppercase small">Current period</span>
      <p className="fw-bold text-dark mb-0">
        {dateSearchMode === "last90Days"
          ? "Last 90 Days"
          : `${month.charAt(0).toLocaleUpperCase() + month.slice(1)} ${year}`}
      </p>
    </div>
  );
};

export default PeriodSummary;