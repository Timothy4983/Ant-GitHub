import { useState } from 'react'
import './RegionSelector.css'

const regions = [
  '전체',
  '서울',
  '경기',
  '인천',
  '부산',
  '대구',
  '광주',
  '대전',
  '울산',
  '세종',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주'
]

function RegionSelector({ selectedRegion, onRegionChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (region) => {
    onRegionChange(region)
    setIsOpen(false)
  }

  return (
    <div className="region-selector">
      <button
        className="region-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="region-icon">📍</span>
        <span className="region-text">{selectedRegion || '지역 선택'}</span>
        <span className={`region-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <>
          <div className="region-overlay" onClick={() => setIsOpen(false)} />
          <div className="region-dropdown">
            {regions.map((region) => (
              <button
                key={region}
                className={`region-option ${selectedRegion === region ? 'selected' : ''}`}
                onClick={() => handleSelect(region)}
              >
                {region}
                {selectedRegion === region && <span className="check-icon">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default RegionSelector

