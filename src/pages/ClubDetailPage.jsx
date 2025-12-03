import { useState } from 'react'
// useState: React에서 상태를 관리하기 위한 Hook을 가져옴
import { useParams, useNavigate } from 'react-router-dom'
// useParams: URL에서 파라미터(id 등)를 가져오는 Hook
// useNavigate: 다른 페이지로 이동하기 위한 함수를 제공하는 Hook
import './ClubDetailPage.css'
// CSS 스타일 파일을 가져옴

// ==================== 더미 데이터 ====================

// 소모임 상세 정보 더미 데이터
// 실제 프로젝트에서는 서버(API)에서 받아오는 데이터
// 여기서는 테스트용으로 하드코딩된 데이터 사용
const dummyClubData = {
  // 1번 소모임: 독서 토론 모임
  1: {
    id: 1, // 소모임 고유 번호
    name: '독서 토론 모임', // 소모임 이름
    type: 'offline', // 모임 타입 (온라인/오프라인)
    region: '서울', // 활동 지역
    description: '매주 책을 읽고 함께 토론하는 모임입니다. 다양한 주제의 책을 읽으며 서로의 생각을 나누고 성장합니다.', // 소모임 설명
    members: 15, // 멤버 수
    tags: ['독서', '토론', '성장'], // 해시태그
    feed: [ // 피드 게시물 목록
      {
        id: 1, // 게시물 고유 번호
        author: '김개미', // 작성자 이름
        content: '이번 주 읽은 책이 정말 인상 깊었어요! 다음 모임이 기대됩니다.', // 게시물 내용
        image: null, // 이미지 없음 (null)
        likes: 12, // 좋아요 수
        comments: 3, // 댓글 수
        time: '2시간 전' // 게시 시간
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
        image: 'https://via.placeholder.com/400x300?text=Meeting+Photo', // 이미지 URL
        likes: 20,
        comments: 7,
        time: '1일 전'
      }
    ]
  },
  // 2번 소모임: 온라인 영어 스터디
  2: {
    id: 2,
    name: '온라인 영어 스터디',
    type: 'online', // 온라인 모임
    region: '전체', // 지역 제한 없음
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
  // 3번 소모임: 러닝 크루
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
  // 4번 소모임: 코딩 스터디 그룹
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
  // 5번 소모임: 예술 창작 모임
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
  // 6번 소모임: S&M 스터디
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

// ==================== 메인 컴포넌트 ====================

function ClubDetailPage() {
  // URL에서 id 파라미터 가져오기
  // 예: /club/3 → id는 '3'
  const { id } = useParams()

  // 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate()

  // 좋아요 상태 관리
  // isLiked: 현재 좋아요 상태 (true/false)
  // setIsLiked: 좋아요 상태를 변경하는 함수
  const [isLiked, setIsLiked] = useState(false)

  // URL의 id로 해당 소모임 데이터 가져오기
  // parseInt(id): 문자열 id를 숫자로 변환
  // dummyClubData[숫자]: 해당 번호의 소모임 데이터
  const club = dummyClubData[parseInt(id)]

  // 소모임 데이터가 없을 때 (잘못된 id)
  if (!club) {
    return (
      <div className="club-detail-page">
        <div className="no-club">소모임을 찾을 수 없습니다.</div>
      </div>
    )
  }

  // ==================== 렌더링 ====================

  return (
    // 전체 페이지를 감싸는 div
    <div className="club-detail-page">

      {/* ==================== 헤더 영역 ==================== */}
      <header className="club-detail-header">
        {/* 뒤로가기 버튼 */}
        {/* navigate(-1): 이전 페이지로 이동 */}
        <button className="back-button" onClick={() => navigate(-1)}>
          ← 뒤로
        </button>

        {/* 페이지 제목 */}
        <h2>소모임 상세</h2>

        {/* 좋아요 버튼 */}
        {/* className에 조건부로 'liked' 클래스 추가 */}
        {/* 백틱(`)과 ${}를 사용해서 조건에 따라 클래스명 변경 */}
        {/* isLiked가 true면 'like-button liked', false면 'like-button' */}
        <button
          className={`like-button ${isLiked ? 'liked' : ''}`}
          onClick={() => setIsLiked(!isLiked)}
        // setIsLiked(!isLiked): 현재 상태의 반대로 변경
        // true → false, false → true
        >
          {/* 삼항 연산자: 조건 ? 참일때 : 거짓일때 */}
          {isLiked ? '❤️' : '🤍'}
          {/* isLiked가 true면 빨간 하트, false면 흰 하트 */}
        </button>
      </header>

      {/* ==================== 본문 영역 ==================== */}
      <div className="club-detail-content">

        {/* === 소모임 정보 섹션 === */}
        <div className="club-info-section">
          {/* 소모임 헤더 정보 (제목 + 뱃지) */}
          <div className="club-header-info">
            {/* 소모임 제목 */}
            <h1 className="club-title">{club.name}</h1>

            {/* 온라인/오프라인 뱃지 */}
            {/* className에 club.type을 추가해서 online/offline에 따라 다른 스타일 */}
            <span className={`club-type-badge ${club.type}`}>
              {/* 삼항 연산자로 텍스트 결정 */}
              {club.type === 'online' ? '온라인' : '오프라인'}
              {/* club.type이 'online'이면 '온라인', 아니면 '오프라인' */}
            </span>
          </div>

          {/* 소모임 상세 설명 */}
          <p className="club-full-description">{club.description}</p>

          {/* 소모임 메타 정보 (지역, 멤버 수) */}
          <div className="club-meta">
            <span>📍 {club.region}</span> {/* 지역 */}
            <span>👥 {club.members}명</span> {/* 멤버 수 */}
          </div>

          {/* 해시태그들 */}
          <div className="club-tags">
            {/* club.tags 배열을 map으로 반복하며 각 태그 표시 */}
            {/* map((항목, 인덱스) => ...) */}
            {club.tags.map((tag, index) => (
              // key={index}: 각 태그를 구분하기 위한 고유 키
              // 보통은 고유 id를 사용하지만, 태그는 순서가 바뀌지 않으므로 index 사용
              <span key={index} className="club-tag">{tag}</span>
            ))}
          </div>

          {/* 참여하기 버튼 */}
          <button className="join-button">소모임 참여하기</button>
        </div>

        {/* === 소모임 피드 섹션 === */}
        <div className="club-feed-section">
          {/* 피드 제목 */}
          <h3 className="feed-title">소모임 피드</h3>

          {/* 피드 게시물 목록 */}
          <div className="feed-list">
            {/* club.feed 배열을 map으로 반복하며 각 게시물 표시 */}
            {club.feed.map((post) => (
              // key={post.id}: 각 게시물의 고유 id를 key로 사용
              <div key={post.id} className="feed-post">

                {/* 게시물 헤더 (작성자 정보) */}
                <div className="post-header">
                  <div className="post-author-info">
                    {/* 작성자 아바타 (개미 이모지) */}
                    <div className="author-avatar">🐜</div>

                    {/* 작성자 이름과 시간 */}
                    <div>
                      <div className="author-name">{post.author}</div> {/* 작성자 이름 */}
                      <div className="post-time">{post.time}</div> {/* 게시 시간 */}
                    </div>
                  </div>
                </div>

                {/* 게시물 내용 */}
                <div className="post-content">{post.content}</div>

                {/* 게시물 이미지 (있을 때만 표시) */}
                {/* post.image가 있을 때만 렌더링 */}
                {/* && 조건부 렌더링: post.image가 true(값이 있음)일 때만 뒤의 내용 표시 */}
                {post.image && (
                  <div className="post-image">
                    {/* img 태그로 이미지 표시 */}
                    {/* src={post.image}: 이미지 URL */}
                    {/* alt="Post": 이미지가 안 보일 때 대체 텍스트 */}
                    <img src={post.image} alt="Post" />
                  </div>
                )}

                {/* 게시물 액션 버튼들 (좋아요, 댓글) */}
                <div className="post-actions">
                  {/* 좋아요 버튼 */}
                  <button className="action-btn">
                    <span>❤️</span> {post.likes} {/* 좋아요 수 */}
                  </button>

                  {/* 댓글 버튼 */}
                  <button className="action-btn">
                    <span>💬</span> {post.comments} {/* 댓글 수 */}
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

// 이 컴포넌트를 다른 파일에서 import해서 사용할 수 있게 내보냄
export default ClubDetailPage