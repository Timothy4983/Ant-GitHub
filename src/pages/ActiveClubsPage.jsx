import { useNavigate, useLocation } from 'react-router-dom'
// useNavigate: 페이지 이동을 위한 함수를 가져옴
// useLocation: 현재 페이지의 위치 정보를 가져옴
import './ActiveClubsPage.css'
// CSS 스타일 파일을 가져옴

// ==================== 데이터 정의 ====================

// 1. 소모임 피드 데이터 (인스타그램 스타일)
// 2. 각 피드는 id, 클럽명, 내용, 이미지, 좋아요 수, 댓글 수, 시간 정보를 가짐
const activeFeeds = [
  {
    id: 1, // 피드 고유 번호
    club: 'SERENE life', // 소모임 이름
    caption: '새로운 시즌 룩북 촬영 완료! 이번 주말 첫 정모에서 공개됩니다 ✨', // 피드 내용
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=70', // 피드 이미지 URL
    likes: 218, // 좋아요 개수
    comments: 14, // 댓글 개수
    time: '3시간 전' // 게시 시간
  },
  {
    id: 2,
    club: 'Fall in run',
    caption: '잠실한강 나이트런 완주! 모두 7km 성공 🙌',
    image: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=900&q=70',
    likes: 304,
    comments: 22,
    time: '5시간 전'
  },
  {
    id: 3,
    club: '동네에서 보드게임 한판!!',
    caption: '신상 전략 게임 "뮤즈" 플레이 후기 공유해요 🎲',
    image: 'https://images.unsplash.com/photo-1457694587812-e8bf29a43845?auto=format&fit=crop&w=900&q=70',
    likes: 156,
    comments: 11,
    time: '어제'
  },
  {
    id: 4,
    club: 'Team for Rest 백패커즈',
    caption: '가을 새벽 감성. 파노라마 사진으로 남겨 봤어요 🍂',
    image: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=900&q=70',
    likes: 267,
    comments: 31,
    time: '2일 전'
  },
  {
    id: 5,
    club: '훈남훈녀들의 라온제나',
    caption: '비건 디저트 카페 정모 성공! 다음 주 워크숍 기대 중',
    image: 'https://images.unsplash.com/photo-1514516870926-20782188779c?auto=format&fit=crop&w=900&q=70',
    likes: 188,
    comments: 15,
    time: '3일 전'
  },
  {
    id: 6,
    club: 'S&M 스터디',
    caption: '이번 주 발표자 현재 준비 중 🔥 취업 준비도 함께!',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=70',
    likes: 96,
    comments: 8,
    time: '3일 전'
  }
]

// 소모임 운영진(리더) 정보
// 리더와 모더레이터의 이름, 역할, 뱃지 정보를 저장
const leadMembers = [
  { id: 1, name: '듀듀', role: '휴식도 일처럼!', badge: '리더' }, // 리더 정보
  { id: 2, name: '이준호', role: '한강 러너', badge: '모더레이터' } // 모더레이터 정보
]

// 소모임 활동 멤버 목록
// 최근 가입한 멤버들의 정보와 상태 메시지
const memberActivities = [
  { id: 1, name: '듀듀', badge: 'Premium Sponsor', status: 'NEW', message: '하.공 든 모임과 만남💛' },
  // badge: 특별 뱃지 (프리미엄 스폰서)
  // status: 'NEW'는 신규 가입 멤버
  // message: 멤버의 상태 메시지
  { id: 2, name: '이은호', status: 'NEW', message: '✨' },
  { id: 3, name: '용용', status: 'NEW', message: '☕️' },
  { id: 4, name: '철', status: 'NEW', message: '🔥' },
  { id: 5, name: '김진우', status: 'NEW', message: 'gg' },
  { id: 6, name: '배리', status: 'NEW', message: '슬라이다-' },
  { id: 7, name: '브링업토큐', status: 'NEW', message: '안녕하세요' }
]

// 비슷한 소모임 추천 목록
// 현재 보고 있는 소모임과 비슷한 다른 소모임들
const similarClubs = [
  {
    id: 1,
    title: '[신입환영] 💗 버킷리스트 💗', // 소모임 제목
    description: '바쁜 일상 속에서도 하나씩 이루어가는 버킷리스트 프로젝트!', // 소모임 설명
    tags: ['사교/인맥', '챌린지'], // 해시태그
    region: '서울 송파구', // 활동 지역
    members: 53, // 멤버 수
    cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=70' // 커버 이미지
  },
  {
    id: 2,
    title: '84년쯤띠 찐짝이는 즐겁다 🐷',
    description: '강동·송파·강남 취미연합, 가입후 바로 정모 참여 가능!',
    tags: ['사교/인맥', '맛집', '카페'],
    region: '서울 송파구',
    members: 91,
    cover: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=70'
  },
  {
    id: 3,
    title: 'Promise.U(여행.혼남혼녀)',
    description: '남성 0/여성 안받음 🤍 여행과 인연을 동시에!',
    tags: ['여행', '힐링', '인연'],
    region: '서울 송파구',
    members: 26,
    cover: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=70'
  },
  {
    id: 4,
    title: '💕 투게더 Together 💕',
    description: '대학생/직장인 정모! 실시간(20시~) 가입 급구 💗',
    tags: ['정모', '사교', '대학생'],
    region: '서울 송파구',
    members: 121,
    cover: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=70'
  }
]

// ==================== 메인 컴포넌트 ====================

function ActiveClubsPage() {
  // 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate()

  // 현재 페이지 위치 정보
  // location.state에는 이전 페이지에서 전달받은 데이터가 들어있음
  const location = useLocation()

  // 이전 페이지에서 전달받은 클럽 ID
  // ?. 는 옵셔널 체이닝 (값이 없으면 undefined 반환)
  const focusedClubId = location.state?.clubId

  return (
    // 전체 페이지를 감싸는 div
    <div className="active-page">

      {/* ==================== 헤더 영역 ==================== */}
      <header className="active-header">
        {/* 뒤로가기 버튼 */}
        {/* navigate(-1): 이전 페이지로 이동 */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← 뒤로
        </button>

        {/* 제목 영역 */}
        <div>
          <h1>활동이 활발한 모임</h1>
          {/* focusedClubId가 있을 때만 부제목 표시 */}
          {/* &&는 조건부 렌더링: focusedClubId가 true일 때만 뒤의 내용 표시 */}
          {focusedClubId && <p className="active-subtitle">선택한 모임 #{focusedClubId} 요약</p>}
        </div>

        {/* 전체 보기 버튼 */}
        {/* clubs 페이지로 이동 */}
        <button className="action-btn" onClick={() => navigate('/clubs')}>
          소모임 전체 보기
        </button>
      </header>

      {/* ==================== 피드 섹션 ==================== */}
      {/* 소모임 인스타그램 스타일 피드 영역 */}
      <section className="active-feed-section">
        {/* 섹션 헤더 */}
        <header className="section-header">
          <h2>소모임 인스타그램 피드</h2>
          <span className="section-caption">멤버들이 공유한 최신 사진과 활동 기록</span>
        </header>

        {/* 피드 그리드 (여러 피드를 격자 형태로 배치) */}
        <div className="feed-grid">
          {/* activeFeeds 배열을 map으로 반복하며 각 피드를 화면에 표시 */}
          {/* map: 배열의 각 항목을 하나씩 꺼내서 새로운 형태로 변환 */}
          {activeFeeds.map((feed) => (
            // 각 피드 카드
            // key={feed.id}: React가 각 항목을 구분하기 위해 필요 (필수!)
            <article key={feed.id} className="feed-card">
              {/* 피드 이미지 */}
              {/* style={{ backgroundImage: `url(...)` }}: 배경 이미지로 설정 */}
              {/* 백틱(`)과 ${}를 사용해서 변수를 문자열에 넣음 */}
              <div className="feed-image" style={{ backgroundImage: `url(${feed.image})` }} />

              {/* 피드 정보 영역 */}
              <div className="feed-info">
                {/* 소모임 이름 */}
                <div className="feed-club">{feed.club}</div>

                {/* 피드 내용 */}
                <p className="feed-caption">{feed.caption}</p>

                {/* 좋아요, 댓글, 시간 정보 */}
                <div className="feed-meta">
                  <span>❤️ {feed.likes}</span> {/* 좋아요 수 */}
                  <span>💬 {feed.comments}</span> {/* 댓글 수 */}
                  <span>🕒 {feed.time}</span> {/* 게시 시간 */}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ==================== 멤버 섹션 ==================== */}
      {/* 운영진과 활동 멤버 정보 표시 */}
      <section className="member-section">
        {/* 섹션 헤더 */}
        <header className="section-header">
          <h2>운영진 & 활동 멤버</h2>
        </header>

        {/* 운영진(리더) 그리드 */}
        <div className="leader-grid">
          {/* leadMembers 배열을 map으로 반복하며 각 리더 표시 */}
          {leadMembers.map((leader) => (
            <div key={leader.id} className="leader-card">
              {/* 리더 아바타 (개미 이모지) */}
              <div className="leader-avatar">🐜</div>

              {/* 리더 정보 */}
              <div>
                <div className="leader-name">{leader.name}</div> {/* 이름 */}
                <div className="leader-role">{leader.role}</div> {/* 역할 */}
              </div>

              {/* 리더 뱃지 (리더, 모더레이터) */}
              <span className="leader-badge">{leader.badge}</span>
            </div>
          ))}
        </div>

        {/* 일반 멤버 목록 */}
        <div className="member-list">
          {/* 멤버 수 표시 */}
          {/* memberActivities.length: 배열 길이 (멤버 수) */}
          {/* + 11: 추가 멤버 수 (화면에 안 보이는 멤버) */}
          <div className="member-count">모임 멤버 {memberActivities.length + 11} · 최근 가입순 🔄</div>

          {/* memberActivities 배열을 map으로 반복하며 각 멤버 표시 */}
          {memberActivities.map((member) => (
            <div key={member.id} className="member-item">
              {/* 멤버 아바타 (웃는 얼굴 이모지) */}
              <div className="member-avatar">🙂</div>

              {/* 멤버 정보 */}
              <div className="member-info">
                {/* 멤버 이름과 뱃지 */}
                <div className="member-name">
                  {member.name} {/* 멤버 이름 */}

                  {/* member.badge가 있을 때만 뱃지 표시 */}
                  {/* && 조건부 렌더링 */}
                  {member.badge && <span className="member-badge">{member.badge}</span>}

                  {/* NEW 상태 표시 */}
                  <span className="member-status">{member.status}</span>
                </div>

                {/* 멤버 상태 메시지 */}
                <div className="member-message">{member.message}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 비슷한 모임 섹션 ==================== */}
      {/* 추천 소모임 목록 */}
      <section className="similar-section">
        {/* 섹션 헤더 */}
        <header className="section-header">
          <h2>비슷한 모임</h2>
        </header>

        {/* 비슷한 모임 목록 */}
        <div className="similar-list">
          {/* similarClubs 배열을 map으로 반복하며 각 추천 모임 표시 */}
          {similarClubs.map((club) => (
            // 클릭하면 clubs 페이지로 이동
            <article key={club.id} className="similar-card" onClick={() => navigate('/clubs')}>
              {/* 소모임 커버 이미지 */}
              <div className="similar-cover" style={{ backgroundImage: `url(${club.cover})` }} />

              {/* 소모임 정보 */}
              <div className="similar-body">
                {/* 소모임 제목 */}
                <div className="similar-title">{club.title}</div>

                {/* 소모임 설명 */}
                <p className="similar-description">{club.description}</p>

                {/* 해시태그들 */}
                <div className="similar-tags">
                  {/* club.tags 배열을 map으로 반복하며 각 태그 표시 */}
                  {club.tags.map((tag) => (
                    // key={tag}: 태그 이름을 key로 사용
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>

                {/* 지역과 멤버 수 정보 */}
                <div className="similar-meta">
                  <span>📍 {club.region}</span> {/* 활동 지역 */}
                  <span>👥 멤버 {club.members}</span> {/* 멤버 수 */}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

// 이 컴포넌트를 다른 파일에서 import해서 사용할 수 있게 내보냄
export default ActiveClubsPage