import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './FeedPage.css'
// Set은 중복 없는 값들의 집합

// 더미 피드 데이터
const feedPosts = [
  {
    id: 1,
    clubName: '독서 토론 모임',
    author: '김개미',
    content: '이번 주 읽은 책이 정말 인상 깊었어요! 다음 모임이 기대됩니다.',
    image: null,
    likes: 12,
    comments: 3,
    time: '2시간 전',
    clubId: 1
  },
  {
    id: 2,
    clubName: '러닝 크루',
    author: '이개미',
    content: '오늘 아침 달리기 완주했습니다! 모두 화이팅! 🏃‍♂️',
    image: 'https://via.placeholder.com/400x300?text=Running+Photo',
    likes: 25,
    comments: 8,
    time: '4시간 전',
    clubId: 3
  },
  {
    id: 3,
    clubName: '예술 창작 모임',
    author: '박개미',
    content: '오늘 그린 그림입니다. 피드백 부탁드려요!',
    image: 'https://via.placeholder.com/400x400?text=Art+Work',
    likes: 30,
    comments: 12,
    time: '6시간 전',
    clubId: 5
  },
  {
    id: 4,
    clubName: '온라인 영어 스터디',
    author: '최개미',
    content: '오늘 배운 표현들을 정리했습니다. 함께 공부해요!',
    image: null,
    likes: 15,
    comments: 5,
    time: '1일 전',
    clubId: 2
  },
  {
    id: 5,
    clubName: '코딩 스터디 그룹',
    author: '정개미',
    content: '오늘 프로젝트 완성했습니다! 코드 리뷰 부탁드려요.',
    image: 'https://via.placeholder.com/400x300?text=Code+Project',
    likes: 40,
    comments: 15,
    time: '1일 전',
    clubId: 4
  }
]
// 1. 빈 Set 만들기
const mySet = new Set()

function FeedPage() {
  const navigate = useNavigate()
  const [likedPosts, setLikedPosts] = useState(new Set())
// 2. 값 추가하기
mySet.add(1)     // Set {1}
mySet.add(3)     // Set {1, 3}
mySet.add(5)     // Set {1, 3, 5}
mySet.add(1)     // Set {1, 3, 5} ← 1은 이미 있어서 추가 안 됨!

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }
// 3. 값이 있는지 확인
mySet.has(1)     // true (1이 있음)
mySet.has(2)     // false (2가 없음)

  const handleClubClick = (clubId) => {
    navigate(`/clubs/${clubId}`)
  }
// 4. 값 삭제하기
mySet.delete(3)  // Set {1, 5}

  return (
    <div className="feed-page">
      <header className="feed-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← 뒤로
        </button>
        <h2>피드</h2>
        <div style={{ width: '40px' }}></div>
      </header>
// 5. 크기 확인
mySet.size       // 2

      <div className="feed-content">
        <div className="feed-description">
          <p>다른 소모임들이 이번 주에 한 활동들을 확인해보세요!</p>
        </div>
// 실제 사용 예시:
const likedPosts = new Set()      // 빈 Set
likedPosts.add(1)                 // 1번 게시물 좋아요
likedPosts.add(3)                 // 3번 게시물 좋아요
likedPosts.has(1)                 // true (1번에 좋아요 눌렀음)
likedPosts.has(2)                 // false (2번에 안 눌렀음)
likedPosts.delete(1)              // 1번 좋아요 취소

        <div className="feed-posts">
          {feedPosts.map((post) => (
            <div key={post.id} className="feed-post-card">
              <div className="post-header">
                <div className="post-club-info">
                  <div className="club-avatar">🐜</div>
                  <div>
                    <div
                      className="club-name-link"
                      onClick={() => handleClubClick(post.clubId)}
                    >
                      {post.clubName}
                    </div>
                    <div className="post-author-time">
                      <span className="post-author">{post.author}</span>
                      <span className="post-time"> · {post.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="post-content">{post.content}</div>
//왜 Set을 사용?

              {post.image && (
                <div className="post-image">
                  <img src={post.image} alt="Post" />
                </div>
              )}
//배열 대신 Set을 사용하는 이유:

              <div className="post-actions">
                <button
                  className={`action-btn like-btn ${likedPosts.has(post.id) ? 'liked' : ''}`}
                  onClick={() => handleLike(post.id)}
                >
                  <span>{likedPosts.has(post.id) ? '❤️' : '🤍'}</span>
                  <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                </button>
                <button className="action-btn">
                  <span>💬</span>
                  <span>{post.comments}</span>
                </button>
                <button className="action-btn">
                  <span>🔗</span>
                  <span>공유</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
//1. 중복 방지
  // - 배열: [1, 1, 3] ← 1이 두 번
   //- Set: {1, 3} ← 자동으로 중복 제거

export default FeedPage
//2. 빠른 검색
   //- has() 메서드가 배열의 includes()보다 빠름

//3. 좋아요 상태 관리에 완벽
   //- 좋아요 누름: add()
   //- 좋아요 취소: delete()
   //- 눌렀는지 확인: has()