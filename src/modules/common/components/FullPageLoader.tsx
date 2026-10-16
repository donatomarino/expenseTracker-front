import loadingGif from '../../../assets/loading-gif.gif';

type FullPageLoaderProps = {
  loading: boolean;
  variant?: 'fullscreen' | 'inline';
};

const FullPageLoader = ({ loading, variant = 'fullscreen' }: FullPageLoaderProps) => {
  if (!loading) return null;

  if (variant === 'inline') {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          width: '100%',
          minHeight: '180px',
          backgroundColor: 'rgba(255,255,255,0.72)',
          borderRadius: '12px',
          padding: '1rem',
        }}
      >
        <img
          src={loadingGif}
          alt="Loading..."
          style={{
            width: '42px',
            height: '42px',
            marginBottom: '10px',
          }}
        />
        <h6 className="text-dark mb-0">Cargando...</h6>
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 1000,
      }}
    >
      <img
        src={loadingGif}
        alt="Loading..."
        style={{
          width: '60px',
          height: '60px',
          marginBottom: '20px'
        }}
      />
      <h6 className="text-dark">Cargando...</h6>
    </div>
  );
};

export default FullPageLoader;
