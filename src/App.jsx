import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import SignUpTab from './components/SignUpTab'
import PhoneVerification from './components/PhoneVerification'
import TermsPopup from './components/TermsPopup'

function App() {
  const [currentStep, setCurrentStep] = useState('loading')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showTerms, setShowTerms] = useState(false)
  const [showPhoneError, setShowPhoneError] = useState(false)

  const handlePhoneSubmit = () => {
    // 전화번호 유효성 검사
    if (phoneNumber.trim() === '' || phoneNumber.length < 10) {
      setShowPhoneError(true)
    } else {
      setShowPhoneError(false)
      setTimeout(() => {
        setShowTerms(true)
      }, 100)
    }
  }

  const handleCloseTerms = () => {
    setShowTerms(false)
  }

  const handleCompleteTerms = () => {
    alert('가입이 완료되었습니다!')
    setShowTerms(false)
  }

  return (
    <div className="app" style={{ width: '100%', maxWidth: '428px', margin: '0 auto', position: 'relative' }}>
      {currentStep === 'loading' && (
        <LoadingScreen onComplete={() => setCurrentStep('signup')} />
      )}
      {currentStep === 'signup' && (
        <SignUpTab onComplete={() => setCurrentStep('phone')} />
      )}
      {currentStep === 'phone' && (
        <>
          <PhoneVerification
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            onSubmit={handlePhoneSubmit}
            showError={showPhoneError}
          />
          {showTerms && (
            <TermsPopup onClose={handleCloseTerms} onSubmit={handleCompleteTerms} />
          )}
        </>
      )}
    </div>
  )
}

export default App
