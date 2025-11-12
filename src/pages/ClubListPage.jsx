import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import RegionSelector from '../components/RegionSelector'
import './ClubListPage.css'

// 더미 데이터
const dummyClubs = [
  {
    id: 1,
    name: '독서 토론 모임',
    type: 'offline',
    region: '서울',
    description: '매주 책을 읽고 함께 토론하는 모임입니다.',
    members: 15,
    tags: ['독서', '토론', '성장']
  },
  {
    id: 2,
    name: '온라인 영어 스터디',
    type: 'online',
    region: '전체',
    description: '화상으로 함께 영어 공부하는 모임입니다.',
    members: 23,
    tags: ['영어', '스터디', '온라인']
  },
  {
    id: 3,
    name: '러닝 크루',
    type: 'offline',
    region: '경기',
    description: '주말마다 함께 달리는 건강한 모임입니다.',
    members: 30,
    tags: ['운동', '러닝', '건강']
  },
  {
    id: 4,
    name: '코딩 스터디 그룹',
    type: 'online',
    region: '전체',
    description: '프로그래밍을 함께 배우고 공유하는 모임입니다.',
    members: 18,
    tags: ['코딩', '개발', '온라인']
  },
  {
    id: 5,
    name: '예술 창작 모임',
    type: 'offline',
    region: '서울',
    description: '그림, 글쓰기 등 창작 활동을 함께하는 모임입니다.',
    members: 12,
    tags: ['예술', '창작', '취미']
  }
]

function ClubListPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedRegion, setSelectedRegion] = useState(location.state?.region || '전체')
  const [clubType, setClubType] = useState(location.state?.type || 'all')
  const [filteredClubs, setFilteredClubs] = useState(dummyClubs)

  useEffect(() => {
    let filtered = dummyClubs

    // 지역 필터
    if (selectedRegion !== '전체') {
      filtered = filtered.filter(club => club.region === selectedRegion)
    }

    // 타입 필터
    if (clubType !== 'all') {
      filtered = filtered.filter(club => club.type === clubType)
    }

    setFilteredClubs(filtered)
  }, [selectedRegion, clubType])

  const handleClubClick = (clubId) => {
    navigate(`/clubs/${clubId}`)
  }

  return (
    <div className="club-list-page">
      <header className="club-list-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← 뒤로
        </button>
        <h2>소모임 목록</h2>
      </header>

      <div className="club-list-content">
        <RegionSelector
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
        />

        <div className="club-type-selector">
          <button
            className={`club-type-btn ${clubType === 'all' ? 'active' : ''}`}
            onClick={() => setClubType('all')}
          >
            전체
          </button>
          <button
            className={`club-type-btn ${clubType === 'online' ? 'active' : ''}`}
            onClick={() => setClubType('online')}
          >
            온라인
          </button>
          <button
            className={`club-type-btn ${clubType === 'offline' ? 'active' : ''}`}
            onClick={() => setClubType('offline')}
          >
            오프라인
          </button>
        </div>

        <div className="club-list">
          {filteredClubs.length === 0 ? (
            <div className="no-clubs">
              <p>조건에 맞는 소모임이 없습니다.</p>
            </div>
          ) : (
            filteredClubs.map((club) => (
              <div
                key={club.id}
                className="club-card"
                onClick={() => handleClubClick(club.id)}
              >
                <div className="club-card-header">
                  <h3 className="club-name">{club.name}</h3>
                  <span className={`club-type-badge ${club.type}`}>
                    {club.type === 'online' ? '온라인' : '오프라인'}
                  </span>
                </div>
                <p className="club-description">{club.description}</p>
                <div className="club-info">
                  <span className="club-region">📍 {club.region}</span>
                  <span className="club-members">👥 {club.members}명</span>
                </div>
                <div className="club-tags">
                  {club.tags.map((tag, index) => (
                    <span key={index} className="club-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ClubListPage

