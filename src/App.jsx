import { useEffect, useMemo, useState } from "react"
import AmbientBackground from "./components/AmbientBackground"
import BrandHeader from "./components/BrandHeader"
import SearchBar from "./components/SearchBar"
import OrbitCanvas from "./components/OrbitCanvas"
import ProfileModal from "./components/ProfileModal"

const SAMPLE_COLORS = ["#EB6A79","#F1B24D","#4FBF8A","#46B3C4","#6D9EF5","#7865F2","#A378F2","#FF8A6E","#7DB28C","#D9A441"]

function generateSamplePeople(n=64){
  const names = [
    "Leah Kim","Jonah Patel","Ari Santos","Maya Chen","Noah Park","Iris Novak","Theo Alvarez","Rhea Das","Kai Osei","Zara Bloom",
    "Omar Haddad","Luca Marino","Nina Volkov","Amara Li","Felix Stone","Isla Quinn","Sora Tanaka","Eden Hale","Milo Drake","Uma Nair"
  ]
  return Array.from({length:n}).map((_,i)=>{
    const name = names[i%names.length] + (i>=names.length?` ${Math.floor(i/names.length)+1}`:"")
    const color = SAMPLE_COLORS[i%SAMPLE_COLORS.length]
    const tier = (i%4)+1
    return { id: `${i}`, name, color, tier, initials: name.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase(), bio: "Loves slow mornings and tiny gardens.", tags: tier===1?["Inner"]:tier===2?["Close"]:tier===3?["Familiar"]:["Extended"] }
  })
}

export default function App(){
  const [people, setPeople] = useState(generateSamplePeople(72))
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase()
    if(!q) return people
    return people.map(p => ({...p, _match: p.name.toLowerCase().includes(q)}))
  }, [people, query])

  const highlightIds = useMemo(()=>filtered.filter(p=>p._match).map(p=>p.id),[filtered])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AmbientBackground />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pb-16 pt-6">
        <BrandHeader />
        <SearchBar value={query} onChange={setQuery} onClear={()=>setQuery("")} />

        <div className="mt-6 w-full rounded-3xl bg-white/40 p-4 backdrop-blur-md ring-1 ring-black/5 shadow-sm">
          <div className="relative mx-auto aspect-[1.6/1] w-full max-w-5xl">
            <OrbitCanvas width={960} height={600} people={filtered} onSelect={setSelected} highlightIds={highlightIds} />
          </div>
        </div>
      </div>

      <ProfileModal open={!!selected} onOpenChange={()=>setSelected(null)} person={selected} />
    </div>
  )
}
