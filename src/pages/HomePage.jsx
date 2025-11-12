import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdSlider from '../components/AdSlider'
import './HomePage.css'

const categories = [
  '전체',
  '운동/스포츠',
  '사교/인맥',
  '인문학/책/글',
  '아웃도어/여행',
  '음악/악기',
  '업종/직무',
  '문화/공연/축제',
  '외국어/언어',
  '게임/오락',
  '공예/만들기',
  '댄스/무용',
  '봉사/헬스'
]

const featuredClubs = [
  {
    id: 1,
    name: '핸들락 클라이밍',
    description: '핸들락 클라이밍 Since 23.04.01 ✨ 신규회원 모집 중',
    category: '운동/스포츠',
    region: '서울 서초구',
    members: 55,
    image: 'https://images.unsplash.com/photo-1508264165352-258a6ca130fa?auto=format&fit=crop&w=900&q=70'
  },
  {
    id: 2,
    name: 'Fall in run',
    description: '잡일한강 러닝 💥 Since 2025.10 함께 달려요!',
    category: '운동/스포츠',
    region: '서울 강남구',
    members: 30,
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=900&q=70'
  },
  {
    id: 3,
    name: 'Team for Rest 백패커즈',
    description: '시즌별로 자연을 즐기는 백패킹 모임',
    category: '아웃도어/여행',
    region: '경기 남양주',
    members: 48,
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=70'
  },
  {
    id: 4,
    name: '훈남훈녀들의 No알콜 라온제나',
    description: '논알콜 액티비티! 활발한 오프라인 모임',
    category: '사교/인맥',
    region: '서울 전역',
    members: 133,
    image: 'https://images.unsplash.com/photo-1542144582-1ba00456b5d5?auto=format&fit=crop&w=900&q=70'
  },
  {
    id: 5,
    name: '동네에서 보드게임 한판!!',
    description: '주말마다 즐겁게 보드게임 🎲',
    category: '게임/오락',
    region: '서울 송파구',
    members: 42,
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=70'
  },
  {
    id: 6,
    name: 'S&M 스터디',
    description: 'Steady Job & Manner, 취업 준비 함께해요',
    category: '업종/직무',
    region: '서울 강북구',
    members: 60,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=70'
  }
]

function HomePage() {
  const navigate = useNavigate()
  const [selectedRegion, setSelectedRegion] = useState('서울특별시 서초구')
  const [ageRange, setAgeRange] = useState('20대')
  const [searchValue, setSearchValue] = useState('')

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    navigate('/clubs', {
      state: {
        region: selectedRegion,
        type: 'all',
        keyword: searchValue
      }
    })
  }

  return (
    <div className="home-desktop">
      <header className="top-nav">
        <div className="logo" onClick={() => navigate('/')}>소모임</div>
        <div className="nav-controls">
          <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
            <option>서울특별시 서초구</option>
            <option>서울특별시 강남구</option>
            <option>서울특별시 마포구</option>
            <option>경기 수원시</option>
            <option>부산 해운대구</option>
          </select>
          <select value={ageRange} onChange={(e) => setAgeRange(e.target.value)}>
            <option>20대</option>
            <option>30대</option>
            <option>40대</option>
            <option>50대+</option>
          </select>
          <form className="search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="찾고 싶은 모임을 검색해보세요! (ex 러닝, 독서)"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>
        </div>
        <div className="nav-actions">
          <button className="icon-btn" aria-label="검색">
            🔍
          </button>
          <button className="icon-btn" aria-label="알림">
            🔔
          </button>
          <button className="icon-btn" aria-label="내 프로필">
            🙂
          </button>
          <button className="login-btn">로그인</button>
        </div>
      </header>

      <div className="home-body">
        <aside className="sidebar">
          <button className="download-btn">앱 다운로드</button>
          <nav className="sidebar-nav">
            <button className="active">🏠 홈</button>
            <button>⭐ 추천모임</button>
            <button>🏆 정모모임</button>
            <button>🕒 최근 본 모임</button>
          </nav>

          <div className="category-list">
            <h3>카테고리</h3>
            <ul>
              {categories.map((category) => (
                <li key={category}>
                  <label>
                    <input type="radio" name="category" />
                    <span>{category}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="main-content">
          <section className="hero-section">
            <div className="hero-text">
              <h1>소모임 - 우리동네 취미 모임 앱</h1>
              <p>
                소모임은 지역과 관심사에 맞는 모임을 쉽게 찾고 참여할 수 있는 서비스로, 500만+ 다운로드를 돌파한
                국내 최대 규모의 오프라인 커뮤니티 플랫폼입니다. 다양한 정기 모임을 통해 관심사를 공유하는 사람들과 즐거운 만남을 열어보세요!
              </p>
              <button className="hero-region" onClick={() => navigate('/clubs', { state: { region: selectedRegion, type: 'all' } })}>
                📍 {selectedRegion} 근처 모임
              </button>
            </div>
            <div className="hero-media">
              <AdSlider />
            </div>
          </section>

          <section className="featured-section">
            <header className="section-header">
              <h2>활동이 활발한 모임</h2>
              <button className="more-btn" onClick={() => navigate('/clubs', { state: { region: selectedRegion, type: 'all' } })}>
                더보기 →
              </button>
            </header>
            <div className="club-grid">
              {featuredClubs.map((club) => (
                <div key={club.id} className="club-card" onClick={() => navigate(`/clubs/${club.id}`)}>
                  <div className="club-image" style={{ backgroundImage: `url(${club.image})` }} />
                  <div className="club-content">
                    <div className="club-title">{club.name}</div>
                    <div className="club-description">{club.description}</div>
                    <div className="club-meta">
                      <span>📍 {club.region}</span>
                      <span>👥 {club.members}명</span>
                    </div>
                    <div className="club-tag">#{club.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default HomePage

