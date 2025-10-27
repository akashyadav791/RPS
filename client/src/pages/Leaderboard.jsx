
import { useLeaderboard } from '../hooks/useLeaderboard'
import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa'
import LoadingSpinner from '../components/LoadingSpinner'

const Leaderboard = () => {
  const { leaderboard, loading, error } = useLeaderboard()

  if (loading) return <LoadingSpinner />

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <FaTrophy className="text-3xl text-yellow-400" />
      case 2:
        return <FaMedal className="text-3xl text-gray-300" />
      case 3:
        return <FaMedal className="text-3xl text-orange-400" />
      default:
        return <FaAward className="text-3xl text-purple-400" />
    }
  }

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500 to-orange-500'
      case 2:
        return 'from-gray-300 to-gray-400'
      case 3:
        return 'from-orange-400 to-red-500'
      default:
        return 'from-purple-500 to-pink-500'
    }
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] p-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold gradient-text mb-2">Leaderboard</h1>
          <p className="text-gray-400 text-lg">Top players from around the world</p>
        </div>

        {/* Error State */}
        {error && (
          <div className="glass rounded-xl p-6 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Top 3 Podium */}
        {leaderboard && leaderboard.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 mb-8 animate-slide-up">
            {/* 2nd Place */}
            <div className="glass rounded-xl p-6 text-center mt-8">
              <FaMedal className="text-5xl text-gray-300 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">2nd</h3>
              <p className="text-gray-400 mb-2">{leaderboard[1].displayName}</p>
              <p className="text-3xl font-bold text-white">{leaderboard[1].wins}</p>
              <p className="text-gray-400 text-sm">Wins</p>
            </div>

            {/* 1st Place */}
            <div className="glass rounded-xl p-6 text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-1 rounded-full text-sm font-bold">
                Champion
              </div>
              <FaTrophy className="text-6xl text-yellow-400 mx-auto mb-3 mt-2 animate-bounce-slow" />
              <h3 className="text-3xl font-bold text-white mb-1">1st</h3>
              <p className="text-gray-400 mb-2 text-lg">{leaderboard[0].displayName}</p>
              <p className="text-4xl font-bold gradient-text">{leaderboard[0].wins}</p>
              <p className="text-gray-400 text-sm">Wins</p>
            </div>

            {/* 3rd Place */}
            <div className="glass rounded-xl p-6 text-center mt-8">
              <FaMedal className="text-5xl text-orange-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">3rd</h3>
              <p className="text-gray-400 mb-2">{leaderboard[2].displayName}</p>
              <p className="text-3xl font-bold text-white">{leaderboard[2].wins}</p>
              <p className="text-gray-400 text-sm">Wins</p>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="glass rounded-xl p-6 animate-slide-up">
          <h2 className="text-2xl font-bold text-white mb-6">All Players</h2>
          
          {leaderboard && leaderboard.length > 0 ? (
            <div className="space-y-3">
              {leaderboard.map((player, index) => {
                const rank = index + 1
                const winRate = player.totalGames > 0 
                  ? ((player.wins / player.totalGames) * 100).toFixed(1) 
                  : 0

                return (
                  <div
                    key={player.userId}
                    className={`
                      flex items-center justify-between p-4 rounded-lg
                      bg-gradient-to-r ${rank <= 3 ? getRankColor(rank) : 'from-gray-800'} bg-opacity-10
                      hover:bg-opacity-20 transition-all
                      border-l-4 ${rank <= 3 ? 'border-opacity-100' : 'border-purple-500'}
                    `}
                    style={{
                      borderColor: rank <= 3 ? '' : '#8b5cf6'
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 flex items-center justify-center">
                        {rank <= 3 ? (
                          getRankIcon(rank)
                        ) : (
                          <span className="text-2xl font-bold text-gray-400">#{rank}</span>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-bold text-white">{player.displayName}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{player.totalGames} games</span>
                          <span>•</span>
                          <span>{winRate}% win rate</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-3xl font-bold text-white">{player.wins}</p>
                      <p className="text-sm text-gray-400">Wins</p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaTrophy className="text-6xl text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No players yet. Be the first!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
