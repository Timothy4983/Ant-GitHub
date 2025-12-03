import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// react-router-dom에서 라우팅 관련 기능들을 가져와줘//
// BrowserRouter(Router): 페이지 이동을 관리하는 라우터//
// Routes: 여러 경로(Route)들을 묶어주는 역할//
// Route: 특정 주소에 어떤 컴포넌트를 보여줄지 정의//
// Navigate: 다른 페이지로 강제 이동시킬 때 사용//

import HomePage from './pages/HomePage'
// pages 폴더의 HomePage 컴포넌트 가져오기//
import ClubListPage from './pages/ClubListPage'
// pages 폴더의 ClubListPage 컴포넌트 가져오기//
import ClubDetailPage from './pages/ClubDetailPage'
// pages 폴더의 ClubDetailPage 컴포넌트 가져오기//
import MyClubsPage from './pages/MyClubsPage'
// pages 폴더의 MyClubsPage 컴포넌트 가져오기//
import FeedPage from './pages/FeedPage'
// pages 폴더의 FeedPage 컴포넌트 가져오기//
import ActiveClubsPage from './pages/ActiveClubsPage'
// pages 폴더의 ActiveClubsPage 컴포넌트 가져오기//

function App() {
  // App 함수 시작 (웹사이트의 메인 구조를 잡는 곳)//
  return (
    <Router>
      {/* 라우터로 전체 앱을 감싸서 페이지 이동 기능을 활성화 */}
      <div className="app">
        <Routes>
          {/* 주소에 따라 보여줄 화면을 정하는 구역 시작 */}
          <Route path="/" element={<HomePage />} />
          {/* 주소가 '/' (홈)일 때 HomePage를 보여줘 */}
          <Route path="/clubs" element={<ClubListPage />} />
          {/* 주소가 '/clubs'일 때 ClubListPage를 보여줘 */}
          <Route path="/clubs/active" element={<ActiveClubsPage />} />
          {/* 주소가 '/clubs/active'일 때 ActiveClubsPage를 보여줘 */}
          <Route path="/clubs/:id" element={<ClubDetailPage />} />
          {/* 주소가 '/clubs/숫자'일 때 ClubDetailPage를 보여줘 (:id는 변수) */}
          <Route path="/my-clubs" element={<MyClubsPage />} />
          {/* 주소가 '/my-clubs'일 때 MyClubsPage를 보여줘 */}
          <Route path="/feed" element={<FeedPage />} />
          {/* 주소가 '/feed'일 때 FeedPage를 보여줘 */}
          <Route path="*" element={<Navigate to="/" replace />} />
          {/* 위에 정의되지 않은 모든 주소('*')는 홈('/')으로 보내줘 */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
// App 컴포넌트를 다른 파일에서 사용할 수 있게 내보내줘//
