# Ant - 작지만 지혜롭게

회원가입 프로세스를 구현한 React 프론트엔드 앱입니다.

## 설치 방법

1. Node.js가 설치되어 있는지 확인하세요
2. 프로젝트 루트 디렉토리에서 다음 명령어를 실행하세요:

```bash
npm install
```

## 실행 방법

개발 모드로 실행:
```bash
npm run dev
```

빌드:
```bash
npm run build
```

## 프로젝트 구조

```
src/
├── App.jsx                  # 메인 앱 컴포넌트
├── main.jsx                 # 엔트리 포인트
├── index.css                # 글로벌 스타일
└── components/
    ├── LoadingScreen.jsx    # 접속 로딩 화면
    ├── SignUpTab.jsx       # 회원가입 탭
    ├── PhoneVerification.jsx  # 전화번호 인증
    └── TermsPopup.jsx      # 약관 동의 팝업
```

## 화면 플로우

1. **접속 로딩** - 개미 아이콘이 반복되는 로딩 애니메이션
2. **회원가입 탭** - KakaoTalk 또는 Google 로그인 선택
3. **전화번호 인증 탭** - 전화번호 입력 및 유효성 검사
4. **약관 동의 팝업** - 필수/선택 약관 동의
5. **가입 완료** - 회원가입 완료 알림

## 사용 기술

- React 18.2.0
- Vite 5.0.8
- React Router DOM 6.21.0

## 브라우저 지원

모던 브라우저를 지원합니다. 권장 브라우저: Chrome, Firefox, Edge, Safari


