import { motion, AnimatePresence } from 'framer-motion'

export default function AvocadoMascot({ state = 'idle' }) {
  const expressions = {
    idle: (
      <g>
        {/* Left eye */}
        <circle cx="85" cy="120" r="6" fill="#3d2b1f" />
        <circle cx="87" cy="118" r="2" fill="white" />
        {/* Right eye */}
        <circle cx="115" cy="120" r="6" fill="#3d2b1f" />
        <circle cx="117" cy="118" r="2" fill="white" />
        {/* Smile */}
        <path d="M 85 135 Q 100 145 115 135" stroke="#3d2b1f" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    ),
    thinking: (
      <g>
        {/* Left eye looking up */}
        <circle cx="85" cy="115" r="6" fill="#3d2b1f" />
        <circle cx="87" cy="113" r="2" fill="white" />
        {/* Right eye looking up */}
        <circle cx="115" cy="115" r="6" fill="#3d2b1f" />
        <circle cx="117" cy="113" r="2" fill="white" />
        {/* Thinking mouth — O shape */}
        <circle cx="100" cy="140" r="5" fill="none" stroke="#3d2b1f" strokeWidth="3" />
      </g>
    ),
    cheap: (
      <g>
        {/* Left eye big happy */}
        <ellipse cx="85" cy="120" rx="7" ry="9" fill="#3d2b1f" />
        <circle cx="87" cy="117" r="3" fill="white" />
        {/* Right eye big happy */}
        <ellipse cx="115" cy="120" rx="7" ry="9" fill="#3d2b1f" />
        <circle cx="117" cy="117" r="3" fill="white" />
        {/* Big grin */}
        <path d="M 80 135 Q 100 150 120 135" stroke="#3d2b1f" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* Laugh lines */}
        <path d="M 70 110 Q 75 105 80 110" stroke="#3d2b1f" strokeWidth="2" fill="none" />
        <path d="M 120 110 Q 125 105 130 110" stroke="#3d2b1f" strokeWidth="2" fill="none" />
      </g>
    ),
    expensive: (
      <g>
        {/* Left eye worried/wide */}
        <ellipse cx="85" cy="115" rx="8" ry="10" fill="none" stroke="#3d2b1f" strokeWidth="3" />
        <circle cx="87" cy="115" r="4" fill="#3d2b1f" />
        {/* Right eye worried/wide */}
        <ellipse cx="115" cy="115" rx="8" ry="10" fill="none" stroke="#3d2b1f" strokeWidth="3" />
        <circle cx="117" cy="115" r="4" fill="#3d2b1f" />
        {/* Sweat drops */}
        <circle cx="75" cy="105" r="3" fill="#8db85c" opacity="0.6" />
        <circle cx="125" cy="105" r="3" fill="#8db85c" opacity="0.6" />
        {/* Worried mouth — downward curve */}
        <path d="M 85 145 Q 100 138 115 145" stroke="#3d2b1f" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    ),
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="float"
        >
          <svg width="200" height="280" viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
            {/* Outer avocado shape — dark green pear */}
            <ellipse cx="100" cy="130" rx="70" ry="85" fill="#5a7a3a" />

            {/* Inner flesh — cream/yellow */}
            <ellipse cx="100" cy="140" rx="50" ry="65" fill="#f0e8d0" />

            {/* Pit — dark brown circle */}
            <circle cx="100" cy="140" r="22" fill="#7c5c3a" />

            {/* Face — eyes & mouth */}
            {expressions[state]}

            {/* Top leaf accent */}
            <path
              d="M 100 50 Q 130 30 150 40 Q 145 60 120 65"
              fill="#5a7a3a"
              opacity="0.7"
            />
          </svg>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
