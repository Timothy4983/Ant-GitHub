// Set은 중복 없는 값들의 집합

// 1. 빈 Set 만들기
const mySet = new Set()

// 2. 값 추가하기
mySet.add(1)     // Set {1}
mySet.add(3)     // Set {1, 3}
mySet.add(5)     // Set {1, 3, 5}
mySet.add(1)     // Set {1, 3, 5} ← 1은 이미 있어서 추가 안 됨!

// 3. 값이 있는지 확인
mySet.has(1)     // true (1이 있음)
mySet.has(2)     // false (2가 없음)

// 4. 값 삭제하기
mySet.delete(3)  // Set {1, 5}

// 5. 크기 확인
mySet.size       // 2

// 실제 사용 예시:
const likedPosts = new Set()      // 빈 Set
likedPosts.add(1)                 // 1번 게시물 좋아요
likedPosts.add(3)                 // 3번 게시물 좋아요
likedPosts.has(1)                 // true (1번에 좋아요 눌렀음)
likedPosts.has(2)                 // false (2번에 안 눌렀음)
likedPosts.delete(1)              // 1번 좋아요 취소


//왜 Set을 사용?

//배열 대신 Set을 사용하는 이유:

//1. 중복 방지
  // - 배열: [1, 1, 3] ← 1이 두 번
   //- Set: {1, 3} ← 자동으로 중복 제거

//2. 빠른 검색
   //- has() 메서드가 배열의 includes()보다 빠름

//3. 좋아요 상태 관리에 완벽
   //- 좋아요 누름: add()
   //- 좋아요 취소: delete()
   //- 눌렀는지 확인: has()