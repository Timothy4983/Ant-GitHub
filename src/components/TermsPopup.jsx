import { useState } from 'react'
import './TermsPopup.css'

function TermsPopup({ onClose, onSubmit }) {
  const [checkedItems, setCheckedItems] = useState({
    terms: false,
    privacy: false,
    community: false,
    age: false,
    marketing: false
  })

  const handleToggle = (item) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }))
  }

  const handleSelectAll = () => {
    const allChecked = !Object.values(checkedItems).every(v => v)
    setCheckedItems({
      terms: allChecked,
      privacy: allChecked,
      community: allChecked,
      age: allChecked,
      marketing: allChecked
    })
  }

  const allRequiredChecked = checkedItems.terms && checkedItems.privacy && 
                            checkedItems.community && checkedItems.age

  return (
    <div className="terms-popup-overlay" onClick={onClose}>
      <div className="terms-popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <h2 className="popup-title">
          Ant를 시작하기 위해 약관에 동의해 주세요
        </h2>

        <div className="terms-list">
          <div className="terms-item">
            <button 
              className={`checkbox ${checkedItems.terms ? 'checked' : ''}`}
              onClick={() => handleToggle('terms')}
            >
              {checkedItems.terms && '✓'}
            </button>
            <span className="terms-text">
              서비스 이용약관 동의 (필수)
            </span>
          </div>

          <div className="terms-item">
            <button 
              className={`checkbox ${checkedItems.privacy ? 'checked' : ''}`}
              onClick={() => handleToggle('privacy')}
            >
              {checkedItems.privacy && '✓'}
            </button>
            <span className="terms-text">
              개인정보 수집 및 이용 동의 (필수)
            </span>
          </div>

          <div className="terms-item">
            <button 
              className={`checkbox ${checkedItems.community ? 'checked' : ''}`}
              onClick={() => handleToggle('community')}
            >
              {checkedItems.community && '✓'}
            </button>
            <span className="terms-text">
              커뮤니티 가이드 동의 (필수)
            </span>
          </div>

          <div className="terms-item">
            <button 
              className={`checkbox ${checkedItems.age ? 'checked' : ''}`}
              onClick={() => handleToggle('age')}
            >
              {checkedItems.age && '✓'}
            </button>
            <span className="terms-text">
              만 19세 이상 (필수)
            </span>
          </div>

          <div className="terms-item">
            <button 
              className={`checkbox ${checkedItems.marketing ? 'checked' : ''}`}
              onClick={() => handleToggle('marketing')}
            >
              {checkedItems.marketing && '✓'}
            </button>
            <span className="terms-text">
              혜택 및 이벤트 알림 수신 동의 (선택)
            </span>
          </div>
        </div>

        <button 
          className="select-all-btn"
          onClick={handleSelectAll}
        >
          <span className="checkbox-check">✓</span>
          모두 동의합니다
        </button>

        <button 
          className={`submit-btn ${allRequiredChecked ? 'active' : ''}`}
          onClick={onSubmit}
          disabled={!allRequiredChecked}
        >
          가입 완료하고 시작하기
        </button>
      </div>
    </div>
  )
}

export default TermsPopup
