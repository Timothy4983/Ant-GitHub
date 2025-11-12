import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ClubListPage from './pages/ClubListPage'
import ClubDetailPage from './pages/ClubDetailPage'
import MyClubsPage from './pages/MyClubsPage'
import FeedPage from './pages/FeedPage'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clubs" element={<ClubListPage />} />
          <Route path="/clubs/:id" element={<ClubDetailPage />} />
          <Route path="/my-clubs" element={<MyClubsPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
