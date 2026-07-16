import loadingGif from '../../../assets/loading-gif.gif';

const FullPageLoader = (loading: boolean ) => {
    return (
        <>
            {loading ? (
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
            ) : null}
        </>
    );
};

export default FullPageLoader;
