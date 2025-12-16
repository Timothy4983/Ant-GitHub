import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(false) // Toggle between Login and Signup
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    email: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(`${isSignup ? 'Signup' : 'Login'} attempt:`, formData)
    navigate('/')
  }

  const toggleMode = () => {
    setIsSignup(!isSignup)
    setFormData({
      id: '',
      password: '',
      confirmPassword: '',
      email: ''
    })
  }

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Panel: Branding */}
        <div className="login-left">
          <div className="brand-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>ANT</div>
          <div className="brand-slogan">
            작지만 지혜롭게,<br />
            함께 준비하는 우리
          </div>
          <p className="brand-desc">
            개미처럼 부지런히 미래를 준비하는<br />
            당신을 위한 소모임 플랫폼
          </p>
        </div>

        {/* Right Panel: Form */}
        <div className="login-right">

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="id"
                placeholder="아이디"
                value={formData.id}
                onChange={handleChange}
                required
              />
            </div>

            {isSignup && (
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="이메일"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="비밀번호"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {isSignup && (
              <div className="input-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="비밀번호 확인"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <button type="submit" className="login-submit-btn">
              {isSignup ? '가입하기' : '로그인'}
            </button>
          </form>

          {/* Links: Find ID | Find PW | Sign Up */}
          <div className="form-links">
            <span className="link-item">아이디 찾기</span>
            <span>|</span>
            <span className="link-item">비밀번호 찾기</span>
            <span>|</span>
            <span className="link-item" onClick={toggleMode} style={{ fontWeight: 'bold', color: '#2563eb' }}>
              {isSignup ? '로그인하기' : '회원가입'}
            </span>
          </div>

          <div className="divider">간편 로그인</div>

          {/* Social Login */}
          <div className="social-login">
            <button className="social-btn kakao">
              <span className="social-icon">K</span>
              카카오톡으로 로그인
              <span className="kakao-badge">10초만에 가입완료</span>
            </button>
            <button className="social-btn naver">
              <span className="social-icon">N</span>
              네이버로 로그인
            </button>
            <button className="social-btn google">
              <span className="social-icon">G</span>
              구글로 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
