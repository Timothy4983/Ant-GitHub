import { useNavigate, useLocation } from 'react-router-dom'
import './ActiveClubsPage.css'

const activeFeeds = [
  {
    id: 1,
    club: 'SERENE life',
    caption: '새로운 시즌 룩북 촬영 완료! 이번 주말 첫 정모에서 공개됩니다 ✨',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=70',
    likes: 218,
    comments: 14,
    time: '3시간 전'
  },
  {
    id: 2,
    club: 'Fall in run',
    caption: '잡일한강 나이트런 완주! 모두 7km 성공 🙌',
    image: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=900&q=70',
    likes: 304,
    comments: 22,
    time: '5시간 전'
  },
  {
    id: 3,
    club: '동네에서 보드게임 한판!!',
    caption: '신상 전략 게임 “뮤즈” 플레이 후기 공유해요 🎲',
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

const leadMembers = [
  { id: 1, name: '듀듀', role: '휴식도 일처럼!', badge: '리더' },
  { id: 2, name: '이준호', role: '한강 러너', badge: '모더레이터' }
]

const memberActivities = [
  { id: 1, name: '듀듀', badge: 'Premium Sponsor', status: 'NEW', message: '하.공 든 모임과 만남💛' },
  { id: 2, name: '이은호', status: 'NEW', message: '✨' },
  { id: 3, name: '용용', status: 'NEW', message: '☕️' },
  { id: 4, name: '철', status: 'NEW', message: '🔥' },
  { id: 5, name: '김진우', status: 'NEW', message: 'gg' },
  { id: 6, name: '배리', status: 'NEW', message: '슬라이다-' },
  { id: 7, name: '브링업토큐', status: 'NEW', message: '안녕하세요' }
]

const similarClubs = [
  {
    id: 1,
    title: '[신입환영] 💗 버킷리스트 💗',
    description: '바쁜 일상 속에서도 하나씩 이루어가는 버킷리스트 프로젝트!',
    tags: ['사교/인맥', '챌린지'],
    region: '서울 송파구',
    members: 53,
    cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=70'
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

function ActiveClubsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const focusedClubId = location.state?.clubId

  return (
    <div className="active-page">
      <header className="active-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← 뒤로
        </button>
        <div>
          <h1>활동이 활발한 모임</h1>
          {focusedClubId && <p className="active-subtitle">선택한 모임 #{focusedClubId} 요약</p>}
        </div>
        <button className="action-btn" onClick={() => navigate('/clubs')}>
          소모임 전체 보기
        </button>
      </header>

      <section className="active-feed-section">
        <header className="section-header">
          <h2>소모임 인스타그램 피드</h2>
          <span className="section-caption">멤버들이 공유한 최신 사진과 활동 기록</span>
        </header>
        <div className="feed-grid">
          {activeFeeds.map((feed) => (
            <article key={feed.id} className="feed-card">
              <div className="feed-image" style={{ backgroundImage: `url(${feed.image})` }} />
              <div className="feed-info">
                <div className="feed-club">{feed.club}</div>
                <p className="feed-caption">{feed.caption}</p>
                <div className="feed-meta">
                  <span>❤️ {feed.likes}</span>
                  <span>💬 {feed.comments}</span>
                  <span>🕒 {feed.time}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="member-section">
        <header className="section-header">
          <h2>운영진 & 활동 멤버</h2>
        </header>
        <div className="leader-grid">
          {leadMembers.map((leader) => (
            <div key={leader.id} className="leader-card">
              <div className="leader-avatar">🐜</div>
              <div>
                <div className="leader-name">{leader.name}</div>
                <div className="leader-role">{leader.role}</div>
              </div>
              <span className="leader-badge">{leader.badge}</span>
            </div>
          ))}
        </div>
        <div className="member-list">
          <div className="member-count">모임 멤버 {memberActivities.length + 11} · 최근 가입순 🔄</div>
          {memberActivities.map((member) => (
            <div key={member.id} className="member-item">
              <div className="member-avatar">🙂</div>
              <div className="member-info">
                <div className="member-name">
                  {member.name}
                  {member.badge && <span className="member-badge">{member.badge}</span>}
                  <span className="member-status">{member.status}</span>
                </div>
                <div className="member-message">{member.message}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="similar-section">
        <header className="section-header">
          <h2>비슷한 모임</h2>
        </header>
        <div className="similar-list">
          {similarClubs.map((club) => (
            <article key={club.id} className="similar-card" onClick={() => navigate('/clubs')}>
              <div className="similar-cover" style={{ backgroundImage: `url(${club.cover})` }} />
              <div className="similar-body">
                <div className="similar-title">{club.title}</div>
                <p className="similar-description">{club.description}</p>
                <div className="similar-tags">
                  {club.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
                <div className="similar-meta">
                  <span>📍 {club.region}</span>
                  <span>👥 멤버 {club.members}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ActiveClubsPage


