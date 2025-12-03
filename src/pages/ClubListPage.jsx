import { useState, useEffect } from 'react'
// useState: 상태를 관리하기 위한 React Hook
// useEffect: 컴포넌트가 렌더링될 때나 특정 값이 변경될 때 실행되는 Hook
import { useLocation, useNavigate } from 'react-router-dom'
// useLocation: 현재 페이지의 위치 정보(state 등)를 가져오는 Hook
// useNavigate: 다른 페이지로 이동하기 위한 함수를 제공하는 Hook
import RegionSelector from '../components/RegionSelector'
// RegionSelector 컴포넌트를 가져옴 (지역 선택 드롭다운)
import './ClubListPage.css'
// CSS 스타일 파일을 가져옴

// ==================== 더미 데이터 ====================

// 소모임 목록 더미 데이터
// 실제 프로젝트에서는 서버(API)에서 받아오는 데이터
// 여기서는 테스트용으로 하드코딩된 데이터 사용
const dummyClubs = [
  {
    id: 1, // 소모임 고유 번호
    name: '독서 토론 모임', // 소모임 이름
    type: 'offline', // 모임 타입 (online/offline)
    region: '서울', // 활동 지역
    description: '매주 책을 읽고 함께 토론하는 모임입니다.', // 소모임 설명
    members: 15, // 멤버 수
    tags: ['독서', '토론', '성장'] // 해시태그
  },
  {
    id: 2,
    name: '온라인 영어 스터디',
    type: 'online', // 온라인 모임
    region: '전체', // 지역 제한 없음
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

// ==================== 메인 컴포넌트 ====================

function ClubListPage() {
  // 현재 페이지 위치 정보 가져오기
  const location = useLocation()

  // 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate()

  // === 상태 관리 ===

  // 선택된 지역 상태
  // location.state?.region: 이전 페이지에서 전달받은 지역 정보
  // || '전체': 없으면 '전체'를 기본값으로
  // ?. 는 옵셔널 체이닝 (location.state가 없으면 undefined 반환)
  const [selectedRegion, setSelectedRegion] = useState(location.state?.region || '전체')

  // 선택된 모임 타입 상태 (all/online/offline)
  // location.state?.type: 이전 페이지에서 전달받은 타입 정보
  // || 'all': 없으면 'all'을 기본값으로
  const [clubType, setClubType] = useState(location.state?.type || 'all')

  // 필터링된 소모임 목록 상태
  // 처음엔 전체 소모임 목록(dummyClubs)으로 시작
  const [filteredClubs, setFilteredClubs] = useState(dummyClubs)

  // === 필터링 로직 ===

  // useEffect: selectedRegion이나 clubType이 변경될 때마다 실행
  // [selectedRegion, clubType]: 이 값들이 바뀔 때만 실행 (의존성 배열)
  useEffect(() => {
    // 1. 전체 소모임 목록으로 시작
    let filtered = dummyClubs

    // 2. 지역 필터 적용
    // selectedRegion이 '전체'가 아니면 해당 지역만 필터링
    if (selectedRegion !== '전체') {
      // filter: 조건에 맞는 항목만 새 배열로 만듦
      // club.region === selectedRegion: 지역이 일치하는 것만
      filtered = filtered.filter(club => club.region === selectedRegion)
    }

    // 3. 타입 필터 적용
    // clubType이 'all'이 아니면 해당 타입만 필터링
    if (clubType !== 'all') {
      // club.type === clubType: 타입이 일치하는 것만
      filtered = filtered.filter(club => club.type === clubType)
    }

    // 4. 필터링된 결과를 상태에 저장
    setFilteredClubs(filtered)
  }, [selectedRegion, clubType])
  // 의존성 배열: selectedRegion이나 clubType이 변경될 때만 이 useEffect 실행

  // === 이벤트 핸들러 ===

  // 소모임 카드 클릭 시 상세 페이지로 이동
  const handleClubClick = (clubId) => {
    // /clubs/1, /clubs/2 등의 경로로 이동
    // 백틱(`)과 ${}로 동적 URL 생성
    navigate(`/clubs/${clubId}`)
  }

  // ==================== 렌더링 ====================

  return (
    // 전체 페이지를 감싸는 div
    <div className="club-list-page">

      {/* ==================== 헤더 영역 ==================== */}
      <header className="club-list-header">
        {/* 뒤로가기 버튼 */}
        {/* navigate('/'): 홈페이지로 이동 */}
        <button className="back-button" onClick={() => navigate('/')}>
          ← 뒤로
        </button>

        {/* 페이지 제목 */}
        <h2>소모임 목록</h2>
      </header>

      {/* ==================== 본문 영역 ==================== */}
      <div className="club-list-content">

        {/* === 지역 선택 컴포넌트 === */}
        {/* RegionSelector: 지역을 선택하는 드롭다운 컴포넌트 */}
        <RegionSelector
          selectedRegion={selectedRegion}
          // selectedRegion: 현재 선택된 지역을 전달
          onRegionChange={setSelectedRegion}
        // onRegionChange: 지역이 변경되면 setSelectedRegion 실행
        />

        {/* === 모임 타입 선택 버튼들 === */}
        <div className="club-type-selector">
          {/* 전체 버튼 */}
          {/* className에 조건부로 'active' 클래스 추가 */}
          {/* clubType === 'all'이면 'club-type-btn active', 아니면 'club-type-btn' */}
          <button
            className={`club-type-btn ${clubType === 'all' ? 'active' : ''}`}
            onClick={() => setClubType('all')}
          // 클릭하면 clubType을 'all'로 변경
          >
            전체
          </button>

          {/* 온라인 버튼 */}
          <button
            className={`club-type-btn ${clubType === 'online' ? 'active' : ''}`}
            onClick={() => setClubType('online')}
          // 클릭하면 clubType을 'online'으로 변경
          >
            온라인
          </button>

          {/* 오프라인 버튼 */}
          <button
            className={`club-type-btn ${clubType === 'offline' ? 'active' : ''}`}
            onClick={() => setClubType('offline')}
          // 클릭하면 clubType을 'offline'으로 변경
          >
            오프라인
          </button>
        </div>

        {/* === 소모임 목록 === */}
        <div className="club-list">
          {/* 조건부 렌더링: 필터링된 소모임이 있는지 확인 */}
          {/* 삼항 연산자: 조건 ? 참일때 : 거짓일때 */}
          {filteredClubs.length === 0 ? (
            // 소모임이 없을 때 (filteredClubs.length === 0)
            <div className="no-clubs">
              <p>조건에 맞는 소모임이 없습니다.</p>
            </div>
          ) : (
            // 소모임이 있을 때
            // filteredClubs 배열을 map으로 반복하며 각 소모임 카드 표시
            filteredClubs.map((club) => (
              // key={club.id}: 각 카드를 구분하기 위한 고유 키
              <div
                key={club.id}
                className="club-card"
                onClick={() => handleClubClick(club.id)}
              // 클릭하면 해당 소모임의 상세 페이지로 이동
              >
                {/* 소모임 카드 헤더 (이름 + 타입 뱃지) */}
                <div className="club-card-header">
                  {/* 소모임 이름 */}
                  <h3 className="club-name">{club.name}</h3>

                  {/* 온라인/오프라인 뱃지 */}
                  {/* className에 club.type을 추가해서 online/offline에 따라 다른 스타일 */}
                  <span className={`club-type-badge ${club.type}`}>
                    {/* 삼항 연산자로 텍스트 결정 */}
                    {club.type === 'online' ? '온라인' : '오프라인'}
                    {/* club.type이 'online'이면 '온라인', 아니면 '오프라인' */}
                  </span>
                </div>

                {/* 소모임 설명 */}
                <p className="club-description">{club.description}</p>

                {/* 소모임 정보 (지역, 멤버 수) */}
                <div className="club-info">
                  <span className="club-region">📍 {club.region}</span> {/* 지역 */}
                  <span className="club-members">👥 {club.members}명</span> {/* 멤버 수 */}
                </div>

                {/* 해시태그들 */}
                <div className="club-tags">
                  {/* club.tags 배열을 map으로 반복하며 각 태그 표시 */}
                  {/* map((항목, 인덱스) => ...) */}
                  {club.tags.map((tag, index) => (
                    // key={index}: 각 태그를 구분하기 위한 고유 키
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

// 이 컴포넌트를 다른 파일에서 import해서 사용할 수 있게 내보냄
export default ClubListPage