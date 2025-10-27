
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
