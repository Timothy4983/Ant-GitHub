import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ClubDetailPage.css'

// 더미 데이터
const dummyClubData = {
  1: {
    id: 1,
    name: '독서 토론 모임',
    type: 'offline',
    region: '서울',
    description: '매주 책을 읽고 함께 토론하는 모임입니다. 다양한 주제의 책을 읽으며 서로의 생각을 나누고 성장합니다.',
    members: 15,
    tags: ['독서', '토론', '성장'],
    feed: [
      {
        id: 1,
        author: '김개미',
        content: '이번 주 읽은 책이 정말 인상 깊었어요! 다음 모임이 기대됩니다.',
        image: null,
        likes: 12,
        comments: 3,
        time: '2시간 전'
      },
      {
        id: 2,
        author: '이개미',
        content: '토론 시간에 나눈 이야기들이 너무 좋았습니다. 모두의 의견이 다 달라서 흥미로웠어요.',
        image: null,
        likes: 8,
        comments: 5,
        time: '5시간 전'
      },
      {
        id: 3,
        author: '박개미',
        content: '오늘 모임 사진입니다!',
        image: 'https://via.placeholder.com/400x300?text=Meeting+Photo',
        likes: 20,
        comments: 7,
        time: '1일 전'
      }
    ]
  },
  2: {
    id: 2,
    name: '온라인 영어 스터디',
    type: 'online',
    region: '전체',
    description: '화상으로 함께 영어 공부하는 모임입니다. 매일 단어를 외우고 주간으로 회화 연습을 합니다.',
    members: 23,
    tags: ['영어', '스터디', '온라인'],
    feed: [
      {
        id: 1,
        author: '최개미',
        content: '오늘 배운 표현들을 정리했습니다. 함께 공부해요!',
        image: null,
        likes: 15,
        comments: 5,
        time: '1일 전'
      }
    ]
  },
  3: {
    id: 3,
    name: '러닝 크루',
    type: 'offline',
    region: '경기',
    description: '주말마다 함께 달리는 건강한 모임입니다. 초보자도 환영합니다!',
    members: 30,
    tags: ['운동', '러닝', '건강'],
    feed: [
      {
        id: 1,
        author: '이개미',
        content: '오늘 아침 달리기 완주했습니다! 모두 화이팅! 🏃‍♂️',
        image: 'https://via.placeholder.com/400x300?text=Running+Photo',
        likes: 25,
        comments: 8,
        time: '4시간 전'
      }
    ]
  },
  4: {
    id: 4,
    name: '코딩 스터디 그룹',
    type: 'online',
    region: '전체',
    description: '프로그래밍을 함께 배우고 공유하는 모임입니다.',
    members: 18,
    tags: ['코딩', '개발', '온라인'],
    feed: [
      {
        id: 1,
        author: '정개미',
        content: '오늘 프로젝트 완성했습니다! 코드 리뷰 부탁드려요.',
        image: 'https://via.placeholder.com/400x300?text=Code+Project',
        likes: 40,
        comments: 15,
        time: '1일 전'
      }
    ]
  },
  5: {
    id: 5,
    name: '예술 창작 모임',
    type: 'offline',
    region: '서울',
    description: '그림, 글쓰기 등 창작 활동을 함께하는 모임입니다.',
    members: 12,
    tags: ['예술', '창작', '취미'],
    feed: [
      {
        id: 1,
        author: '박개미',
        content: '오늘 그린 그림입니다. 피드백 부탁드려요!',
        image: 'https://via.placeholder.com/400x400?text=Art+Work',
        likes: 30,
        comments: 12,
        time: '6시간 전'
      }
    ]
  },
  6: {
    id: 6,
    name: 'S&M 스터디',
    type: 'online',
    region: '서울',
    description: '취업과 자기계발을 위한 스터디를 함께 진행합니다.',
    members: 60,
    tags: ['스터디', '커리어', '네트워킹'],
    feed: [
      {
        id: 1,
        author: '정개미',
        content: '이번 주 면접 스터디 자료를 공유합니다.',
        image: null,
        likes: 18,
        comments: 6,
        time: '3시간 전'
      },
      {
        id: 2,
        author: '서개미',
        content: '스터디원들과 함께한 워크숍 사진입니다!',
        image: 'https://via.placeholder.com/400x300?text=Workshop',
        likes: 22,
        comments: 9,
        time: '1일 전'
      }
    ]
  }
}

function ClubDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(false)
  const club = dummyClubData[parseInt(id)]

  if (!club) {
    return (
      <div className="club-detail-page">
        <div className="no-club">소모임을 찾을 수 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="club-detail-page">
      <header className="club-detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← 뒤로
        </button>
        <h2>소모임 상세</h2>
        <button
          className={`like-button ${isLiked ? 'liked' : ''}`}
          onClick={() => setIsLiked(!isLiked)}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
      </header>

      <div className="club-detail-content">
        <div className="club-info-section">
          <div className="club-header-info">
            <h1 className="club-title">{club.name}</h1>
            <span className={`club-type-badge ${club.type}`}>
              {club.type === 'online' ? '온라인' : '오프라인'}
            </span>
          </div>
          <p className="club-full-description">{club.description}</p>
          <div className="club-meta">
            <span>📍 {club.region}</span>
            <span>👥 {club.members}명</span>
          </div>
          <div className="club-tags">
            {club.tags.map((tag, index) => (
              <span key={index} className="club-tag">{tag}</span>
            ))}
          </div>
          <button className="join-button">소모임 참여하기</button>
        </div>

        <div className="club-feed-section">
          <h3 className="feed-title">소모임 피드</h3>
          <div className="feed-list">
            {club.feed.map((post) => (
              <div key={post.id} className="feed-post">
                <div className="post-header">
                  <div className="post-author-info">
                    <div className="author-avatar">🐜</div>
                    <div>
                      <div className="author-name">{post.author}</div>
                      <div className="post-time">{post.time}</div>
                    </div>
                  </div>
                </div>
                <div className="post-content">{post.content}</div>
                {post.image && (
                  <div className="post-image">
                    <img src={post.image} alt="Post" />
                  </div>
                )}
                <div className="post-actions">
                  <button className="action-btn">
                    <span>❤️</span> {post.likes}
                  </button>
                  <button className="action-btn">
                    <span>💬</span> {post.comments}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClubDetailPage

