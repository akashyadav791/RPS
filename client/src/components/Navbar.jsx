import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'react-toastify'
import { FaGamepad, FaTrophy, FaUser, FaSignOutAlt, FaUsers, FaBars, FaTimes } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'
import { useState } from 'react'

const Navbar = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      navigate('/login')
      setIsMobileMenuOpen(false)
    } catch (error) {
      toast.error('Failed to log out')
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="glass sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
              <FaGamepad className="text-lg sm:text-xl text-sunset" />
              <span className="text-sm sm:text-lg font-bold gradient-text">RPS Pro</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-gray-300 hover:text-sunset transition-colors px-3 py-2"
                >
                  <MdDashboard className="text-lg" />
                  <span className="text-sm">Dashboard</span>
                </Link>
                <Link
                  to="/game"
                  className="flex items-center space-x-2 text-gray-300 hover:text-sunset transition-colors px-3 py-2"
                >
                  <FaGamepad className="text-lg" />
                  <span className="text-sm">Solo</span>
                </Link>
                <Link
                  to="/multiplayer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-sunset transition-colors px-3 py-2"
                >
                  <FaUsers className="text-lg" />
                  <span className="text-sm">Multiplayer</span>
                </Link>
                <Link
                  to="/leaderboard"
                  className="flex items-center space-x-2 text-gray-300 hover:text-sunset transition-colors px-3 py-2"
                >
                  <FaTrophy className="text-lg" />
                  <span className="text-sm">Leaderboard</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-300 hover:text-sunset transition-colors px-3 py-2"
                >
                  <FaUser className="text-lg" />
                  <span className="text-sm truncate max-w-[100px]">{currentUser.displayName || 'Profile'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-300 hover:text-penn-red transition-colors px-3 py-2"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span className="text-sm">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-sunset transition-colors px-4 py-2 text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="gradient-bg text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-floral-white text-xl focus:outline-none hover:text-sunset transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>

    {/* Mobile Menu - Outside navbar for proper z-index */}
    {isMobileMenuOpen && (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] lg:hidden"
          onClick={closeMobileMenu}
        />
        
        {/* Slide Menu */}
        <div className="fixed top-0 left-0 h-full w-72 glass-dark z-[70] lg:hidden animate-slide-in shadow-2xl overflow-y-auto">
          <div className="p-4">
            {/* Close Button */}
            <button
              onClick={closeMobileMenu}
              className="absolute top-3 right-3 text-floral-white text-xl hover:text-penn-red transition-colors p-2 rounded-lg hover:bg-white/10"
              aria-label="Close menu"
            >
              <FaTimes />
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-2 mb-6 pt-1">
              <FaGamepad className="text-xl text-sunset" />
              <span className="text-lg font-bold gradient-text">RPS Pro</span>
            </div>

            {currentUser ? (
              <div className="flex flex-col space-y-2">
                {/* User Info */}
                <div className="glass-light rounded-lg p-3 mb-2">
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-sunset text-sm" />
                    <span className="text-white text-sm font-medium truncate">{currentUser.displayName || 'Player'}</span>
                  </div>
                </div>

                <Link
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 text-gray-300 hover:text-sunset transition-colors p-2.5 rounded-lg hover:bg-white/5 active:bg-white/10"
                >
                  <MdDashboard className="text-lg flex-shrink-0" />
                  <span className="text-sm">Dashboard</span>
                </Link>
                <Link
                  to="/game"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 text-gray-300 hover:text-sunset transition-colors p-2.5 rounded-lg hover:bg-white/5 active:bg-white/10"
                >
                  <FaGamepad className="text-lg flex-shrink-0" />
                  <span className="text-sm">Solo Game</span>
                </Link>
                <Link
                  to="/multiplayer"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 text-gray-300 hover:text-sunset transition-colors p-2.5 rounded-lg hover:bg-white/5 active:bg-white/10"
                >
                  <FaUsers className="text-lg flex-shrink-0" />
                  <span className="text-sm">Multiplayer</span>
                </Link>
                <Link
                  to="/leaderboard"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 text-gray-300 hover:text-sunset transition-colors p-2.5 rounded-lg hover:bg-white/5 active:bg-white/10"
                >
                  <FaTrophy className="text-lg flex-shrink-0" />
                  <span className="text-sm">Leaderboard</span>
                </Link>
                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 text-gray-300 hover:text-sunset transition-colors p-2.5 rounded-lg hover:bg-white/5 active:bg-white/10"
                >
                  <FaUser className="text-lg flex-shrink-0" />
                  <span className="text-sm">My Profile</span>
                </Link>
                
                <hr className="border-white/10 my-3" />
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 text-gray-300 hover:text-penn-red transition-colors p-2.5 rounded-lg hover:bg-white/5 active:bg-white/10 text-left w-full"
                >
                  <FaSignOutAlt className="text-lg flex-shrink-0" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="text-gray-300 hover:text-sunset transition-colors p-3 rounded-lg hover:bg-white/5 active:bg-white/10 text-center text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="gradient-bg text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all text-center text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </>
    )}
    </>
  )
}

export default Navbar
