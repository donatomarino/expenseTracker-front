import { useSpendingContext } from "../../../../../context/SpendingContext";

const PeriodSummary = () => {
  const { year, month } = useSpendingContext();
  return (
    <div className="d-flex flex-column">
      <span className="text-muted text-uppercase small">Current period</span>
      <p className="fw-bold text-dark mb-0">{month.charAt(0).toLocaleUpperCase() + month.slice(1)} {year}</p>
    </div>
  )
}

export default PeriodSummary;