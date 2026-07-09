const Footer = () => {
  return (
    <footer className="bg-white d-flex justify-content-between align-items-center p-4 rounded-4 shadow-sm border">
      <div>
        <p className="text-secondary small mb-0 fw-medium">
          &copy; 2026 Expense Tracker
        </p>
      </div>

      <div>
        <p className="text-secondary small mb-0">
          Developed by <span className="fw-semibold text-dark">Donato Marino</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;