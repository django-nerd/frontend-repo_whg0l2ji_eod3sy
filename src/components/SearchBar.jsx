import { Search } from "lucide-react"

export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">
          <Search className="h-4 w-4" />
        </div>
        <input
          value={value}
          onChange={e=>onChange?.(e.target.value)}
          placeholder="Find a person or thread…"
          className="w-full rounded-full bg-white/70 px-10 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm ring-1 ring-black/5 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        {value && (
          <button onClick={onClear} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/80 px-3 py-1.5 text-xs text-white">Clear</button>
        )}
      </div>
    </div>
  )
}
