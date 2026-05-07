import { useState } from 'react'
import { motion } from 'framer-motion'

export default function PredictionForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    region: 'California',
    type: 'conventional',
    year: 2023,
    size: 'Large',
  })

  const regions = [
    'California', 'Texas', 'NewYork', 'Florida', 'Illinois',
    'GreatLakes', 'Southeast', 'Plains', 'SouthCentral', 'Northeast'
  ]

  const regionEncoding = {
    'California': 1.39,
    'Texas': 1.06,
    'NewYork': 1.72,
    'Florida': 1.48,
    'Illinois': 1.15,
    'GreatLakes': 1.33,
    'Southeast': 1.39,
    'Plains': 1.43,
    'SouthCentral': 1.10,
    'Northeast': 1.60,
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const predictionData = {
      ...formData,
      region_encoded: regionEncoding[formData.region] || 1.4,
      type_conventional: formData.type === 'conventional' ? 1 : 0,
      type_organic: formData.type === 'organic' ? 1 : 0,
    }

    onSubmit(predictionData)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="card wobbly-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ marginTop: '30px' }}
    >
      <motion.div variants={itemVariants} style={{ marginBottom: '20px' }}>
        <label htmlFor="region">Region</label>
        <select
          id="region"
          name="region"
          value={formData.region}
          onChange={handleChange}
          className="wobbly"
          style={{ width: '100%' }}
        >
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </motion.div>

      <motion.div variants={itemVariants} style={{ marginBottom: '20px' }}>
        <label htmlFor="type">Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="wobbly-3"
          style={{ width: '100%' }}
        >
          <option value="conventional">Conventional</option>
          <option value="organic">Organic</option>
        </select>
      </motion.div>

      <motion.div variants={itemVariants} style={{ marginBottom: '20px' }}>
        <label htmlFor="size">Size of Avocado</label>
        <select
          id="size"
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="wobbly"
          style={{ width: '100%' }}
        >
          <option value="Small">Small (4046)</option>
          <option value="Large">Large (4225)</option>
          <option value="XLarge">Extra Large (4770)</option>
        </select>
      </motion.div>

      <motion.div variants={itemVariants} style={{ marginBottom: '20px' }}>
        <label htmlFor="year">Year</label>
        <input
          id="year"
          type="number"
          name="year"
          min="2015"
          max="2025"
          value={formData.year}
          onChange={handleChange}
          className="wobbly-2"
          style={{ width: '100%' }}
        />
      </motion.div>

      <motion.button
        variants={itemVariants}
        type="submit"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{ width: '100%', marginTop: '10px' }}
      >
        Predict the Guac →
      </motion.button>
    </motion.form>
  )
}
