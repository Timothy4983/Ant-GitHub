import { useState } from 'react'
import './RegionSelector.css'

const regions = {
  '서울특별시': ['전체', '서초구', '강남구', '마포구', '종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구', '양천구', '강서구', '구로구', '금천구', '영등포구', '동작구', '관악구', '서초구', '강남구', '송파구', '강동구'],
  '경기도': ['전체', '수원시', '성남시', '고양시', '용인시', '부천시', '안산시', '안양시', '남양주시', '화성시', '평택시', '의정부시', '시흥시', '파주시', '김포시', '광명시', '광주시', '군포시', '이천시', '양주시', '오산시', '구리시', '안성시', '포천시', '의왕시', '하남시', '여주시', '양평군', '동두천시', '과천시', '가평군', '연천군'],
  '인천광역시': ['전체', '중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구', '강화군', '옹진군'],
  '부산광역시': ['전체', '중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '해운대구', '사하구', '금정구', '강서구', '연제구', '수영구', '사상구', '기장군'],
  '대구광역시': ['전체', '중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군'],
  '광주광역시': ['전체', '동구', '서구', '남구', '북구', '광산구'],
  '대전광역시': ['전체', '동구', '중구', '서구', '유성구', '대덕구'],
  '울산광역시': ['전체', '중구', '남구', '동구', '북구', '울주군'],
  '세종특별자치시': ['전체'],
  '강원특별자치도': ['전체', '춘천시', '원주시', '강릉시', '동해시', '태백시', '속초시', '삼척시'],
  '충청북도': ['전체', '청주시', '충주시', '제천시'],
  '충청남도': ['전체', '천안시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시'],
  '전북특별자치도': ['전체', '전주시', '군산시', '익산시', '정읍시', '남원시', '김제시'],
  '전라남도': ['전체', '목포시', '여수시', '순천시', '나주시', '광양시'],
  '경상북도': ['전체', '포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시', '문경시', '경산시'],
  '경상남도': ['전체', '창원시', '진주시', '통영시', '사천시', '김해시', '밀양시', '거제시', '양산시'],
  '제주특별자치도': ['전체', '제주시', '서귀포시']
}

function RegionSelector({ selectedRegion, selectedDistrict, onRegionChange, onDistrictChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showDistricts, setShowDistricts] = useState(false)

  const handleRegionSelect = (region) => {
    onRegionChange(region)
    setShowDistricts(true)
  }

  const handleDistrictSelect = (district) => {
    onDistrictChange(district)
    setIsOpen(false)
    setShowDistricts(false)
  }

  return (
    <div className="region-selector">
      <button
        className="region-selector-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="region-icon">📍</span>
        <span className="region-text">
          {selectedRegion && selectedDistrict 
            ? `${selectedRegion} ${selectedDistrict}` 
            : '지역 선택'}
        </span>
        <span className={`region-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <>
          <div className="region-overlay" onClick={() => setIsOpen(false)} />
          <div className="region-dropdown">
            {!showDistricts ? (
              // 1단계: 지역 선택
              Object.keys(regions).map((region) => (
                <button
                  key={region}
                  className={`region-option ${selectedRegion === region ? 'selected' : ''}`}
                  onClick={() => handleRegionSelect(region)}
                >
                  {region}
                </button>
              ))
            ) : (
              // 2단계: 구/시 선택
              <>
                <button 
                  className="back-button"
                  onClick={() => setShowDistricts(false)}
                >
                  ← 뒤로가기
                </button>
                {regions[selectedRegion]?.map((district) => (
                  <button
                    key={district}
                    className={`region-option ${selectedDistrict === district ? 'selected' : ''}`}
                    onClick={() => handleDistrictSelect(district)}
                  >
                    {district}
                    {selectedDistrict === district && <span className="check-icon">✓</span>}
                  </button>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default RegionSelector