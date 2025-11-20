import { motion } from "framer-motion"

export default function Node({ person, size=32, onClick, highlighted=false }) {
  const initials = person.initials || person.name.split(" ").map(n=>n[0]).slice(0,2).join("").toUpperCase()
  const color = person.color || "#6D9EF5"

  return (
    <motion.button
      onClick={onClick}
      className="group relative grid place-items-center rounded-full focus:outline-none"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ width: size, height: size }}
    >
      {/* Halo */}
      <motion.span
        className="absolute rounded-full"
        style={{ inset: -6, background: `radial-gradient(60% 60% at 50% 50%, ${color}33, transparent)` }}
        animate={{ opacity: highlighted ? 0.9 : 0.45, scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Core */}
      <span className="relative z-10 grid h-full w-full place-items-center rounded-full shadow-sm ring-1 ring-black/5"
        style={{ background: color }}>
        {person.avatar_url ? (
          // Avatar masked in a circle
          <img src={person.avatar_url} alt={person.name} className="h-full w-full rounded-full object-cover" />
        ) : (
          <span className="text-white/95 font-semibold" style={{ fontSize: Math.max(12, size*0.35) }}>{initials}</span>
        )}
      </span>

      {/* Label on hover */}
      <motion.span
        className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/70 px-2 py-1 text-xs text-slate-800 backdrop-blur-md shadow-sm ring-1 ring-black/5"
        initial={{ opacity: 0, y: 2 }}
        whileHover={{ opacity: 1, y: 0 }}
      >
        {person.name}
      </motion.span>
    </motion.button>
  )
}
