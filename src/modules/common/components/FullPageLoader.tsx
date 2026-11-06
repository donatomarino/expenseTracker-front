type FullPageLoaderProps = {
  loading: boolean;
  variant?: 'fullscreen' | 'inline';
};

const FullPageLoader = ({ loading, variant = 'fullscreen' }: FullPageLoaderProps) => {
  if (!loading) return null;

  if (variant === 'inline') {
    return (
      <div
        className="loading-overlay loading-overlay--inline d-flex flex-column justify-content-center align-items-center"
        role="status"
        style={{
          width: '100%',
          minHeight: '180px',
          borderRadius: '12px',
          padding: '1rem',
        }}
      >
        <span className="loading-spinner mb-2" aria-hidden="true" />
        <h6 className="mb-0">Cargando...</h6>
      </div>
    );
  }

  return (
    <div
      className="loading-overlay loading-overlay--fullscreen d-flex flex-column justify-content-center align-items-center"
      role="status"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <span className="loading-spinner loading-spinner--large mb-3" aria-hidden="true" />
      <h6>Cargando...</h6>
    </div>
  );
};

export default FullPageLoader;
