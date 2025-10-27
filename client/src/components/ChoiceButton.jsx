import { motion } from 'framer-motion'

const ChoiceButton = ({ choice, icon, onClick, disabled, isSelected }) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={() => !disabled && onClick(choice)}
      disabled={disabled}
      className={`
        relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl glass
        flex items-center justify-center text-6xl sm:text-7xl
        transition-all duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-2xl'}
        ${isSelected ? 'ring-4 ring-purple-500 shadow-purple-500/50 shadow-2xl' : ''}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl" />
      <span className="relative z-10">{icon}</span>
      <div className="absolute bottom-3 text-sm font-semibold text-gray-300 capitalize">
        {choice}
      </div>
    </motion.button>
  )
}

export default ChoiceButton
