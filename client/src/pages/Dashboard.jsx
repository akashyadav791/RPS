import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import { FaTrophy, FaGamepad, FaFire, FaChartLine } from 'react-icons/fa'
import { GiPodium } from 'react-icons/gi'
import { useGameHistory } from '../hooks/useGameHistory'

const Dashboard = () => {
  const { currentUser, userStats } = useAuth()
  const { history, loading } = useGameHistory()

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

  return (
    <div className="min-h-[calc(100vh-3.5rem)] p-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
            Welcome back, {currentUser?.displayName || 'Player'}!
          </h1>
          <p className="text-gray-400 text-lg">Here's your gaming dashboard</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 animate-slide-up">
          <Link
            to="/game"
            className="glass rounded-xl p-6 hover:scale-105 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Start Playing</h3>
                <p className="text-gray-400">Jump into a quick match</p>
              </div>
              <FaGamepad className="text-5xl text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
          </Link>
          
          <Link
            to="/leaderboard"
            className="glass rounded-xl p-6 hover:scale-105 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Leaderboard</h3>
                <p className="text-gray-400">See top players</p>
              </div>
              <GiPodium className="text-5xl text-yellow-400 group-hover:scale-110 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
          <StatCard
            icon={<FaGamepad />}
            label="Total Games"
            value={stats.totalGames}
            color="purple"
          />
          <StatCard
            icon={<FaTrophy />}
            label="Wins"
            value={stats.wins}
            color="green"
          />
          <StatCard
            icon={<FaFire />}
            label="Win Streak"
            value={stats.winStreak}
            color="red"
          />
          <StatCard
            icon={<FaChartLine />}
            label="Win Rate"
            value={`${winRate}%`}
            color="blue"
          />
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-slide-up">
          <div className="glass rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Performance</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Wins</span>
                <span className="text-green-400 font-bold">{stats.wins}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Losses</span>
                <span className="text-red-400 font-bold">{stats.losses}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Draws</span>
                <span className="text-yellow-400 font-bold">{stats.draws}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Best Streak</span>
                <span className="text-purple-400 font-bold">{stats.bestStreak}</span>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Win Distribution</h3>
            <div className="space-y-3">
              {/* Win Bar */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400 text-sm">Wins</span>
                  <span className="text-green-400 text-sm font-semibold">
                    {stats.totalGames > 0 ? ((stats.wins / stats.totalGames) * 100).toFixed(1) : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${stats.totalGames > 0 ? (stats.wins / stats.totalGames) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Loss Bar */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400 text-sm">Losses</span>
                  <span className="text-red-400 text-sm font-semibold">
                    {stats.totalGames > 0 ? ((stats.losses / stats.totalGames) * 100).toFixed(1) : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${stats.totalGames > 0 ? (stats.losses / stats.totalGames) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Draw Bar */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400 text-sm">Draws</span>
                  <span className="text-yellow-400 text-sm font-semibold">
                    {stats.totalGames > 0 ? ((stats.draws / stats.totalGames) * 100).toFixed(1) : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${stats.totalGames > 0 ? (stats.draws / stats.totalGames) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Games */}
        <div className="glass rounded-xl p-6 animate-slide-up">
          <h3 className="text-2xl font-bold text-white mb-4">Recent Games</h3>
          {loading ? (
            <p className="text-gray-400 text-center py-8">Loading...</p>
          ) : history && history.length > 0 ? (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {history.slice(0, 10).map((game, index) => (
                <div
                  key={index}
                  className={`
                    flex items-center justify-between p-4 rounded-lg
                    ${game.result === 'win' ? 'bg-green-500/10 border-l-4 border-green-500' : ''}
                    ${game.result === 'lose' ? 'bg-red-500/10 border-l-4 border-red-500' : ''}
                    ${game.result === 'draw' ? 'bg-yellow-500/10 border-l-4 border-yellow-500' : ''}
                  `}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">
                      {game.userChoice === 'rock' ? '✊' : game.userChoice === 'paper' ? '✋' : '✌️'}
                    </span>
                    <span className="text-gray-400">vs</span>
                    <span className="text-3xl">
                      {game.computerChoice === 'rock' ? '✊' : game.computerChoice === 'paper' ? '✋' : '✌️'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`
                      font-semibold uppercase text-sm block
                      ${game.result === 'win' ? 'text-green-400' : ''}
                      ${game.result === 'lose' ? 'text-red-400' : ''}
                      ${game.result === 'draw' ? 'text-yellow-400' : ''}
                    `}>
                      {game.result}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {new Date(game.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaGamepad className="text-6xl text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">No games played yet</p>
              <Link
                to="/game"
                className="gradient-bg text-white px-6 py-2 rounded-lg inline-block hover:shadow-lg transition-all"
              >
                Play Your First Game
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
