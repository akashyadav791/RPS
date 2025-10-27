
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
