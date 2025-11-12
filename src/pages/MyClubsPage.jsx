import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MyClubsPage.css'

// 더미 데이터
const myClubs = [
  {
    id: 1,
    name: '독서 토론 모임',
    type: 'offline',
    region: '서울',
    nextMission: '이번 주 책 읽기',
    missionDate: '2024-01-15',
    isLiked: true
  },
  {
    id: 2,
    name: '온라인 영어 스터디',
    type: 'online',
    region: '전체',
    nextMission: '단어 50개 외우기',
    missionDate: '2024-01-16',
    isLiked: true
  }
]

const weeklyMissions = [
  { id: 1, clubName: '독서 토론 모임', mission: '이번 주 책 읽기', date: '2024-01-15', completed: false },
  { id: 2, clubName: '온라인 영어 스터디', mission: '단어 50개 외우기', date: '2024-01-16', completed: false },
  { id: 3, clubName: '독서 토론 모임', mission: '토론 준비하기', date: '2024-01-17', completed: true }
]

function MyClubsPage() {
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState('clubs') // clubs, calendar, missions

  const getCurrentWeek = () => {
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay())
    return startOfWeek
  }

  const getDaysInWeek = () => {
    const start = getCurrentWeek()
    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(start)
      day.setDate(start.getDate() + i)
      days.push(day)
    }
    return days
  }

  const weekDays = getDaysInWeek()
  const today = new Date().toDateString()

  return (
    <div className="my-clubs-page">
      <header className="my-clubs-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← 뒤로
        </button>
        <h2>내 소모임 관리</h2>
      </header>

      <div className="my-clubs-content">
        <div className="tab-selector">
          <button
            className={`tab-btn ${selectedTab === 'clubs' ? 'active' : ''}`}
            onClick={() => setSelectedTab('clubs')}
          >
            내 소모임
          </button>
          <button
            className={`tab-btn ${selectedTab === 'calendar' ? 'active' : ''}`}
            onClick={() => setSelectedTab('calendar')}
          >
            달력
          </button>
          <button
            className={`tab-btn ${selectedTab === 'missions' ? 'active' : ''}`}
            onClick={() => setSelectedTab('missions')}
          >
            미션
          </button>
        </div>

        {selectedTab === 'clubs' && (
          <div className="my-clubs-list">
            {myClubs.length === 0 ? (
              <div className="no-clubs">
                <p>참여 중인 소모임이 없습니다.</p>
                <button className="find-clubs-btn" onClick={() => navigate('/clubs')}>
                  소모임 찾기
                </button>
              </div>
            ) : (
              myClubs.map((club) => (
                <div
                  key={club.id}
                  className="my-club-card"
                  onClick={() => navigate(`/clubs/${club.id}`)}
                >
                  <div className="my-club-header">
                    <h3 className="my-club-name">{club.name}</h3>
                    <span className={`club-type-badge ${club.type}`}>
                      {club.type === 'online' ? '온라인' : '오프라인'}
                    </span>
                  </div>
                  <p className="my-club-region">📍 {club.region}</p>
                  <div className="my-club-mission">
                    <span className="mission-label">다음 미션:</span>
                    <span className="mission-text">{club.nextMission}</span>
                  </div>
                  <div className="mission-date">📅 {club.missionDate}</div>
                </div>
              ))
            )}
          </div>
        )}

        {selectedTab === 'calendar' && (
          <div className="calendar-section">
            <div className="calendar-header">
              <h3>이번 주 일정</h3>
            </div>
            <div className="week-calendar">
              {weekDays.map((day, index) => {
                const dayStr = day.toDateString()
                const dayMissions = weeklyMissions.filter(
                  m => new Date(m.date).toDateString() === dayStr
                )
                const isToday = dayStr === today

                return (
                  <div key={index} className={`calendar-day ${isToday ? 'today' : ''}`}>
                    <div className="day-name">
                      {['일', '월', '화', '수', '목', '금', '토'][day.getDay()]}
                    </div>
                    <div className="day-number">{day.getDate()}</div>
                    {dayMissions.length > 0 && (
                      <div className="day-missions">
                        {dayMissions.map(mission => (
                          <div key={mission.id} className="mission-dot" />
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {selectedTab === 'missions' && (
          <div className="missions-section">
            <div className="missions-header">
              <h3>이번 주 미션</h3>
              <button className="notification-btn" onClick={() => alert('알림 설정 기능')}>
                🔔 알림 설정
              </button>
            </div>
            <div className="missions-list">
              {weeklyMissions.map((mission) => (
                <div key={mission.id} className={`mission-item ${mission.completed ? 'completed' : ''}`}>
                  <div className="mission-checkbox">
                    <input
                      type="checkbox"
                      checked={mission.completed}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="mission-content">
                    <div className="mission-club">{mission.clubName}</div>
                    <div className="mission-text">{mission.mission}</div>
                    <div className="mission-date">📅 {mission.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyClubsPage

