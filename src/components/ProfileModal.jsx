import { Dialog, DialogContent, DialogOverlay } from "@radix-ui/react-dialog"
import { motion, AnimatePresence } from "framer-motion"

export default function ProfileModal({ open, onOpenChange, person }) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogOverlay asChild>
            <motion.div className="fixed inset-0 z-40 bg-white/40 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          </DialogOverlay>
          <DialogContent asChild>
            <motion.div
              className="fixed left-1/2 top-1/2 z-50 w-[min(520px,92vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5"
              initial={{ scale: 0.92, opacity: 0.4 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
            >
              {/* Header */}
              <div className="relative p-6">
                <div className="absolute -inset-x-6 -top-16 h-40 bg-gradient-to-b from-indigo-200/50 to-transparent" />
                <div className="relative flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 rounded-full ring-4 ring-white">
                    {person?.avatar_url ? (
                      <img src={person.avatar_url} alt={person.name} className="h-full w-full rounded-full object-cover" />
                    ) : (
                      <div className="grid h-full w-full place-items-center rounded-full" style={{ background: person?.color || '#6D9EF5' }}>
                        <span className="text-white font-semibold">{person?.initials || person?.name?.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{person?.name}</h3>
                    <p className="text-slate-600 text-sm mt-1">{person?.bio || 'A warm human.'}</p>
                    {!!(person?.tags?.length) && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {person.tags.map((t, i) => (
                          <span key={i} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 ring-1 ring-black/5">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Mini constellation placeholder */}
              <div className="px-6 pb-6">
                <div className="relative h-28 rounded-2xl bg-[radial-gradient(circle_at_30%_30%,rgba(109,158,245,0.15),transparent_60%)] ring-1 ring-black/5">
                  <div className="absolute inset-0 grid place-items-center text-slate-500 text-xs">Mini-network preview</div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white">Message</button>
                  <button className="rounded-full bg-white px-4 py-2 text-sm text-slate-900 ring-1 ring-black/10">Favorite</button>
                  <button className="rounded-full bg-white px-4 py-2 text-sm text-slate-900 ring-1 ring-black/10">Note</button>
                  <button className="rounded-full bg-indigo-600/90 px-4 py-2 text-sm text-white">Draw Path</button>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
