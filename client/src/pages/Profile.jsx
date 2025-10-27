
import { useAuth } from '../contexts/AuthContext'
import { FaUser, FaEnvelope, FaCalendar, FaTrophy, FaGamepad } from 'react-icons/fa'
import StatCard from '../components/StatCard'

const Profile = () => {
  const { currentUser, userStats } = useAuth()

  const stats = userStats || {
    totalGames: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    winStreak: 0,
    bestStreak: 0
  }

  const winRate = stats.totalGames > 0 
    ? ((stats.wins / stats.totalGames) * 100).toFixed(1) 
    : 0

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A'
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] p-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold gradient-text mb-2">Profile</h1>
          <p className="text-gray-400 text-lg">View your gaming profile and achievements</p>
        </div>

        {/* Profile Card */}
        <div className="glass rounded-2xl p-8 mb-8 animate-slide-up">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-5xl">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FaUser className="text-white" />
              )}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">
                {currentUser?.displayName || 'Anonymous Player'}
              </h2>
              
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <FaEnvelope />
                  <span>{currentUser?.email}</span>
                </div>
                
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <FaCalendar />
                  <span>Joined {formatDate(currentUser?.metadata?.creationTime)}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-400 text-sm font-semibold">
                  Level {Math.floor(stats.totalGames / 10) + 1}
                </span>
                {stats.bestStreak >= 5 && (
                  <span className="px-4 py-2 bg-orange-500/20 rounded-full text-orange-400 text-sm font-semibold">
                    🔥 Streak Master
                  </span>
                )}
                {stats.wins >= 50 && (
                  <span className="px-4 py-2 bg-yellow-500/20 rounded-full text-yellow-400 text-sm font-semibold">
                    🏆 Champion
                  </span>
                )}
                {stats.totalGames >= 100 && (
                  <span className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-400 text-sm font-semibold">
                    ⭐ Veteran
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-slide-up">
          <StatCard
            icon={<FaGamepad />}
            label="Total Games"
            value={stats.totalGames}
            color="purple"
          />
          <StatCard
            icon={<FaTrophy />}
            label="Total Wins"
            value={stats.wins}
            color="green"
          />
          <StatCard
            icon={<FaGamepad />}
            label="Win Rate"
            value={`${winRate}%`}
            color="blue"
          />
        </div>

        {/* Detailed Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">
          <div className="glass rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Career Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-400">Total Games Played</span>
                <span className="text-white font-bold text-xl">{stats.totalGames}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-400">Games Won</span>
                <span className="text-green-400 font-bold text-xl">{stats.wins}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-400">Games Lost</span>
                <span className="text-red-400 font-bold text-xl">{stats.losses}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-400">Games Drawn</span>
                <span className="text-yellow-400 font-bold text-xl">{stats.draws}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Win Rate</span>
                <span className="text-purple-400 font-bold text-xl">{winRate}%</span>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Achievements</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-400">Current Win Streak</span>
                <span className="text-orange-400 font-bold text-xl">🔥 {stats.winStreak}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-400">Best Win Streak</span>
                <span className="text-orange-400 font-bold text-xl">⭐ {stats.bestStreak}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-gray-400">Player Level</span>
                <span className="text-purple-400 font-bold text-xl">
                  Level {Math.floor(stats.totalGames / 10) + 1}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Next Level Progress</span>
                <span className="text-blue-400 font-bold text-xl">
                  {stats.totalGames % 10}/10
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.totalGames % 10) * 10}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
