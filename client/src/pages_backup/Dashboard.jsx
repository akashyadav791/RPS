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

import { useState } from 'react'
import { useGame } from '../hooks/useGame'
import ChoiceButton from '../components/ChoiceButton'
import GameResultModal from '../components/GameResultModal'
import { FaRedo, FaTrophy } from 'react-icons/fa'
import { GiRock, GiPaper, GiScissors } from 'react-icons/gi'

const Game = () => {
  const { gameState, playGame, resetGame, CHOICES, CHOICE_ICONS } = useGame()
  const [showResult, setShowResult] = useState(false)

  const handleChoice = async (choice) => {
    const result = await playGame(choice)
    setShowResult(true)
  }

  const handleCloseResult = () => {
    setShowResult(false)
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] p-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold gradient-text mb-2">Battle Arena</h1>
          <p className="text-gray-400">Choose your weapon wisely!</p>
        </div>

        {/* Score Board */}
        <div className="glass rounded-2xl p-6 mb-8 animate-slide-up">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="text-gray-400 mb-2">You</p>
              <p className="text-5xl font-bold text-white">{gameState.score.user}</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl text-gray-500 mb-2">VS</div>
              <div className="flex items-center space-x-2">
                <FaTrophy className="text-yellow-400" />
                <span className="text-purple-400 font-semibold">
                  Streak: {gameState.currentStreak}
                </span>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400 mb-2">Computer</p>
              <p className="text-5xl font-bold text-white">{gameState.score.computer}</p>
            </div>
          </div>
        </div>

        {/* Choice Display */}
        <div className="glass rounded-2xl p-8 mb-8 animate-slide-up">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full glass flex items-center justify-center text-6xl mb-3">
                {gameState.userChoice ? CHOICE_ICONS[gameState.userChoice] : '❓'}
              </div>
              <p className="text-gray-400 font-semibold">Your Choice</p>
            </div>
            
            <div className="text-4xl text-purple-400 animate-pulse-slow">⚔️</div>
            
            <div className="text-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full glass flex items-center justify-center text-6xl mb-3">
                {gameState.computerChoice ? CHOICE_ICONS[gameState.computerChoice] : '❓'}
              </div>
              <p className="text-gray-400 font-semibold">CPU Choice</p>
            </div>
          </div>
        </div>

        {/* Choices */}
        <div className="flex justify-center items-center gap-6 mb-8 flex-wrap animate-slide-up">
          <ChoiceButton
            choice={CHOICES.ROCK}
            icon={CHOICE_ICONS.rock}
            onClick={handleChoice}
            disabled={gameState.isPlaying}
            isSelected={gameState.userChoice === CHOICES.ROCK}
          />
          <ChoiceButton
            choice={CHOICES.PAPER}
            icon={CHOICE_ICONS.paper}
            onClick={handleChoice}
            disabled={gameState.isPlaying}
            isSelected={gameState.userChoice === CHOICES.PAPER}
          />
          <ChoiceButton
            choice={CHOICES.SCISSORS}
            icon={CHOICE_ICONS.scissors}
            onClick={handleChoice}
            disabled={gameState.isPlaying}
            isSelected={gameState.userChoice === CHOICES.SCISSORS}
          />
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={resetGame}
            className="glass px-8 py-3 rounded-xl font-semibold text-white hover:shadow-lg transition-all inline-flex items-center space-x-2"
          >
            <FaRedo />
            <span>Reset Game</span>
          </button>
        </div>

        {/* Game History */}
        {gameState.gameHistory.length > 0 && (
          <div className="glass rounded-2xl p-6 mt-8 animate-slide-up">
            <h3 className="text-2xl font-bold text-white mb-4">Recent Matches</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {gameState.gameHistory.map((game, index) => (
                <div
                  key={index}
                  className={`
                    flex items-center justify-between p-3 rounded-lg
                    ${game.result === 'win' ? 'bg-green-500/20 border-l-4 border-green-500' : ''}
                    ${game.result === 'lose' ? 'bg-red-500/20 border-l-4 border-red-500' : ''}
                    ${game.result === 'draw' ? 'bg-yellow-500/20 border-l-4 border-yellow-500' : ''}
                  `}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{CHOICE_ICONS[game.userChoice]}</span>
                    <span className="text-gray-400">vs</span>
                    <span className="text-2xl">{CHOICE_ICONS[game.computerChoice]}</span>
                  </div>
                  <span className={`
                    font-semibold uppercase text-sm
                    ${game.result === 'win' ? 'text-green-400' : ''}
                    ${game.result === 'lose' ? 'text-red-400' : ''}
                    ${game.result === 'draw' ? 'text-yellow-400' : ''}
                  `}>
                    {game.result}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Result Modal */}
      {showResult && (
        <GameResultModal
          result={gameState.result}
          userChoice={gameState.userChoice}
          computerChoice={gameState.computerChoice}
          onClose={handleCloseResult}
          choiceIcons={CHOICE_ICONS}
        />
      )}
    </div>
  )
}

export default Game

import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useOnlinePlayers } from '../hooks/useOnlinePlayers'
import { FaGamepad, FaTrophy, FaChartLine } from 'react-icons/fa'
import { IoSparkles } from 'react-icons/io5'

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
      </div>
    </div>
  )
}

export default Home

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

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'react-toastify'
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, signInWithGoogle, currentUser } = useAuth()
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard')
    }
  }, [currentUser, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      await login(email, password)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
      toast.error(error.message || 'Failed to login')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      await signInWithGoogle()
      toast.success('Welcome!')
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
      toast.error('Failed to sign in with Google')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="glass rounded-2xl p-8 animate-slide-up">
          <h2 className="text-4xl font-bold text-center mb-2 gradient-text">
            Welcome Back
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Login to continue your gaming journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-bg text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-gray-400">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 bg-white text-gray-800 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaGoogle />
            <span>Sign in with Google</span>
          </button>

          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-purple-400 hover:text-purple-300 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import axios from '../config/axios'
import { toast } from 'react-toastify'
import ChoiceButton from '../components/ChoiceButton'
import { FaArrowLeft, FaTrophy, FaCrown } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const MultiplayerGame = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [myChoice, setMyChoice] = useState(null)
  const [roundResult, setRoundResult] = useState(null)

  const choices = ['rock', 'paper', 'scissors']

  const fetchRoom = async () => {
    try {
      const response = await axios.get(`/api/rooms/${roomId}`)
      setRoom(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching room:', error)
      toast.error('Room not found')
      navigate('/multiplayer')
    }
  }

  useEffect(() => {
    fetchRoom()
    const interval = setInterval(fetchRoom, 2000) // Poll every 2 seconds
    return () => clearInterval(interval)
  }, [roomId])

  const handleChoice = async (choice) => {
    setMyChoice(choice)
    
    try {
      const response = await axios.post(`/api/rooms/${roomId}/move`, {
        userId: currentUser.uid,
        choice
      })
      
      if (response.data.roundResult) {
        setRoundResult(response.data.roundResult)
        setTimeout(() => {
          setRoundResult(null)
          setMyChoice(null)
        }, 3000)
      }
      
      fetchRoom()
    } catch (error) {
      console.error('Error making move:', error)
      toast.error('Failed to submit choice')
      setMyChoice(null)
    }
  }

  const handleLeaveRoom = async () => {
    try {
      await axios.post(`/api/rooms/${roomId}/leave`, {
        userId: currentUser.uid
      })
      toast.info('Left the room')
      navigate('/multiplayer')
    } catch (error) {
      console.error('Error leaving room:', error)
      navigate('/multiplayer')
    }
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-gray-400">Loading room...</p>
        </div>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg">Room not found</p>
          <button
            onClick={() => navigate('/multiplayer')}
            className="mt-4 gradient-bg text-white px-6 py-2 rounded-lg"
          >
            Back to Rooms
          </button>
        </div>
      </div>
    )
  }

  const isHost = room.hostId === currentUser.uid
  const myScore = isHost ? room.hostScore : room.guestScore
  const opponentScore = isHost ? room.guestScore : room.hostScore
  const opponentName = isHost ? room.guestName : room.hostName
  const waitingForOpponent = room.status === 'waiting'
  const gameFinished = room.status === 'finished'

  return (
    <div className="min-h-[calc(100vh-3.5rem)] p-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleLeaveRoom}
            className="glass text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:shadow-lg transition-all"
          >
            <FaArrowLeft />
            <span>Leave Room</span>
          </button>
          
          <div className="glass px-6 py-2 rounded-lg">
            <p className="text-gray-400 text-sm">Room: {room.roomName}</p>
          </div>
        </div>

        {/* Waiting Screen */}
        {waitingForOpponent && (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="animate-pulse mb-4">
              <div className="inline-block w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Waiting for opponent...</h2>
            <p className="text-gray-400">Share the room code: <span className="text-purple-400 font-mono">{roomId}</span></p>
          </div>
        )}

        {/* Game Screen */}
        {!waitingForOpponent && !gameFinished && (
          <>
            {/* Score Board */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {/* Player 1 */}
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-gray-400 text-sm mb-2">{isHost ? 'You' : opponentName}</p>
                <p className="text-4xl font-bold gradient-text">{isHost ? myScore : opponentScore}</p>
              </div>

              {/* Round Counter */}
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-gray-400 text-sm mb-2">Round</p>
                <p className="text-4xl font-bold text-white">{room.currentRound}/{room.totalRounds}</p>
              </div>

              {/* Player 2 */}
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-gray-400 text-sm mb-2">{isHost ? opponentName : 'You'}</p>
                <p className="text-4xl font-bold gradient-text">{isHost ? opponentScore : myScore}</p>
              </div>
            </div>

            {/* Round Result */}
            <AnimatePresence>
              {roundResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="glass rounded-2xl p-8 mb-8 text-center"
                >
                  <h3 className={`text-3xl font-bold mb-4 ${
                    roundResult.winner === currentUser.uid ? 'text-green-400' :
                    roundResult.winner === 'draw' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {roundResult.winner === currentUser.uid ? '🎉 You Won!' :
                     roundResult.winner === 'draw' ? '🤝 Draw!' : '😢 You Lost!'}
                  </h3>
                  <p className="text-gray-400">
                    {roundResult.hostChoice} vs {roundResult.guestChoice}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Choice Buttons */}
            {!myChoice && !roundResult && (
              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-center text-white mb-6">Make Your Choice</h3>
                <div className="grid grid-cols-3 gap-4">
                  {choices.map((choice) => (
                    <ChoiceButton
                      key={choice}
                      choice={choice}
                      onClick={() => handleChoice(choice)}
                    />
                  ))}
                </div>
              </div>
            )}

            {myChoice && !roundResult && (
              <div className="glass rounded-2xl p-8 text-center">
                <div className="animate-pulse mb-4">
                  <div className="text-6xl mb-4">
                    {myChoice === 'rock' ? '✊' : myChoice === 'paper' ? '✋' : '✌️'}
                  </div>
                </div>
                <p className="text-gray-400">Waiting for opponent's choice...</p>
              </div>
            )}
          </>
        )}

        {/* Game Finished */}
        {gameFinished && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <FaTrophy className="text-6xl text-yellow-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold gradient-text mb-4">
              {myScore > opponentScore ? '🎉 Victory!' : myScore < opponentScore ? '💔 Defeat' : '🤝 Draw!'}
            </h2>
            
            <div className="flex justify-center space-x-8 mb-8">
              <div>
                <p className="text-gray-400 text-sm">Your Score</p>
                <p className="text-3xl font-bold text-white">{myScore}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">{opponentName}'s Score</p>
                <p className="text-3xl font-bold text-white">{opponentScore}</p>
              </div>
            </div>

            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => navigate('/multiplayer')}
                className="glass text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Back to Rooms
              </button>
              <button
                onClick={() => navigate('/game')}
                className="gradient-bg text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Play Solo
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default MultiplayerGame

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from '../config/axios'
import { toast } from 'react-toastify'
import { FaPlus, FaLock, FaUnlock, FaUsers, FaGamepad } from 'react-icons/fa'
import { IoSparkles } from 'react-icons/io5'

const MultiplayerRooms = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [formData, setFormData] = useState({
    roomName: '',
    isPrivate: false,
    password: '',
    totalRounds: 3
  })

  const fetchRooms = async () => {
    try {
      const response = await axios.get('/api/rooms/available')
      setRooms(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching rooms:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRooms()
    const interval = setInterval(fetchRooms, 5000) // Refresh every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const handleCreateRoom = async (e) => {
    e.preventDefault()
    
    if (!formData.roomName.trim()) {
      toast.error('Please enter a room name')
      return
    }

    if (formData.isPrivate && !formData.password) {
      toast.error('Please set a password for private room')
      return
    }

    try {
      const response = await axios.post('/api/rooms/create', {
        userId: currentUser.uid,
        displayName: currentUser.displayName || 'Anonymous',
        ...formData
      })
      
      toast.success('Room created! Waiting for opponent...')
      navigate(`/multiplayer/${response.data.room.roomId}`)
    } catch (error) {
      console.error('Error creating room:', error)
      toast.error('Failed to create room')
    }
  }

  const handleJoinRoom = async (roomId, isPrivate) => {
    if (isPrivate) {
      const password = prompt('Enter room password:')
      if (!password) return

      try {
        await axios.post('/api/rooms/join', {
          roomId,
          userId: currentUser.uid,
          displayName: currentUser.displayName || 'Anonymous',
          password
        })
        
        toast.success('Joined room!')
        navigate(`/multiplayer/${roomId}`)
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to join room')
      }
    } else {
      try {
        await axios.post('/api/rooms/join', {
          roomId,
          userId: currentUser.uid,
          displayName: currentUser.displayName || 'Anonymous'
        })
        
        toast.success('Joined room!')
        navigate(`/multiplayer/${roomId}`)
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to join room')
      }
    }
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] p-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
              Multiplayer Rooms
            </h1>
            <p className="text-gray-400">Play against real opponents</p>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:shadow-lg transition-all"
          >
            <FaPlus />
            <span>Create Room</span>
          </button>
        </div>

        {/* Rooms Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <p className="text-gray-400 mt-4">Loading rooms...</p>
          </div>
        ) : rooms.length === 0 ? (
          <div className="glass rounded-xl p-12 text-center">
            <FaGamepad className="text-6xl text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-4">No rooms available</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="gradient-bg text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Create the First Room
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room.roomId}
                className="glass rounded-xl p-6 hover:scale-105 transition-all cursor-pointer"
                onClick={() => handleJoinRoom(room.roomId, room.isPrivate)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{room.roomName}</h3>
                  {room.isPrivate ? (
                    <FaLock className="text-red-400" />
                  ) : (
                    <FaUnlock className="text-green-400" />
                  )}
                </div>
                
                <div className="space-y-2 text-gray-400 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Host:</span>
                    <span className="text-white font-semibold">{room.hostName}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Rounds:</span>
                    <span className="text-purple-400">Best of {room.totalRounds}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Players:</span>
                    <span className="text-yellow-400 flex items-center space-x-1">
                      <FaUsers />
                      <span>1/2</span>
                    </span>
                  </div>
                </div>
                
                <button className="w-full mt-4 gradient-bg text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                  Join Room
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Create Room Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="glass rounded-2xl p-8 max-w-md w-full">
              <h2 className="text-3xl font-bold gradient-text mb-6">Create Room</h2>
              
              <form onSubmit={handleCreateRoom} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Room Name
                  </label>
                  <input
                    type="text"
                    value={formData.roomName}
                    onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter room name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Total Rounds
                  </label>
                  <select
                    value={formData.totalRounds}
                    onChange={(e) => setFormData({ ...formData, totalRounds: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value={1}>Best of 1</option>
                    <option value={3}>Best of 3</option>
                    <option value={5}>Best of 5</option>
                    <option value={7}>Best of 7</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPrivate"
                    checked={formData.isPrivate}
                    onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
                    className="w-5 h-5 rounded"
                  />
                  <label htmlFor="isPrivate" className="text-gray-300">
                    Private Room (Password Protected)
                  </label>
                </div>

                {formData.isPrivate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter password"
                      required={formData.isPrivate}
                    />
                  </div>
                )}

                <div className="flex space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 glass text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 gradient-bg text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MultiplayerRooms

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

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'react-toastify'
import { FaGoogle, FaEnvelope, FaLock, FaUser } from 'react-icons/fa'

const Register = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const { register, signInWithGoogle, currentUser } = useAuth()
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard')
    }
  }, [currentUser, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.displayName || !formData.email || !formData.password) {
      toast.error('Please fill in all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    try {
      setLoading(true)
      await register(formData.email, formData.password, formData.displayName)
      toast.success('Account created successfully!')
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
      toast.error(error.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      await signInWithGoogle()
      toast.success('Welcome!')
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
      toast.error('Failed to sign in with Google')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="glass rounded-2xl p-8 animate-slide-up">
          <h2 className="text-4xl font-bold text-center mb-2 gradient-text">
            Create Account
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Join the ultimate RPS community
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Display Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-bg text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-gray-400">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 bg-white text-gray-800 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaGoogle />
            <span>Sign up with Google</span>
          </button>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register

