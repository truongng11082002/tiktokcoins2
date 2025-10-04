import { useState } from 'react'
import { supabase } from './supabase'
import TransactionHistory from './TransactionHistory'
import PaymentModal from './PaymentModal'
import { CoinIcon } from './CoinIcon'
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

const LOGO_IMAGE = 'https://icon2.cleanpng.com/20200922/xqh/transparent-social-media-1713858561643.webp'

function App() {
  const [tiktokId, setTiktokId] = useState('')
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [showHistory, setShowHistory] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [lastTransaction, setLastTransaction] = useState(null)
  const [customCoins, setCustomCoins] = useState('')
  const [customPrice, setCustomPrice] = useState('')

  const handleRecharge = () => {
    if (!tiktokId || !selectedPackage) {
      alert('Please enter TikTok ID and select a coin package')
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
      alert('An error occurred while saving the transaction')
    }
  }

  return (
    <div className="app">
      hehee
    </div>
  )
}

export default App
