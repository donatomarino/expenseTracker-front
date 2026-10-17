import { useSpending } from "../../hooks/useSpending";

const SummaryCards = () => {
  const { statistics } = useSpending();

  const totalSpent = statistics?.totalSpent ?? 0;
  const totalTransactions = statistics?.totalTransactions ?? 0;
  const average = statistics?.average ?? 0;

  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 mb-4">
      {/* Total spent */}
      <div className="flex-grow-1">
        <div className="card h-100 border-0 shadow-sm rounded-4 d-flex justify-content-center align-items-center justify-content-md-start align-items-md-start">
          <div className="card-body d-flex flex-column">
            <span className="text-muted text-uppercase small mb-1">Total spent</span>
            <h4 className="fw-bold mb-1">{totalSpent.toFixed(2) ?? 0} €</h4>
            <span className="text-muted small">In this period</span>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="flex-grow-1">
        <div className="card h-100 border-0 shadow-sm rounded-4">
          <div className="card-body d-flex flex-column justify-content-center align-items-center justify-content-md-start align-items-md-start">
            <span className="text-muted text-uppercase small mb-1">Transactions</span>
            <h4 className="fw-bold mb-1">{totalTransactions}</h4>
            <span className="text-muted small">Recorded expenses</span>
          </div>
        </div>
      </div>

      {/* Average */}
      <div className="flex-grow-1">
        <div className="card h-100 border-0 shadow-sm rounded-4 d-flex justify-content-center align-items-center justify-content-md-start align-items-md-start">
          <div className="card-body d-flex flex-column">
            <span className="text-muted text-uppercase small mb-1">Average</span>
            <h4 className="fw-bold mb-1">{average.toFixed(2)} €/day</h4>
            <span className="text-muted small">Daily spending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;