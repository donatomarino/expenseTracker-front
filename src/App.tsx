import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Home from "./modules/home/pages/Home"
import { LoadButtonProvider } from "./context/LoadButtonContext"

function App() {

  return (
    <div className="app">
      <LoadButtonProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </LoadButtonProvider>
    </div>
  )
}

export default App
