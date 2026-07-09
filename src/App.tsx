import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Home from "./modules/home/pages/Home"
import { LoadingProvider } from "./context/LoadingContext"
import Login from "./modules/login/pages/Login"
import { Bounce, ToastContainer } from "react-toastify"
import Register from "./modules/register/pages/Register"

function App() {

  return (
    <div className="app">
      <LoadingProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </LoadingProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        theme="dark"
        transition={Bounce}
      />
    </div>
  )
}

export default App
