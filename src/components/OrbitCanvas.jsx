import { useMemo } from "react"
import { motion } from "framer-motion"
import Node from "./Node"

function polarToCartesian(cx, cy, r, angleDeg) {
  const a = (angleDeg - 90) * Math.PI/180
  return { x: cx + (r * Math.cos(a)), y: cy + (r * Math.sin(a)) }
}

export default function OrbitCanvas({ width, height, people, onSelect, highlightIds = [] }) {
  const center = { x: width/2, y: height/2 }

  const tiers = useMemo(() => {
    const byTier = [[],[],[],[]]
    people.forEach(p => {
      const t = Math.min(Math.max(p.tier || 3,1),4)
      byTier[t-1].push(p)
    })
    return byTier
  }, [people])

  const ringRadii = [80, 160, 240, 320]

  return (
    <div className="relative" style={{ width, height }}>
      {/* Rings */}
      <svg className="absolute inset-0" width={width} height={height}>
        {ringRadii.map((r, i) => (
          <circle key={i} cx={center.x} cy={center.y} r={r} fill="none" stroke="rgba(15,19,32,0.06)" strokeWidth="1" />
        ))}
      </svg>

      {/* Nodes */}
      {tiers.map((list, tierIndex) => {
        const r = ringRadii[tierIndex]
        const count = list.length
        return list.map((p, idx) => {
          const angle = p.angle ?? (idx * (360 / Math.max(count,1)) + (tierIndex*12))
          const { x, y } = polarToCartesian(center.x, center.y, r, angle)
          const size = tierIndex === 0 ? 44 : tierIndex === 1 ? 36 : tierIndex === 2 ? 28 : 22
          const highlighted = highlightIds.includes(p.id)
          return (
            <motion.div key={p.id || p.name+idx}
              className="absolute"
              initial={{ x, y }}
              animate={{ x: x + Math.sin(idx)*1.5, y: y + Math.cos(idx)*1.5 }}
              transition={{ duration: 8 + (idx%3), repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
              style={{ transform: `translate(-50%, -50%)` }}
            >
              <Node person={p} size={size} highlighted={highlighted} onClick={()=>onSelect?.(p)} />
            </motion.div>
          )
        })
      })}

      {/* Center self node */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="absolute -inset-6 rounded-full bg-amber-300/30 blur-2xl" />
          <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 text-white font-semibold shadow-lg ring-1 ring-black/5">You</div>
        </div>
      </div>
    </div>
  )
}
