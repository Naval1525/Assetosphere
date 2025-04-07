import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/shared/Navbar'

import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
