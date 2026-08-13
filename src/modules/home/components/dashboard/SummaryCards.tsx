const SummaryCards = () => {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-stretch gap-3 mb-4">
      {/* Total spent */}
      <div className="flex-grow-1">
        <div className="card h-100 border-0 shadow-sm rounded-4">
          <div className="card-body d-flex flex-column">
            <span className="text-muted text-uppercase small mb-1">Total spent</span>
            <h4 className="fw-bold mb-1">1.200 €</h4>
            <span className="text-muted small">In this period</span>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="flex-grow-1">
        <div className="card h-100 border-0 shadow-sm rounded-4">
          <div className="card-body d-flex flex-column">
            <span className="text-muted text-uppercase small mb-1">Transactions</span>
            <h4 className="fw-bold mb-1">24</h4>
            <span className="text-muted small">Recorded expenses</span>
          </div>
        </div>
      </div>

      {/* Average */}
      <div className="flex-grow-1">
        <div className="card h-100 border-0 shadow-sm rounded-4">
          <div className="card-body d-flex flex-column">
            <span className="text-muted text-uppercase small mb-1">Average</span>
            <h4 className="fw-bold mb-1">51 €/day</h4>
            <span className="text-muted small">Daily spending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;