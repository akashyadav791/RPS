import { useState, useCallback } from 'react'
import axios from '../config/axios'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'react-toastify'

const CHOICES = {
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSORS: 'scissors'
}

const CHOICE_ICONS = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️'
}

export const useGame = () => {
  const [gameState, setGameState] = useState({
    userChoice: null,
    computerChoice: null,
    result: null,
    isPlaying: false,
    score: {
      user: 0,
      computer: 0
    },
    currentStreak: 0,
    gameHistory: []
  })

  const { currentUser, fetchUserStats } = useAuth()

  // Get computer choice
  const getComputerChoice = () => {
    const choices = Object.values(CHOICES)
    return choices[Math.floor(Math.random() * choices.length)]
  }

  // Determine winner
  const determineWinner = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) return 'draw'
    
    const winConditions = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper'
    }
    
    return winConditions[userChoice] === computerChoice ? 'win' : 'lose'
  }

  // Play game
  const playGame = useCallback(async (userChoice) => {
    setGameState(prev => ({ ...prev, isPlaying: true }))
    
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const computerChoice = getComputerChoice()
    const result = determineWinner(userChoice, computerChoice)
    
    // Update local state
    setGameState(prev => {
      const newScore = { ...prev.score }
      let newStreak = prev.currentStreak
      
      if (result === 'win') {
        newScore.user++
        newStreak++
      } else if (result === 'lose') {
        newScore.computer++
        newStreak = 0
      }
      
      const newHistory = [{
        userChoice,
        computerChoice,
        result,
        timestamp: new Date().toISOString()
      }, ...prev.gameHistory].slice(0, 10)
      
      return {
        userChoice,
        computerChoice,
        result,
        isPlaying: false,
        score: newScore,
        currentStreak: newStreak,
        gameHistory: newHistory
      }
    })
    
    // Save to backend
    try {
      if (currentUser) {
        await axios.post('/api/games/save', {
          userId: currentUser.uid,
          userChoice,
          computerChoice,
          result,
          timestamp: new Date().toISOString()
        })
        
        // Update user stats in Firebase
        await fetchUserStats(currentUser.uid)
      }
    } catch (error) {
      console.error('Error saving game:', error)
      toast.error('Failed to save game result')
    }
    
    return { userChoice, computerChoice, result }
  }, [currentUser, fetchUserStats])

  // Reset game
  const resetGame = () => {
    setGameState({
      userChoice: null,
      computerChoice: null,
      result: null,
      isPlaying: false,
      score: {
        user: 0,
        computer: 0
      },
      currentStreak: 0,
      gameHistory: []
    })
  }

  return {
    gameState,
    playGame,
    resetGame,
    CHOICES,
    CHOICE_ICONS
  }
}
