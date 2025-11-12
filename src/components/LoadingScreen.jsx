import { useEffect, useState } from 'react'
import './LoadingScreen.css'

// 개미가 소모임 활동을 즐기는 장면들
const antScenes = [
  { emoji: '📚', text: '책을 읽으며 함께 성장하는 개미들' },
  { emoji: '🏃', text: '운동하며 건강을 챙기는 개미들' },
  { emoji: '🎨', text: '창의적인 활동을 즐기는 개미들' },
  { emoji: '☕', text: '함께 모여 이야기 나누는 개미들' },
  { emoji: '🌱', text: '미래를 준비하며 노력하는 개미들' }
]

function LoadingScreen({ onComplete }) {
  const [currentScene, setCurrentScene] = useState(0)

  useEffect(() => {
    // 장면 전환 (각 장면당 0.8초)
    const sceneInterval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % antScenes.length)
    }, 800)

    // 전체 로딩 완료 (3초 후)
    const timer = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => {
      clearInterval(sceneInterval)
      clearTimeout(timer)
    }
  }, [onComplete])

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <h1 className="loading-title">Ant</h1>
        <p className="loading-subtitle">작지만 지혜롭게, 함께 준비하는 우리</p>
        
        <div className="scene-container">
          <div className="ant-scene">
            <div className="ant-emoji">{antScenes[currentScene].emoji}</div>
            <div className="ant-group">
              <div className="ant-icon ant-icon-1">🐜</div>
              <div className="ant-icon ant-icon-2">🐜</div>
              <div className="ant-icon ant-icon-3">🐜</div>
            </div>
            <p className="scene-text">{antScenes[currentScene].text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen


