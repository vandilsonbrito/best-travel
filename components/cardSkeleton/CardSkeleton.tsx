
function CardSkeleton() {
  return (
    <div className="skeleton-panel">
        <div className="skeleton-panel-img"></div>
        <div className="skeleton-content-wrapper">
            <div className="skeleton-panel-content"></div>
            <div className="skeleton-panel-content"></div>
            <div className="skeleton-panel-content"></div>
            <div className="skeleton-panel-content"></div>
        </div>
        <div className="skeleton-panel-divisor"></div>
        <div className="skeleton-panel-book-wrapper">
            <div className="skeleton-panel-price"></div>
            <div className="skeleton-panel-btn"></div>
        </div>
    </div>
  )
}

export default CardSkeleton
