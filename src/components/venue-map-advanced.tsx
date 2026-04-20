"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Minus, Navigation, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function VenueMapAdvanced() {
  const [zoom, setZoom] = useState(1)

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5))
  const handleReset = () => setZoom(1)

  return (
    <div className="flex flex-col h-full bg-[#0A0D14] text-white space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold font-headline tracking-tight">Stadium Overview</h2>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-2 text-xs font-medium text-white/70"><span className="w-2.5 h-2.5 rounded-full bg-[#00FF66]"></span> Low</span>
            <span className="flex items-center gap-2 text-xs font-medium text-white/70"><span className="w-2.5 h-2.5 rounded-full bg-[#FFB800]"></span> Medium</span>
            <span className="flex items-center gap-2 text-xs font-medium text-white/70"><span className="w-2.5 h-2.5 rounded-full bg-[#FF3366]"></span> High</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#00E5FF]">49,954</p>
          <p className="text-xs text-white/50">attendees inside</p>
        </div>
      </div>

      {/* Map Interactive Area */}
      <div className="relative flex-1 bg-[#111622] rounded-[2rem] border border-white/5 overflow-hidden flex items-center justify-center min-h-[400px]">
        {/* Map Grid Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        {/* Zoom Controls */}
        <div className="absolute right-4 bottom-4 flex flex-col gap-2 z-10 bg-[#1A2234]/80 backdrop-blur-md rounded-2xl p-1 border border-white/10">
          <button onClick={handleZoomIn} className="p-2 hover:bg-white/10 text-white rounded-xl transition-colors"><Plus className="w-5 h-5"/></button>
          <div className="w-full h-px bg-white/10" />
          <button onClick={handleZoomOut} className="p-2 hover:bg-white/10 text-white rounded-xl transition-colors"><Minus className="w-5 h-5"/></button>
          <div className="w-full h-px bg-white/10" />
          <button onClick={handleReset} className="p-2 hover:bg-white/10 text-white rounded-xl transition-colors"><Navigation className="w-5 h-5"/></button>
        </div>

        {/* The SVG Map Canvas */}
        <motion.div 
          className="relative w-full h-full flex items-center justify-center"
          animate={{ scale: zoom }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Circular Rings representing stands */}
          <div className="absolute w-[80%] aspect-[4/3] rounded-[50%] border border-white/5 opacity-50" />
          <div className="absolute w-[60%] aspect-[4/3] rounded-[50%] border border-white/10 opacity-50" />
          
          {/* Field */}
          <div className="relative w-[40%] aspect-[3/2] bg-[#1a4023] rounded-[50%] border-2 border-white/20 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(26,64,35,0.4)]">
             <div className="w-[80%] h-[70%] border border-white/20 absolute"></div>
             <div className="w-px h-full bg-white/20"></div>
             <div className="w-12 h-12 border border-white/20 rounded-full absolute"></div>
             <div className="absolute text-[10px] font-bold text-white/50 tracking-[0.2em] pt-8">FIELD</div>
             
             {/* User Pin */}
             <div className="absolute z-20 flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-[#00E5FF] rounded-full shadow-[0_0_15px_rgba(0,229,255,1)] border-2 border-[#111622] relative z-10 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#00E5FF]/40 animate-ping"></div>
                <span className="text-[8px] font-bold text-[#00E5FF] mt-1 bg-[#0A0D14]/80 px-1.5 py-0.5 rounded-full border border-[#00E5FF]/30">YOU</span>
             </div>
          </div>

          {/* Stands Highlights */}
          <div className="absolute text-[8px] font-black tracking-widest text-[#FFB800] opacity-50 top-[20%]">NORTH STAND</div>
          <div className="absolute text-[8px] font-black tracking-widest text-[#FFB800] opacity-50 bottom-[20%]">SOUTH STAND</div>
          <div className="absolute text-[8px] font-black tracking-widest text-[#FFB800] opacity-50 left-[15%] rotate-[-90deg]">WEST STAND</div>
          <div className="absolute text-[8px] font-black tracking-widest text-[#FFB800] opacity-50 right-[15%] rotate-[90deg]">EAST STAND</div>

          {/* Yellow highlight shapes showing congestion */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M 20 20 Q 50 5 80 20 L 70 30 Q 50 18 30 30 Z" fill="#FFB800" fillOpacity="0.1" />
             <path d="M 20 80 Q 50 95 80 80 L 70 70 Q 50 82 30 70 Z" fill="#FFB800" fillOpacity="0.1" />
          </svg>

          {/* Nodes (Gates / Food / Washrooms) */}
          <Node icon="🚪" x="15%" y="40%" color="red" label="G7" />
          <Node icon="🚨" x="50%" y="10%" color="red" label="G8 (Congested)" />
          <Node icon="🚪" x="85%" y="40%" color="red" label="G2" />
          <Node icon="🚪" x="80%" y="80%" color="red" label="G4" />
          <Node icon="🚪" x="20%" y="80%" color="red" label="G6" />
          <Node icon="🍔" x="40%" y="22%" color="green" />
          <Node icon="🍔" x="80%" y="30%" color="amber" />
          <Node icon="🍔" x="20%" y="55%" color="green" />
          <Node icon="🚹" x="15%" y="30%" color="green" />
          <Node icon="🚹" x="65%" y="22%" color="green" />
          <Node icon="🚹" x="90%" y="50%" color="green" />
          
          <Node icon="🍔" x="55%" y="82%" color="green" />
          
          {/* Selected Destination Example */}
          <div className="absolute top-[20%] left-[30%] flex flex-col items-center">
             <div className="w-6 h-6 rounded-full border-2 border-[#FF3366] bg-[#FF3366]/20 flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(255,51,102,0.5)]">
               <div className="w-2 h-2 rounded-full bg-[#FF3366]"></div>
             </div>
             {/* Yellow dashed line to user (mock path) */}
             <svg className="absolute w-[40vw] h-[20vw] top-4 left-4 pointer-events-none opacity-50 z-[-1]" viewBox="0 0 100 100">
                <path d="M 0 0 Q 50 20 100 80" fill="none" stroke="#FFB800" strokeWidth="2" strokeDasharray="4 4" />
             </svg>
          </div>

        </motion.div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <SummaryCard icon="🚪" time="17 min" label="Gate Avg Wait" trend="stable" />
        <SummaryCard icon="🍔" time="9 min" label="Food Avg Wait" trend="stable" />
        <SummaryCard icon="🚹" time="5 min" label="Washroom Wait" trend="down" />
      </div>
    </div>
  )
}

function Node({ x, y, color, icon, label }: { x: string, y: string, color: 'red' | 'amber' | 'green', icon: string, label?: string }) {
  const colors = {
    red: "bg-[#FF3366]/20 border-[#FF3366] text-[#FF3366]",
    amber: "bg-[#FFB800]/20 border-[#FFB800] text-[#FFB800]",
    green: "bg-[#00FF66]/20 border-[#00FF66] text-[#00FF66]",
  }
  return (
    <div className="absolute flex flex-col items-center" style={{ left: x, top: y }}>
      <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg border-2 ${colors[color]} flex items-center justify-center shadow-lg backdrop-blur-sm`}>
        {icon !== '🚪' && icon !== '🚨' ? <span className="text-xs">{icon}</span> : <div className="w-1.5 h-3 md:w-2 md:h-4 bg-current rounded-sm"></div>}
      </div>
      {label && <span className="text-[6px] md:text-[8px] font-bold text-white mt-1 bg-black/50 px-1 rounded">{label}</span>}
    </div>
  )
}

function SummaryCard({ icon, time, label, trend }: { icon: string, time: string, label: string, trend: string }) {
  return (
    <div className="bg-[#111622] border border-white/5 p-4 rounded-[1.5rem] flex flex-col items-center justify-center gap-1.5 shadow-lg group hover:border-[#00E5FF]/30 transition-colors">
      <div className="flex items-center justify-between w-full">
         <span className="text-xl bg-white/5 w-8 h-8 rounded-xl flex items-center justify-center">{icon}</span>
         <span className="text-[#FFB800]">→</span>
      </div>
      <div className="w-full text-left mt-1">
        <p className="text-xl font-bold text-white leading-none">{time}</p>
        <p className="text-[10px] md:text-xs text-white/50 font-medium mt-1">{label}</p>
      </div>
    </div>
  )
}
