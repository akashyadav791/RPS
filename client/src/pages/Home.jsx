
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useOnlinePlayers } from '../hooks/useOnlinePlayers'
import { FaGamepad, FaTrophy, FaChartLine } from 'react-icons/fa'
import { IoSparkles } from 'react-icons/io5'
import AdBanner from '../components/AdBanner'

const Home = () => {
  const { currentUser } = useAuth()
  const { onlineCount, loading } = useOnlinePlayers()

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4">
            <span className="gradient-text">Rock Paper Scissors</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-2">
            The Ultimate Battle Arena
          </p>
          <div className="flex items-center justify-center space-x-2 text-purple-400">
            <IoSparkles className="text-2xl animate-pulse" />
            <span className="text-lg">Professional Edition</span>
            <IoSparkles className="text-2xl animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-slide-up">
          <div className="glass rounded-2xl p-8 hover:scale-105 transition-transform">
            <FaGamepad className="text-5xl text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Play Online</h3>
            <p className="text-gray-400">Challenge the AI and test your strategy</p>
          </div>
          
          <div className="glass rounded-2xl p-8 hover:scale-105 transition-transform">
            <FaTrophy className="text-5xl text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Leaderboard</h3>
            <p className="text-gray-400">Compete with players worldwide</p>
          </div>
          
          <div className="glass rounded-2xl p-8 hover:scale-105 transition-transform">
            <FaChartLine className="text-5xl text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Track Stats</h3>
            <p className="text-gray-400">Monitor your performance and improve</p>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center items-center">
          {currentUser ? (
            <>
              <Link
                to="/game"
                className="w-full sm:w-auto gradient-bg text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                Start Playing Now
              </Link>
              <Link
                to="/dashboard"
                className="w-full sm:w-auto glass text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                View Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="w-full sm:w-auto gradient-bg text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto glass text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        <div className="mt-16 text-gray-400 text-sm">
          <p>
            🔥 {loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              <span className="text-green-400 font-bold">{onlineCount.toLocaleString()}</span>
            )} players online
          </p>
        </div>

        {/* Google AdSense Banner */}
        <AdBanner slot="YOUR_AD_SLOT_ID" format="horizontal" />
      </div>
    </div>
  )
}

export default Home
