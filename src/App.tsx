import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./modules/home/pages/Home"
import { LoadingProvider } from "./context/LoadingContext"
import Login from "./modules/login/pages/Login"
import { Bounce, ToastContainer } from "react-toastify"
import Register from "./modules/register/pages/Register"
import { SpendingProvider } from "./context/SpendingContext"
import { ThemeProvider, useTheme } from "./context/ThemeContext"

function AppContent() {
  const { theme } = useTheme();
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  return (
    <div className="app">
      <LoadingProvider>
        <SpendingProvider>
          <Router>
            <Routes>
              {isAuthenticated ? (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              ) : (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </>
              )}
            </Routes>
          </Router>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            theme={theme}
            transition={Bounce}
          />
        </SpendingProvider>
      </LoadingProvider>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
