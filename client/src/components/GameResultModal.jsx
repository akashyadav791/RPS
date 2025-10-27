import { FaTrophy, FaMedal } from 'react-icons/fa'

const GameResultModal = ({ result, userChoice, computerChoice, onClose, choiceIcons }) => {
  if (!result) return null

  const resultConfig = {
    win: {
      title: '🎉 Victory!',
      message: 'You won this round!',
      color: 'from-green-500 to-emerald-500',
      icon: <FaTrophy className="text-6xl" />
    },
    lose: {
      title: '😔 Defeat',
      message: 'Better luck next time!',
      color: 'from-red-500 to-orange-500',
      icon: <FaMedal className="text-6xl opacity-50" />
    },
    draw: {
      title: '🤝 Draw',
      message: "It's a tie!",
      color: 'from-yellow-500 to-orange-500',
      icon: <FaMedal className="text-6xl" />
    }
  }

  const config = resultConfig[result]

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
      <div className="glass rounded-2xl p-8 max-w-md w-full animate-slide-up">
        <div className={`bg-gradient-to-br ${config.color} rounded-xl p-6 mb-6 text-center`}>
          {config.icon}
          <h2 className="text-3xl font-bold text-white mt-4">{config.title}</h2>
          <p className="text-white/90 mt-2">{config.message}</p>
        </div>

        <div className="flex justify-center items-center space-x-8 mb-6">
          <div className="text-center">
            <div className="text-5xl mb-2">{choiceIcons[userChoice]}</div>
            <p className="text-gray-400 text-sm">You</p>
            <p className="text-white font-semibold capitalize">{userChoice}</p>
          </div>
          
          <div className="text-4xl text-gray-500">VS</div>
          
          <div className="text-center">
            <div className="text-5xl mb-2">{choiceIcons[computerChoice]}</div>
            <p className="text-gray-400 text-sm">Computer</p>
            <p className="text-white font-semibold capitalize">{computerChoice}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full gradient-bg text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          Play Again
        </button>
      </div>
    </div>
  )
}

export default GameResultModal
