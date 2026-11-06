// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import App from './App.tsx'

const setViewportHeight = () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
}

setViewportHeight()
window.addEventListener('resize', setViewportHeight)

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  // </StrictMode>,
    <App />
)
