import { Sparkles } from "lucide-react"

export default function BrandHeader() {
  return (
    <div className="pointer-events-none select-none flex flex-col items-center gap-3 py-6">
      <div className="relative">
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-amber-300/20 via-indigo-300/10 to-cyan-300/20 blur-2xl" />
        <div className="relative flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-400 drop-shadow" />
          <h1 className="text-3xl font-semibold tracking-wide text-slate-50">Hundred</h1>
        </div>
      </div>
      <p className="text-slate-300/80 text-sm">Your personal universe of connections</p>
    </div>
  )
}
