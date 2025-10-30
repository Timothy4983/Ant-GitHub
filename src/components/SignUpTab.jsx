import './SignUpTab.css'

function SignUpTab({ onComplete }) {
  const handleKakaoLogin = () => {
    console.log('카카오톡 로그인')
    onComplete()
  }

  const handleGoogleLogin = () => {
    console.log('구글 로그인')
    onComplete()
  }

  return (
    <div className="signup-tab">
      <h1 className="signup-title">회원가입 탭</h1>
      
      <div className="signup-content">
        <div className="logo-section">
          <h1 className="logo">Ant <span className="ant-icon">🐜</span></h1>
          <p className="tagline">작지만 지혜롭게 함께 준비하는 우리</p>
        </div>

        <div className="login-buttons">
          <button className="login-btn kakao-btn" onClick={handleKakaoLogin}>
            카카오톡으로 시작하기
          </button>
          <button className="login-btn google-btn" onClick={handleGoogleLogin}>
            구글로 시작하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignUpTab

