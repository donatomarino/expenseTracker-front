import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = () => {
  return (
    <header className="d-flex justify-content-between align-items-center bg-white p-4 rounded-4 shadow-sm border">
      <div>
        <p className="text-uppercase text-secondary fw-semibold small mb-1">
          Dashboard
        </p>
        <h1 className="h3 fw-bold text-dark mb-0">
          Hey, Donato!
        </h1>
      </div>

      <button type="button" className="btn btn-primary btn-lg rounded-pill px-4 shadow-sm">
        <i className="bi bi-file-plus me-2"></i>
        Add spending
      </button>
    </header>
  );
};

export default Header;