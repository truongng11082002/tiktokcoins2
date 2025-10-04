import { useState } from 'react'

function PaymentModal({ tiktokId, selectedPackage, onClose, onSuccess }) {
  const [selectedCard, setSelectedCard] = useState('visa-1234')
  const [processing, setProcessing] = useState(false)

  const savedCards = [
    { id: 'visa-1234', type: 'VISA', last4: '1234', expiry: '12/25' }
  ]

  const handlePayment = async () => {
    setProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    setProcessing(false)
    onSuccess()
  }

  if (processing) {
    return (
      <div className="modal-overlay">
        <div className="modal-content processing-modal" onClick={(e) => e.stopPropagation()}>
          <div className="processing-content">
            <div className="hourglass-icon">⏳</div>
            <h2 className="processing-title">Đang xử lý thanh toán</h2>
            <p className="processing-message">Vui lòng đợi trong giây lát...</p>
            <div className="processing-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content payment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Hoàn tất thanh toán</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="payment-summary">
          <div className="summary-row">
            <span>TikTok ID:</span>
            <strong>{tiktokId}</strong>
          </div>
          <div className="summary-row">
            <span>Số Xu:</span>
            <strong>
              <img
                src="/pngwing.com.png"
                alt="coin"
                className="coin-img-small"
              />
              {selectedPackage.coins.toLocaleString()}
            </strong>
          </div>
          <div className="summary-row total-row">
            <span>Tổng tiền:</span>
            <strong>₫{selectedPackage.price.toLocaleString()}</strong>
          </div>
        </div>

        <div className="payment-method-section">
          <h3 className="section-title">Chọn phương thức thanh toán</h3>

          {savedCards.map((card) => (
            <div
              key={card.id}
              className={`saved-card ${selectedCard === card.id ? 'selected' : ''}`}
              onClick={() => setSelectedCard(card.id)}
            >
              <div className="card-icon">{card.type}</div>
              <div className="card-details">
                <div className="card-number">•••• •••• •••• {card.last4}</div>
                <div className="card-expiry">Hết hạn {card.expiry}</div>
              </div>
              <div className="card-radio">
                {selectedCard === card.id && <div className="radio-selected"></div>}
              </div>
            </div>
          ))}

          <button className="add-card-btn">+ Thêm thẻ mới</button>
        </div>

        <button
          className="confirm-payment-btn"
          onClick={handlePayment}
          disabled={processing || !selectedCard}
        >
          Thanh toán ₫{selectedPackage.price.toLocaleString()}
        </button>

        <div className="payment-security">
          <span className="security-icon">🔒</span>
          <span>Thanh toán của bạn được bảo mật và mã hóa</span>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
