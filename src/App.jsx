import { useState } from 'react'
import { supabase } from './supabase'
import TransactionHistory from './TransactionHistory'
import PaymentModal from './PaymentModal'
import './App.css'

const coinPackages = [
  { coins: 30, price: 9800 },
  { coins: 350, price: 113900 },
  { coins: 700, price: 227700 },
  { coins: 1400, price: 455300 },
  { coins: 3500, price: 1138100 },
  { coins: 7000, price: 2276200 },
  { coins: 17500, price: 5690400 },
]

const COIN_IMAGE = '/pngwing.com.png'
const LOGO_IMAGE = 'https://icon2.cleanpng.com/20200922/xqh/transparent-social-media-1713858561643.webp'

function App() {
  const [tiktokId, setTiktokId] = useState('')
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [showHistory, setShowHistory] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [lastTransaction, setLastTransaction] = useState(null)

  const handleRecharge = () => {
    if (!tiktokId || !selectedPackage) {
      alert('Vui lòng nhập TikTok ID và chọn gói coin')
      return
    }
    setShowPayment(true)
  }

  const handlePaymentSuccess = async () => {
    try {
      const transactionData = {
        tiktok_id: tiktokId,
        coin_amount: selectedPackage.coins,
        price: selectedPackage.price,
        payment_method: 'VISA',
        status: 'completed'
      }

      const { data, error } = await supabase
        .from('recharge_history')
        .insert([transactionData])
        .select()
        .single()

      if (error) throw error

      setLastTransaction(data)
      setShowPayment(false)
      setShowSuccess(true)
      setTiktokId('')
      setSelectedPackage(null)
    } catch (error) {
      console.error('Error saving transaction:', error)
      alert('Có lỗi xảy ra khi lưu giao dịch')
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <img src={LOGO_IMAGE} alt="TikTok" className="logo-icon" />
          <span>TikTok</span>
        </div>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search"
          />
        </div>
        <div className="header-actions">
          <button className="upload-btn">
            <span>+</span> Upload
          </button>
        </div>
      </header>

      <div className="container">
        <div className="main-content">
          <div className="page-header">
            <h1 className="page-title">Get Coins</h1>
            <button
              className="history-link"
              onClick={(e) => {
                e.preventDefault()
                setShowHistory(true)
              }}
              style={{background: 'none', border: 'none', cursor: 'pointer'}}
            >
              View transaction history
            </button>
          </div>

          <div className="user-info">
            <div className="user-avatar">M
            </div>
            <div className="user-details">
              <div className="username">@memorymusic...</div>
              <div className="user-balance">
                <img src={COIN_IMAGE} alt="coin" className="coin-img-small" />
                <span>2403</span>
              </div>
            </div>
          </div>

          <div className="input-section">
            <label className="input-label">TikTok ID cần nạp</label>
            <input
              type="text"
              className="tiktok-id-input"
              placeholder="Nhập TikTok ID của bạn"
              value={tiktokId}
              onChange={(e) => setTiktokId(e.target.value)}
            />
          </div>

          <div className="recharge-notice">
            <div className="notice-title">Nạp:</div>
            <div className="notice-text">Tiết kiệm khoảng 25% với phí dịch vụ của bên thứ ba thấp hơn.</div>
          </div>

          <div className="coin-packages">
            {coinPackages.map((pkg, index) => (
              <div
                key={index}
                className={`coin-package ${selectedPackage?.coins === pkg.coins ? 'selected' : ''}`}
                onClick={() => setSelectedPackage(pkg)}
              >
                <div className="coin-amount">
                  <img src={COIN_IMAGE} alt="coin" className="coin-img" />
                  <span>{pkg.coins.toLocaleString()}</span>
                </div>
                <div className="coin-price">₫{pkg.price.toLocaleString()}</div>
              </div>
            ))}
            <div className="coin-package">
              <div className="coin-amount">
                <img src={COIN_IMAGE} alt="coin" className="coin-img" />
                <span>Custom</span>
              </div>
              <div className="coin-price">Large amount supported</div>
            </div>
          </div>

          <div className="promo-section">
            <div className="promo-icon">🎁</div>
            <div className="promo-content">
              <div className="promo-text">
                Nạp để mở khóa hoàn tiền 5% lên đến USD250 cho lần mua Xu tiếp theo của bạn
              </div>
              <div className="promo-subtext">
                Mã mời mặc định đã được áp dụng. Thay đổi mã ✏️
              </div>
            </div>
          </div>

          <div className="payment-section">
            <div className="section-label">Phương thức thanh toán</div>
            <div className="payment-methods">
              <div className="payment-method">VISA</div>
              <div className="payment-method">MC</div>
              <div className="payment-method">JCB</div>
              <div className="payment-method">AMEX</div>
              <div className="payment-method">UNION</div>
              <div className="payment-method">DINERS</div>
            </div>
          </div>

          <div className="total-section">
            <div className="total-label">Tổng</div>
            <div className="total-amount">
              ₫{selectedPackage ? selectedPackage.price.toLocaleString() : '0'}
            </div>
          </div>

          <button
            className="recharge-btn"
            onClick={handleRecharge}
            disabled={!tiktokId || !selectedPackage}
          >
            Nạp
          </button>

          <div className="security-badge">
            <div className="secure-icon">🔒 BẢO MẬT</div>
            <span>Thanh toán an toàn và bảo mật</span>
          </div>
        </div>
      </div>

      {showHistory && (
        <TransactionHistory onClose={() => setShowHistory(false)} />
      )}

      {showPayment && (
        <PaymentModal
          tiktokId={tiktokId}
          selectedPackage={selectedPackage}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {showSuccess && lastTransaction && (
        <div className="modal-overlay" onClick={() => setShowSuccess(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{maxWidth: '400px'}}>
            <div className="success-modal">
              <div className="success-icon">✓</div>
              <h2 className="success-title">Payment Successful!</h2>
              <p className="success-message">Your coins have been added successfully</p>

              <div className="success-details">
                <div className="success-row">
                  <span>TikTok ID:</span>
                  <strong>{lastTransaction.tiktok_id}</strong>
                </div>
                <div className="success-row">
                  <span>Coins:</span>
                  <strong>
                    <img src={COIN_IMAGE} alt="coin" className="coin-img-small" />
                    {lastTransaction.coin_amount.toLocaleString()}
                  </strong>
                </div>
                <div className="success-row">
                  <span>Amount:</span>
                  <strong>₫{lastTransaction.price.toLocaleString()}</strong>
                </div>
              </div>

              <button className="close-success-btn" onClick={() => setShowSuccess(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
