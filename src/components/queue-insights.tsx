"use client"

import { useState } from "react"
import { ArrowRight, TrendingDown, ArrowRightCircle } from "lucide-react"

export function QueueInsights() {
  const [filter, setFilter] = useState("All")
  
  const filters = [
     { id: "All", label: "All" },
     { id: "Food", label: "🍔 Food" },
     { id: "Gates", label: "🚪 Gates" },
     { id: "Washrooms", label: "🚹 Washrooms" }
  ]

  const queues = [
     { id: 1, type: "Gate", name: "Gate 8", desc: "North-West entrance", waitTime: 19, trend: "stable", color: "red" },
     { id: 2, type: "Gate", name: "Gate 4", desc: "South-East entrance", waitTime: 18, trend: "stable", color: "red" },
     { id: 3, type: "Gate", name: "Gate 1", desc: "North main entrance", waitTime: 17, trend: "falling", color: "red" },
     { id: 4, type: "Gate", name: "Gate 2", desc: "North-East entrance", waitTime: 17, trend: "stable", color: "red" },
     { id: 5, type: "Gate", name: "Gate 6", desc: "South-West entrance", waitTime: 17, trend: "stable", color: "red" },
  ]

  return (
    <div className="flex flex-col h-full bg-[#0A0D14] text-white">
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-2">
         <h2 className="text-3xl font-bold font-headline tracking-tight">Queue Insights</h2>
         <p className="text-sm font-medium text-white/50">Live waiting times across the stadium</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide mb-2">
         {filters.map(f => (
            <button 
               key={f.id}
               onClick={() => setFilter(f.id)}
               className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold border transition-colors ${
                  filter === f.id 
                     ? 'bg-[#1A2234] border-[#00E5FF] text-[#00E5FF]' 
                     : 'bg-[#111622] border-white/10 text-white/70 hover:bg-white/5'
               }`}
            >
               {f.label}
            </button>
         ))}
      </div>

      <div className="space-y-3 pb-20">
         {queues.filter(q => filter === "All" || filter === "Gates").map(q => (
            <QueueCard key={q.id} {...q} />
         ))}
      </div>
    </div>
  )
}

function QueueCard({ type, name, desc, waitTime, trend, color }: any) {
   const isHigh = waitTime > 15
   return (
      <div className="bg-[#111622] border border-white/5 hover:border-white/10 transition-colors p-5 rounded-[1.5rem] flex items-center gap-4 cursor-pointer">
         <div className="w-12 h-12 rounded-xl bg-[#0A0D14] border border-white/5 flex items-center justify-center shrink-0">
            <div className="w-3 h-5 bg-[#D48C51] rounded-sm relative"></div>
         </div>
         <div className="flex-1">
            <h4 className="text-lg font-bold text-white">{name}</h4>
            <p className="text-xs font-medium text-white/50">{desc}</p>
         </div>
         <div className="text-right flex flex-col items-end gap-1.5">
            <span className={`text-base font-black px-3 py-1 rounded-full ${isHigh ? 'bg-[#FF3366]/10 text-[#FF3366]' : 'bg-[#FFB800]/10 text-[#FFB800]'}`}>
               {waitTime} min
            </span>
            {trend === 'stable' ? (
               <span className="flex items-center gap-1.5 text-xs text-white/50 font-bold">
                  <span className="w-4 h-4 rounded-sm bg-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center">→</span> stable
               </span>
            ) : (
               <span className="flex items-center gap-1.5 text-xs text-[#00FF66] font-bold">
                  <span className="w-4 h-4 rounded-sm bg-[#00FF66]/20 flex items-center justify-center">↘</span> falling
               </span>
            )}
         </div>
      </div>
   )
}
