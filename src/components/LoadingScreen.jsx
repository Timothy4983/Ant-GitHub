import { useEffect } from 'react'
import './LoadingScreen.css'

function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="loading-screen">
      <h1 className="loading-title">접속 로딩</h1>
      <div className="loading-animation">
        <div className="ant-icon ant-icon-1">🐜</div>
        <div className="ant-icon ant-icon-2">🐜</div>
        <div className="ant-icon ant-icon-3">🐜</div>
      </div>
    </div>
  )
}

export default LoadingScreen

