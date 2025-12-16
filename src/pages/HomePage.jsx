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

// ==================== 카테고리 데이터 ====================

// categories: 소모임 카테고리 목록
// 아이콘과 라벨을 가진 객체들의 배열
const categories = [
  { icon: '💪', label: '운동/스포츠' }, // 운동/스포츠 카테고리
  { icon: '🤝', label: '사교/인맥' }, // 사교/인맥 카테고리
  { icon: '📖', label: '인문학/책/글' }, // 인문학/책/글 카테고리
  { icon: '🏕️', label: '아웃도어/여행' }, // 아웃도어/여행 카테고리
  { icon: '🎻', label: '음악/악기' }, // 음악/악기 카테고리
  { icon: '💼', label: '업종/직무' }, // 업종/직무 카테고리
  { icon: '🎭', label: '문화/공연/축제' }, // 문화/공연/축제 카테고리
  { icon: '🌍', label: '외국어/언어' }, // 외국어/언어 카테고리
  { icon: '🎮', label: '게임/오락' }, // 게임/오락 카테고리
  { icon: '🧵', label: '공예/만들기' }, // 공예/만들기 카테고리
  { icon: '💃', label: '댄스/무용' }, // 댄스/무용 카테고리
  { icon: '💗', label: '봉사/헬스' } // 봉사/헬스 카테고리
]

// ==================== 추천 소모임 데이터 ====================

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

// ==================== 메인 컴포넌트 ====================

function HomePage() {
  // function 함수 -> 특정 작업을 수행하는 코드 묶음//
  // HomePage라는 이름의 함수를 만들기 시작//

  // === 페이지 이동 ===
  const navigate = useNavigate()
  // navigate이라는 이름으로 저장//

  // === 상태 관리 ===
  const [selectedRegion, setSelectedRegion] = useState('서울특별시')
  // 1. 선택된 지역을 저장하는 seletedRegion과, 그걸 바꾸는 함수 setSelectedRegion을 만들어//
  // 2. 처음에는 서울특별시로 시작//
  // 3. 아래 내용도 마찬가지로 서초구, 20대 값으로 설정되어 있고 searchValue는 값이 비어있는 상태에서 시작//
  const [selectedDistrict, setSelectedDistrict] = useState('서초구')
  // 선택된 구 상태 (기본값: 서초구)
  const [ageRange, setAgeRange] = useState('20대')
  // 선택된 연령대 상태 (기본값: 20대)
  const [searchValue, setSearchValue] = useState('')
  // 검색창에 입력된 값 상태 (기본값: 빈 문자열)
  const [activeView, setActiveView] = useState('online')
  // 현재 활성화된 뷰 상태 (온라인/오프라인/최근) (기본값: online)

  // === 이벤트 핸들러 ===
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

  // ==================== 렌더링 ====================

  return (
    // 화면에 보여줄 x를 작성
    <div className="home-desktop">
      {/* 전체 홈페이지를 감싸는 컨테이너 */}

      {/* ==================== 상단 네비게이션 바 ==================== */}
      <header className="top-nav">
        {/* 헤더: 페이지 최상단 네비게이션 영역 */}

        {/* 로고 */}
        <div className="logo" onClick={() => navigate('/')}>ANT</div>
        {/* 로고인 ANT에 클릭이 발생하면 '/'->홈으로 이동하게 된다는 의미 */}

        {/* === 검색 및 필터 영역 === */}
        <div className="nav-controls">
          {/* 네비게이션 컨트롤: 지역, 연령대, 검색창을 묶은 영역 */}

          {/* 지역 선택 컴포넌트 */}
          <RegionSelector
            selectedRegion={selectedRegion}
            // RegionSelector에 현재 선택된 지역을 전달
            selectedDistrict={selectedDistrict}
            // RegionSelector에 현재 선택된 구를 전달
            onRegionChange={setSelectedRegion}
            // 지역이 변경되면 setSelectedRegion 함수 실행
            onDistrictChange={setSelectedDistrict}
          // 구가 변경되면 setSelectedDistrict 함수 실행
          // 지역 선택 컴포넌트를 사용하고, 필요한 데이터와 함수들을 전달
          />

          {/* 연령대 선택 드롭다운 */}
          <select value={ageRange} onChange={(e) => setAgeRange(e.target.value)}>
            {/* 연령대 선택 박스. 선택이 바뀌면 ageRange 값도 바뀜 */}
            {/* value={ageRange}: 현재 선택된 값 표시 */}
            {/* onChange: 선택이 바뀔 때 실행 */}
            {/* e.target.value: 선택된 option의 값 */}
            <option>20대</option>
            <option>30대</option>
            <option>40대</option>
            <option>50대+</option>
          </select>
          {/* 20대~50대+ 중에서 선택이 가능하다는 의미 */}

          {/* 검색 폼 */}
          <form className="search-form" onSubmit={handleSearchSubmit}>
            {/* form: 검색창과 버튼을 묶은 폼 */}
            {/* onSubmit: 엔터 누르거나 버튼 클릭 시 handleSearchSubmit 실행 */}

            {/* 검색 입력창 */}
            <input
              type="text"
              // input 타입: 텍스트
              placeholder="찾고 싶은 모임을 검색해보세요! (ex 러닝, 독서)"
              // placeholder: 입력창에 아무것도 없을 때 보이는 안내 텍스트
              value={searchValue}
              // value: 현재 입력된 값 (searchValue 상태와 연결)
              onChange={(e) => setSearchValue(e.target.value)}
            // onChange: 입력할 때마다 실행
            // e.target.value: 현재 입력된 값
            // setSearchValue로 상태 업데이트
            />

            {/* 검색 버튼 */}
            <button type="submit">🔍</button>
            {/* type="submit": 폼 제출 버튼 (엔터키로도 실행 가능) */}
          </form>
        </div>

        {/* === 우측 액션 버튼들 === */}
        <div className="nav-actions">
          {/* 네비게이션 액션: 우측 아이콘 버튼들을 묶은 영역 */}

          {/* 검색 버튼 */}
          <button className="icon-btn" aria-label="검색">
            {/* aria-label: 스크린 리더를 위한 설명 (접근성) */}
            🔍
          </button>

          {/* 알림 버튼 */}
          <button className="icon-btn" aria-label="알림">
            🔔
          </button>

          {/* 프로필 버튼 */}
          <button className="icon-btn" aria-label="내 프로필">
            🙂
          </button>

          {/* 로그인 버튼 */}
          <button className="login-btn" onClick={() => navigate('/login')}>로그인</button>
        </div>
      </header>

      {/* ==================== 본문 영역 ==================== */}
      <div className="home-body">
        {/* 홈 본문: 헤더 아래 모든 내용을 감싸는 영역 */}

        <main className="main-content">
          {/* 메인 콘텐츠: 실제 내용이 들어가는 영역 */}

          {/* === 히어로 섹션 (메인 배너) === */}
          <section className="hero-section">
            {/* 섹션: 페이지를 의미별로 나누는 HTML 태그 */}
            {/* 히어로 섹션: 페이지 최상단의 큰 배너 영역 */}

            {/* 히어로 텍스트 영역 */}
            <div className="hero-text">
              {/* 제목 */}
              <h1>작지만 지혜롭게, 함께 준비하는 우리</h1>
              {/* h1: 가장 중요한 제목 태그 (한 페이지에 하나만 사용 권장) */}

              {/* 설명 문구 */}
              <p>
                Ant는 성경 잠언의 개미처럼, 작지만 지혜롭게 미래를 준비하는 사람들의 모임입니다.
                개미는 감독자 없이도 스스로 움직이고, 여름에 겨울을 준비합니다.
                우리도 마찬가지로 하나님이 주신 몸과 마음을 성실히 가꾸고, 서로의 지혜를 나누며 함께 성장합니다.
                <br />
                {/* br: 줄바꿈 태그 */}
                <br />
                <div>"게으른 자여, 개미에게 가서 그 하는 것을 보고 지혜를 얻으라"</div>
              </p>

              {/* 지역 근처 모임 버튼 */}
              <button className="hero-region" onClick={() => navigate('/clubs', { state: { region: `${selectedRegion} ${selectedDistrict}`, type: 'all' } })}>
                {/* 클릭하면 clubs 페이지로 이동하면서 지역 정보 전달 */}
                📍 {selectedRegion} {selectedDistrict} 근처 모임
                {/* 변수를 사용해서 동적으로 지역 표시 */}
              </button>
            </div>

            {/* 히어로 미디어 영역 (광고 슬라이더) */}
            <div className="hero-media">
              <AdSlider />
              {/* AdSlider 컴포넌트를 여기에 표시 */}
              {/* 광고나 이미지가 슬라이드되는 영역 */}
            </div>
          </section>

          {/* === 카테고리 섹션 === */}
          <section className="category-section">
            {/* 카테고리 그리드 */}
            <div className="category-grid">
              {/* categories 배열을 map으로 반복하며 각 카테고리 버튼 표시 */}
              {categories.map((category) => (
                // map: 배열의 각 항목을 하나씩 꺼내서 새로운 형태로 변환
                // category: 현재 반복 중인 카테고리 객체

                <button key={category.label} className="category-item">
                  {/* key: React가 각 항목을 구분하기 위해 필요 (필수!) */}
                  {/* category.label을 key로 사용 (고유한 값) */}

                  {/* 카테고리 아이콘 */}
                  <span className="category-icon">{category.icon}</span>
                  {/* category.icon: 각 카테고리의 이모지 */}

                  {/* 카테고리 라벨 */}
                  <span className="category-label">{category.label}</span>
                  {/* category.label: 각 카테고리의 텍스트 */}
                </button>
              ))}
            </div>
          </section>

          {/* === 뷰 전환 버튼 섹션 === */}
          <section className="view-switcher">
            {/* 온라인/오프라인/최근 본 모임을 전환하는 버튼들 */}

            <div className="view-buttons">
              {/* 버튼 목록을 배열로 만들고 map으로 반복 */}
              {[
                { key: 'online', label: '⭐ 온라인 모임' },
                // key: 버튼을 구분하는 고유 값
                // label: 버튼에 표시될 텍스트
                { key: 'offline', label: '🏆 오프라인 모임' },
                { key: 'recent', label: '🕒 최근 본 모임' }
              ].map((button) => (
                // 배열의 각 버튼 객체를 map으로 반복

                <button
                  key={button.key}
                  // key: React가 각 버튼을 구분하기 위해 필요
                  className={`view-button ${activeView === button.key ? 'active' : ''}`}
                  // className에 조건부로 'active' 클래스 추가
                  // activeView === button.key: 현재 활성화된 뷰가 이 버튼인지 확인
                  // true면 'view-button active', false면 'view-button'
                  onClick={() => setActiveView(button.key)}
                // 클릭하면 activeView를 이 버튼의 key로 변경
                >
                  {button.label}
                  {/* 버튼에 표시될 텍스트 */}
                </button>
              ))}
            </div>
          </section>

          {/* === 추천 소모임 섹션 === */}
          <section className="featured-section">
            {/* 섹션 헤더 */}
            <header className="section-header center">
              {/* center: 가운데 정렬 스타일 */}
              <h2>활동이 활발한 모임</h2>
              {/* h2: 두 번째 수준의 제목 */}
            </header>

            {/* 소모임 카드 그리드 */}
            <div className="club-grid">
              {/* featuredClubs 배열을 map으로 반복하며 각 소모임 카드 표시 */}
              {featuredClubs.map((club) => (
                // club: 현재 반복 중인 소모임 객체

                <div
                  key={club.id}
                  // key: 각 소모임을 구분하기 위한 고유 키 (id 사용)
                  className="club-card"
                  onClick={() => navigate('/clubs/active', { state: { clubId: club.id } })}
                // 클릭하면 /clubs/active 페이지로 이동하면서 clubId 전달
                >
                  {/* 소모임 이미지 */}
                  <div className="club-image" style={{ backgroundImage: `url(${club.image})` }} />
                  {/* style 속성에 직접 CSS 작성 */}
                  {/* backgroundImage: 배경 이미지 설정 */}
                  {/* url(): 이미지 URL을 넣는 CSS 함수 */}
                  {/* 백틱(`)과 ${}로 변수를 문자열에 삽입 */}

                  {/* 소모임 정보 */}
                  <div className="club-content">
                    {/* 소모임 제목 */}
                    <div className="club-title">{club.name}</div>

                    {/* 소모임 설명 */}
                    <div className="club-description">{club.description}</div>

                    {/* 소모임 메타 정보 (지역, 멤버 수) */}
                    <div className="club-meta">
                      <span>📍 {club.region}</span> {/* 지역 */}
                      <span>👥 {club.members}명</span> {/* 멤버 수 */}
                    </div>

                    {/* 소모임 카테고리 태그 */}
                    <div className="club-tag">#{club.category}</div>
                    {/* #을 붙여서 해시태그처럼 표시 */}
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

// 이 컴포넌트를 다른 파일에서 import해서 사용할 수 있게 내보냄
export default HomePage