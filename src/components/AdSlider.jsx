import { useState, useEffect } from 'react'
import './AdSlider.css'

const ads = [
  {
    id: 1,
    title: '새로운 독서 모임 시작!',
    description: '함께 읽고 나누는 지혜의 시간',
    color: '#FF6B6B'
  },
  {
    id: 2,
    title: '운동 소모임 모집',
    description: '건강한 몸과 마음을 함께 만들어요',
    color: '#4ECDC4'
  },
  {
    id: 3,
    title: '창의 활동 모임',
    description: '예술과 함께하는 즐거운 시간',
    color: '#95E1D3'
  },
  {
    id: 4,
    title: '온라인 스터디 그룹',
    description: '언제 어디서나 함께 공부해요',
    color: '#F38181'
  },
  {
    id: 5,
    title: '커뮤니티 모임',
    description: '서로의 이야기를 나누는 따뜻한 공간',
    color: '#AA96DA'
  }
]

function AdSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleDotClick = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className="ad-slider">
      <div 
        className="ad-slider-container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="ad-slide"
            style={{ backgroundColor: ad.color }}
          >
            <div className="ad-content">
              <h3 className="ad-title">{ad.title}</h3>
              <p className="ad-description">{ad.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="ad-dots">
        {ads.map((_, index) => (
          <button
            key={index}
            className={`ad-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`광고 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  )
}

export default AdSlider

