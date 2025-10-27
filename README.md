# 🎮 Rock Paper Scissors - Professional Edition

A full-stack, professional Rock Paper Scissors game built with React, Node.js, Express, MongoDB, and Firebase Authentication.

## ✨ Features

- 🔐 **Firebase Authentication** - Secure user authentication with email/password and Google Sign-In
- 🎯 **Real-time Gameplay** - Smooth and responsive game mechanics
- 📊 **Statistics Tracking** - Track wins, losses, draws, win streaks, and more
- 🏆 **Leaderboard** - Compete with players worldwide
- 👤 **User Profiles** - Personalized profiles with achievements and badges
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI/UX** - Beautiful glassmorphism design with Tailwind CSS
- 💾 **Game History** - View your past games and performance
- 🌟 **Achievements** - Unlock badges and level up as you play

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Firebase** - Authentication and real-time database
- **Material UI Icons** - Icon library
- **React Icons** - Additional icons
- **Axios** - HTTP client
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **Firebase Admin** - Server-side Firebase integration
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Firebase account

### 1. Clone the repository
```bash
cd "c:\\rock paper scissors"
```

### 2. Setup Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password and Google)
4. Get your Firebase config from Project Settings
5. Update `client/src/firebase/config.js` with your config
6. Download Firebase Admin SDK JSON for the backend

### 3. Setup Backend

```powershell
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rps-game
CLIENT_URL=http://localhost:3000
```

Start MongoDB (if running locally):
```powershell
# Make sure MongoDB is installed and running
mongod
```

Start the backend server:
```powershell
npm run dev
```

### 4. Setup Frontend

Open a new terminal:
```powershell
cd client
npm install
```

Start the development server:
```powershell
npm run dev
```

The app will be available at `http://localhost:3000`

## 🚀 Usage

1. **Register/Login** - Create an account or sign in with Google
2. **Play Game** - Choose Rock, Paper, or Scissors to play against the computer
3. **View Dashboard** - See your stats, recent games, and performance metrics
4. **Check Leaderboard** - See how you rank against other players
5. **View Profile** - Check your achievements and career stats

## 📁 Project Structure

```
rock paper scissors/
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── contexts/      # React context providers
│   │   ├── firebase/      # Firebase configuration
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── server/                # Backend Node.js application
    ├── models/            # Mongoose models
    ├── routes/            # Express routes
    ├── server.js          # Server entry point
    ├── package.json
    └── .env.example       # Environment variables template
```

## 🎮 Game Rules

- **Rock** beats **Scissors**
- **Scissors** beats **Paper**
- **Paper** beats **Rock**

## 🏆 Features Breakdown

### Authentication
- Email/Password registration and login
- Google OAuth integration
- Protected routes
- Automatic session management

### Gameplay
- Animated choice selection
- Real-time result display
- Score tracking
- Win streak counter
- Game history

### Statistics
- Total games played
- Win/Loss/Draw counts
- Win rate percentage
- Current win streak
- Best win streak
- Player level system

### Leaderboard
- Global rankings
- Sort by wins, games played, or win rate
- Top 3 podium display
- Player search functionality

### Profile
- User information
- Career statistics
- Achievement badges
- Level progression
- Performance charts

## 🔧 Configuration

### Firebase Setup (Client)
Edit `client/src/firebase/config.js`:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

### MongoDB Setup
- **Local**: `mongodb://localhost:27017/rps-game`
- **Atlas**: Get connection string from MongoDB Atlas

## 📝 API Endpoints

### Games
- `POST /api/games/save` - Save game result
- `GET /api/games/history/:userId` - Get user's game history
- `GET /api/games/stats/:userId` - Get user statistics
- `GET /api/games/recent` - Get recent games (all users)

### Leaderboard
- `GET /api/leaderboard` - Get global leaderboard
- `GET /api/leaderboard/rank/:userId` - Get user's rank

### Users
- `GET /api/users/:userId` - Get user profile
- `POST /api/users` - Create/update user
- `DELETE /api/users/:userId` - Delete user

## 🎨 Customization

### Tailwind Theme
Edit `client/tailwind.config.js` to customize colors, animations, and more.

### Game Logic
Edit `client/src/hooks/useGame.js` to modify game mechanics.

## 🐛 Troubleshooting

### Frontend issues:
```powershell
cd client
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

### Backend issues:
```powershell
cd server
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

### MongoDB connection issues:
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access (for Atlas)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created with ❤️ by the development team

---

**Enjoy playing! 🎮**
