import './PhoneVerification.css'

function PhoneVerification({ phoneNumber, setPhoneNumber, onSubmit, showError }) {
  const isValidPhone = phoneNumber.trim() !== '' && phoneNumber.length >= 10

  const handleSubmit = () => {
    onSubmit()
  }

  return (
    <div className="phone-verification">
      <h1 className="verification-title">전화번호 인증 탭</h1>
      
      <div className="verification-content">
        <div className="header-section">
          <h2 className="section-title">
            전화번호를 인증해 주세요 <span className="ant-icon-small">🐜</span>
          </h2>
          <p className="section-subtitle">
            1회 인증하면 Ant의 다양한 도전을 확인할 수 있어요
          </p>
        </div>

        <div className="input-section">
          <div className={`phone-input-wrapper ${showError ? 'error' : ''}`}>
            <input
              type="tel"
              className="phone-input"
              placeholder="010"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button className="verify-btn">인증 요청</button>
          </div>
          
          {showError && (
            <p className="error-message">올바른 전화번호를 입력해주세요</p>
          )}
        </div>

        <button 
          className={`next-btn ${isValidPhone ? 'active' : ''}`}
          onClick={handleSubmit}
          disabled={!isValidPhone}
        >
          다음
        </button>
      </div>
    </div>
  )
}

export default PhoneVerification
