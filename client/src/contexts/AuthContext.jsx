import { createContext, useContext, useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { auth } from '../firebase/config'
import axios from '../config/axios'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userStats, setUserStats] = useState(null)

  // Register user
  const register = async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, { displayName })
    
    // Create user in MongoDB via backend API
    try {
      await axios.post('/api/users/register', {
        userId: userCredential.user.uid,
        displayName,
        email
      })
    } catch (error) {
      console.error('Error creating user in database:', error)
    }
    
    return userCredential
  }

  // Login user
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Google Sign In
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    
    // Create user in MongoDB if doesn't exist
    try {
      await axios.post('/api/users/register', {
        userId: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email
      })
    } catch (error) {
      // User might already exist, that's okay
      console.log('User may already exist in database')
    }
    
    return result
  }

  // Logout user
  const logout = () => {
    return signOut(auth)
  }

  // Fetch user stats from MongoDB
  const fetchUserStats = async (userId) => {
    try {
      const response = await axios.get(`/api/users/${userId}/stats`)
      if (response.data) {
        setUserStats(response.data)
      }
    } catch (error) {
      console.error('Error fetching user stats:', error)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      if (user) {
        await fetchUserStats(user.uid)
      } else {
        setUserStats(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    userStats,
    register,
    login,
    logout,
    signInWithGoogle,
    fetchUserStats
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
