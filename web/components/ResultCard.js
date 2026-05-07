import { motion } from 'framer-motion'

export default function ResultCard({ price }) {
  const getTier = (price) => {
    if (price < 0.8) {
      return {
        label: 'Budget Guac 💸',
        verdict: 'Your wallet survives another day.',
        className: 'tier-cheap',
        state: 'cheap',
      }
    } else if (price < 1.2) {
      return {
        label: 'Reasonable 👍',
        verdict: 'Guac is extra, but you can handle it.',
        className: 'tier-reasonable',
        state: 'cheap',
      }
    } else if (price < 1.6) {
      return {
        label: 'Pricey 😬',
        verdict: 'Maybe skip the guac this time.',
        className: 'tier-pricey',
        state: 'expensive',
      }
    } else {
      return {
        label: 'Splurge Zone 🤑',
        verdict: 'This avocado has a mortgage.',
        className: 'tier-splurge',
        state: 'expensive',
      }
    }
  }

  const tier = getTier(price)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="card"
      style={{ marginTop: '40px', textAlign: 'center' }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h2 style={{ color: '#5a7a3a', marginBottom: '12px' }}>
          ${price.toFixed(2)}
        </h2>
        <p style={{ fontSize: '1rem', color: '#5c4a37' }}>
          per avocado
        </p>
      </motion.div>

      <motion.div
        className={`tier-badge pop-scale ${tier.className}`}
        style={{ marginTop: '20px', display: 'inline-block' }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {tier.label}
      </motion.div>

      <motion.p
        className="verdict"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        "{tier.verdict}"
      </motion.p>
    </motion.div>
  )
}
