import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Home from "./modules/home/pages/Home"
import { LoadButtonProvider } from "./context/LoadButtonContext"
import Login from "./modules/login/pages/Login"
import { Bounce, ToastContainer } from "react-toastify"

function App() {

  return (
    <div className="app">
      <LoadButtonProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </LoadButtonProvider>
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
