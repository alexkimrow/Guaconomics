import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PredictionForm from '../components/PredictionForm'
import AvocadoMascot from '../components/AvocadoMascot'
import ResultCard from '../components/ResultCard'

export default function Home() {
  const [price, setPrice] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [mascotState, setMascotState] = useState('idle')

  const handlePredict = async (formData) => {
    setLoading(true)
    setError(null)
    setPrice(null)
    setMascotState('thinking')

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'
      console.log('Sending to API:', formData)
      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      console.log('Response from API:', data)
      setPrice(data.price)

      // Determine mascot state based on price tier
      if (data.price < 1.2) {
        setMascotState('cheap')
      } else {
        setMascotState('expensive')
      }
    } catch (err) {
      setError(err.message || 'Error making prediction')
      setMascotState('idle')
    } finally {
      setLoading(false)
    }
  }

  const pageVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      style={{
        maxWidth: '650px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <motion.div style={{ textAlign: 'center', marginBottom: '40px' }} variants={titleVariants}>
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: '3.5rem', color: '#5a7a3a', margin: '0 0 8px 0' }}
        >
          🥑 Guaconomics
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: '1.3rem',
            color: '#7c5c3a',
            fontStyle: 'italic',
            margin: '0',
          }}
        >
          Can you afford the guac?
        </motion.p>
      </motion.div>

      <AvocadoMascot state={mascotState} />

      <PredictionForm onSubmit={handlePredict} />

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              textAlign: 'center',
              marginTop: '20px',
              fontSize: '1.1rem',
              color: '#7c5c3a',
            }}
          >
            ⏳ Thinking...
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              color: '#c62828',
              textAlign: 'center',
              marginTop: '20px',
              padding: '12px',
              backgroundColor: '#ffebee',
              borderRadius: '8px',
              border: '1px solid #ef5350',
            }}
          >
            ❌ {error}
          </motion.div>
        )}

        {price !== null && <ResultCard price={price} />}
      </AnimatePresence>

      {/* About the Model card */}
      <motion.section
        className="card wobbly-3"
        style={{
          marginTop: '50px',
          background: 'linear-gradient(135deg, rgba(245, 240, 232, 0.8) 0%, rgba(255, 252, 247, 0.8) 100%)',
          transform: 'rotate(-1deg)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 style={{ color: '#5a7a3a', marginBottom: '16px' }}>📊 About the Model</h3>
        <ul style={{ textAlign: 'left', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>
            <strong>Dataset:</strong> Hass Avocado Board, 2015–2023
            <br />
            18,249 records across 54 US regions
          </li>
          <li>
            <strong>Model:</strong> Random Forest Regressor
            <br />
            Trained on region, type, size, and year
          </li>
          <li>
            <strong>Accuracy:</strong> R² = 0.65+
            <br />
            RMSE = $0.22, MAE = $0.16
          </li>
        </ul>
        <p
          style={{
            marginTop: '16px',
            fontSize: '0.95rem',
            color: '#5c4a37',
            fontStyle: 'italic',
          }}
        >
          🎓 This is a fun educational project. Predictions are for entertainment, not investment advice!
        </p>
      </motion.section>
    </motion.div>
  )
}
