import { BrowserRouter, Route, Routes } from "react-router-dom"
import Assessment from './pages/Assessment'
import LandingPage from "./pages/LandingPage"
import Login from './pages/Login'
import Home from "./pages/Home"
import VideoRecord from "./pages/VideoRecord"
import RecordPage from "./pages/RecordPage"
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/assesment" element={<Assessment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/RecordPage" element={<RecordPage />} />
          <Route path="/VideoRecord" element={<VideoRecord />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App