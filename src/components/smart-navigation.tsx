"use client"

import { MapPin, ArrowDownUp, AlertTriangle, ArrowRight, CornerUpLeft } from "lucide-react"

export function SmartNavigation() {
  return (
    <div className="flex flex-col h-full bg-[#0A0D14] text-white">
      <div className="mb-6 flex justify-between items-end">
         <div>
            <h2 className="text-3xl font-bold font-headline tracking-tight flex items-baseline gap-3">
               Smart Navigation 
               <span className="text-sm font-normal text-white/50 hidden md:inline">AI-powered routing, avoiding crowds</span>
            </h2>
            <p className="text-sm font-normal text-white/50 md:hidden mt-1">AI-powered routing, avoiding crowds</p>
         </div>
      </div>

      <div className="bg-[#111622] rounded-[2rem] border border-white/5 p-5 shadow-lg space-y-4 relative z-10">
         {/* Origin */}
         <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-[#FF3366] flex items-center gap-2 mb-2">
               <MapPin className="w-3 h-3"/> YOUR LOCATION
            </label>
            <div className="bg-[#0A0D14] border border-white/10 rounded-xl p-4 flex items-center justify-between cursor-pointer">
               <span className="font-semibold text-white/90">Center Field (Your Position)</span>
               <ArrowDownUp className="w-4 h-4 text-white/30" />
            </div>
         </div>

         {/* Swap Button */}
         <div className="absolute top-[40%] right-[10%] w-10 h-10 bg-[#1A2234] border border-white/10 rounded-full flex items-center justify-center translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-white/10 transition-colors z-20 shadow-xl">
             <ArrowDownUp className="w-4 h-4 text-white/50" />
         </div>

         {/* Destination */}
         <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-[#00E5FF] flex items-center gap-2 mb-2 mt-2">
               <div className="w-2.5 h-2.5 rounded-full border-2 border-[#00E5FF] relative"><div className="absolute inset-[1px] bg-[#00E5FF] rounded-full"></div></div> DESTINATION
            </label>
            <div className="bg-[#0A0D14] border border-white/10 rounded-xl p-4 flex items-center justify-between cursor-pointer">
               <span className="font-semibold text-white/90">Gate 8 (North-West)</span>
               <span className="text-white/30 text-xs text-right">∨</span>
            </div>
         </div>

         <button className="w-full bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-black font-extrabold text-lg rounded-xl py-4 shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all flex justify-center items-center gap-2 mt-4">
            Find Best Route <ArrowRight className="w-5 h-5"/>
         </button>
      </div>

      <div className="mt-8 bg-[#111622] rounded-[2rem] border border-white/5 p-6 shadow-lg flex-1">
         <div className="flex justify-between items-start mb-6">
            <div>
               <h3 className="text-2xl font-black text-[#00FF66]">~3 min walk</h3>
               <p className="text-sm text-white/50 font-medium">Direct route</p>
            </div>
            <div className="bg-[#FF3366]/20 border border-[#FF3366]/30 text-[#FF3366] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
               <AlertTriangle className="w-3.5 h-3.5"/> Congested Route
            </div>
         </div>

         <div className="space-y-4">
            <Step number={1} icon={<CornerUpLeft className="w-4 h-4"/>} instruction="Head West ← from North Stand to Gate 8" color="red" />
            <Step number={2} icon={<MapPin className="w-4 h-4"/>} instruction="Arrive at Gate 8" color="cyan" />
         </div>

         <div className="mt-6 p-4 bg-[#FFB800]/10 border border-[#FFB800]/20 rounded-xl">
             <p className="text-[#FFB800] text-sm font-medium">⚠️ Priority entrance restricted. Consider alternate gates if wait exceeds 20 mins.</p>
         </div>
      </div>
    </div>
  )
}

function Step({ number, instruction, icon, color }: { number: number, instruction: string, icon: React.ReactNode, color: 'red' | 'cyan' }) {
   return (
      <div className="flex items-center gap-4 bg-[#0A0D14] p-4 rounded-2xl border border-white/5">
         <div className="w-8 h-8 rounded-full border border-[#00E5FF]/30 text-[#00E5FF] flex items-center justify-center font-bold text-sm bg-[#00E5FF]/10 shrink-0">
            {number}
         </div>
         <p className="text-sm font-medium flex-1">
            {instruction}
         </p>
         {color === 'red' && <div className="w-2.5 h-2.5 rounded-full bg-[#FF3366] shadow-[0_0_10px_rgba(255,51,102,0.8)]"></div>}
         {color === 'cyan' && <MapPin className="w-4 h-4 text-[#00E5FF]" />}
      </div>
   )
}
