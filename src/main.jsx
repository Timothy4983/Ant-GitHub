import React from 'react'
// React 라이브러리를 가져와줘 (JSX 문법 사용을 위해 필요)//
import ReactDOM from 'react-dom/client'
// React DOM 라이브러리를 가져와줘 (웹 브라우저에 화면을 그리기 위해 필요)//
import App from './App'
// 같은 폴더에 있는 App.jsx 파일을 가져와줘 (메인 컴포넌트)//
import './index.css'
// 같은 폴더에 있는 index.css 파일을 가져와줘 (전역 스타일)//

ReactDOM.createRoot(document.getElementById('root')).render(
  // index.html 파일에 있는 id가 'root'인 요소를 찾아서 그 안에 리액트 앱을 그려줘//
  <React.StrictMode>
    {/* 개발 모드에서 잠재적인 문제를 감지하기 위한 도구 (화면에는 영향 없음) */}
    <App />
    {/* App 컴포넌트를 화면에 표시해줘 */}
  </React.StrictMode>,
)


