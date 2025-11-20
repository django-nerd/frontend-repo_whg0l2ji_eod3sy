export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Soft gradient canvas */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F7F8FB] via-[#ECEEF5] to-[#F7F8FB]" />

      {/* Vignette and grain */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(109,158,245,0.10),transparent)]" />
      <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.07]" style={{backgroundImage:'url(https://grainy-gradients.vercel.app/noise.svg)'}} />

      {/* Ambient orbs */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl animate-[float_20s_linear_infinite]" />
      <div className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-cyan-300/20 blur-3xl animate-[float_28s_linear_infinite]" />

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-12px) translateX(6px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
      `}</style>
    </div>
  )
}
