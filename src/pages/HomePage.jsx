// ./ -> 현재 폴더
// ../ -> 한 단계 위 상위 폴더
// ../../ -> 두 단계 위 상위 폴더
// ../../../ -> 세 단계 위 상위 폴더

import { useState } from 'react'
// React 라이브러리에서 useState라는 기능을 가져와줘//
import { useNavigate } from 'react-router-dom'
// react-router-dom에서 페이지 이동 기능을 가져워줘//
import AdSlider from '../components/AdSlider'
// components 폴더에 있는 AdSlider라는 컴포넌트를 가져와줘//
import RegionSelector from '../components/RegionSelector'
// componets 폴더에 있는 RegionSelector를 가져와줘//
import './HomePage.css'
// 현재 폴더에 있는 HomePage.css 스타일 파일을 가져와줘//

const categories = [
  // categories라는 이름으로 아래 목록을 저장할게//
  // const는 값을 저장하는 상자. 한 번 저장하면 바꿀 수 없는 상자라고 생각하면 됨//
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
// featuredClubs라는 이름으로 아래 목록을 저장할게//
// 소모임의 요약된 정보를 하나로 묶어서 저장함//
  {
    id: 1,
    // 아이디를 1로 설정(고유번호)//
    name: '핸들락 클라이밍',
    // 핸들락 클라이밍을 이름값으로 설정//
    description: '핸들락 클라이밍 Since 23.04.01 ✨ 신규회원 모집 중',
    // 설명//
    category: '운동/스포츠',
    // 카테고리 설정//
    region: '서울 서초구',
    // 지역 설정//
    members: 55,
    // 회원 수//
    image: 'https://images.unsplash.com/photo-1508264165352-258a6ca130fa?auto=format&fit=crop&w=900&q=70'
  },
    // 이미지 주소 쉼표로 소모임을 나눠줌//
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
  // function 함수 -> 특정 작업을 수행하는 코드 묶음//
  // HomePage라는 이름의 함수를 만들기 시작//
  const navigate = useNavigate()
  // navigate이라는 이름으로 저장//
  const [selectedRegion, setSelectedRegion] = useState('서울특별시')
  // 1. 선택된 지역을 저장하는 seletedRegion과, 그걸 바꾸는 함수 setSelectedRegion을 만들어//
  // 2. 처음에는 서울특별시로 시작//
  // 3. 아래 내용도 마찬가지로 서초구, 20대 값으로 설정되어 있고 searchValue는 값이 비어있는 상태에서 시작//
  const [selectedDistrict, setSelectedDistrict] = useState('서초구')
  const [ageRange, setAgeRange] = useState('20대')
  const [searchValue, setSearchValue] = useState('')

  const handleSearchSubmit = (event) => {
  // 검색 버튼을 눌렀을 때 실행될 함수를 만듦//
    event.preventDefault()
    // 위에 검색 버튼 눌렀을때 기본 동작을 막아라인데, chat GPT에서는 폼 제출 시 페이지가 새로고침되는 것을 막음이라고 함//
    navigate('/clubs', {
    // clubs페이지로 이동
      state: {
      // state: 이거는 state라는 이름으로 데이터를 전달 {} 여기에 해당된 데이터 아래 코드
        region: `${selectedRegion} ${selectedDistrict}`,
        // 지역: 변수(지역), 변수(구)
        // ' 장하람은 ${}, ${}에 살고 있어요' -> 장하람은 어디 지역에 어디 구에 살고 있어요 '어디'가 늘 변수가 생길 수 있다는 의미임.
        type: 'all',
        // type 속성에 'all'이라는 값 저장
        keyword: searchValue
        // 검색어: 검색창에 입력된 값
      }
    })
  }

  return (
  // 화면에 보여줄 x를 작성
    <div className="home-desktop">
      <header className="top-nav">
        <div className="logo" onClick={() => navigate('/')}>ANT</div>
        {/* 로고인 ANT에 클릭이 발생하면 '/'->홈으로 이동하게 된다는 의미 */}
        <div className="nav-controls">
          <RegionSelector
            selectedRegion={selectedRegion}
            selectedDistrict={selectedDistrict}
            onRegionChange={setSelectedRegion}
            onDistrictChange={setSelectedDistrict}
            // 지역 선택 컴포넌트를 사용하고, 필요한 데이터와 함수들을 전달
          />
          <select value={ageRange} onChange={(e) => setAgeRange(e.target.value)}>
            {/* 연령대 선택 박스. 선택이 바뀌면 ageRange 값도 바뀜 */}
            <option>20대</option>
            <option>30대</option>
            <option>40대</option>
            <option>50대+</option>
          </select>
          {/* 20대~50대+ 중에서 선택이 가능하다는 의미 */}
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
            <button>⭐ 온라인</button>
            <button>🏆 오프라인</button>
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
              <h1>작지만 지혜롭게, 함께 준비하는 우리</h1>
              <p>
                Ant는 성경 잠언의 개미처럼, 작지만 지혜롭게 미래를 준비하는 사람들의 모임입니다.
                개미는 감독자 없이도 스스로 움직이고, 여름에 겨울을 준비합니다.
                우리도 마찬가지로 하나님이 주신 몸과 마음을 성실히 가꾸고, 서로의 지혜를 나누며 함께 성장합니다.
                <br />
                <br />
                <div>"게으른 자여, 개미에게 가서 그 하는 것을 보고 지혜를 얻으라"</div>
              </p>
              <button className="hero-region" onClick={() => navigate('/clubs', { state: { region: `${selectedRegion} ${selectedDistrict}`, type: 'all' } })}>
                📍 {selectedRegion} {selectedDistrict} 근처 모임
              </button>
            </div>
            <div className="hero-media">
              <AdSlider />
            </div>
          </section>

          <section className="featured-section">
            <header className="section-header">
              <h2>활동이 활발한 모임</h2>
              <button className="more-btn" onClick={() => navigate('/clubs/active')}>
                상세 보기 →
              </button>
            </header>
            <div className="club-grid">
              {featuredClubs.map((club) => (
                <div
                  key={club.id}
                  className="club-card"
                  onClick={() => navigate('/clubs/active', { state: { clubId: club.id } })}
                >
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