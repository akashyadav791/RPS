const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-10 h-10 border-4 border-purple-300 border-t-purple-500 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
