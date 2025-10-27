import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Game from './pages/Game'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import Home from './pages/Home'
import MultiplayerRooms from './pages/MultiplayerRooms'
import MultiplayerGame from './pages/MultiplayerGame'
import LoadingSpinner from './components/LoadingSpinner'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth()
  
  if (loading) {
    return <LoadingSpinner />
  }
  
  return currentUser ? children : <Navigate to="/login" />
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-space-cadet via-raisin-black to-penn-red">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          }
        />
        <Route
          path="/multiplayer"
          element={
            <ProtectedRoute>
              <MultiplayerRooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/multiplayer/:roomId"
          element={
            <ProtectedRoute>
              <MultiplayerGame />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
