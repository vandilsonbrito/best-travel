import React from 'react'

function CardSkeletonSmallScreen() {
  return (
    <div className="skeleton-panel-small-screen">
        <div className="skeleton-panel-img-small-screen"></div>
        <div className="skeleton-content-wrapper-small-screen">
            <div className="skeleton-panel-content-small-screen"></div>
            <div className="skeleton-panel-content-small-screen"></div>
            <div className="skeleton-panel-content-small-screen"></div>
            <div className="skeleton-panel-content-small-screen"></div>
        </div>
        <div className="skeleton-panel-divisor-small-screen"></div>
        <div className="skeleton-panel-book-wrapper-small-screen">
            <div className="skeleton-panel-price-small-screen"></div>
            <div className="skeleton-panel-btn-small-screen"></div>
        </div>
    </div>
  )
}

export default CardSkeletonSmallScreen
