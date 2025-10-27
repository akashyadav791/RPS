
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
