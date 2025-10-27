const StatCard = ({ icon, label, value, color = 'purple' }) => {
  const colorClasses = {
    purple: 'from-purple-500 to-pink-500',
    green: 'from-green-500 to-emerald-500',
    red: 'from-red-500 to-orange-500',
    blue: 'from-blue-500 to-cyan-500',
    yellow: 'from-yellow-500 to-orange-500'
  }

  return (
    <div className="glass rounded-xl p-6 hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm uppercase tracking-wide mb-1">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={`text-4xl p-4 rounded-full bg-gradient-to-br ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatCard
