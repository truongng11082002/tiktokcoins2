import { useState, useEffect } from 'react'
import { supabase } from './supabase'

function TransactionHistory({ onClose }) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('recharge_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error
      setTransactions(data || [])
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Lịch sử giao dịch</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="transaction-list">
          {loading ? (
            <div className="loading">Đang tải...</div>
          ) : transactions.length === 0 ? (
            <div className="empty-state">Chưa có giao dịch nào</div>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-header">
                    <span className="transaction-coins">
                      <img
                        src="/pngwing.com.png"
                        alt="coin"
                        className="coin-img-small"
                      />
                      {transaction.coin_amount.toLocaleString()} xu
                    </span>
                    <span className={`transaction-status ${transaction.status}`}>
                      {transaction.status}
                    </span>
                  </div>
                  <div className="transaction-details">
                    <div>TikTok ID: <strong>{transaction.tiktok_id}</strong></div>
                    <div>Thanh toán: {transaction.payment_method}</div>
                    <div>Số tiền: ₫{transaction.price.toLocaleString()}</div>
                    <div className="transaction-date">
                      {new Date(transaction.created_at).toLocaleString('vi-VN')}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default TransactionHistory
