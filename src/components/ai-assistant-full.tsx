"use client"

import { Send, MapPin, AlertTriangle } from "lucide-react"

export function AIAssistantFull() {
  return (
    <div className="flex flex-col h-full bg-[#0A0D14] text-white overflow-hidden pb-16">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center shrink-0">
         <h2 className="text-3xl font-bold font-headline tracking-tight">AI Assistant</h2>
         <div className="flex items-center gap-2 text-xs font-bold text-[#00FF66] bg-[#00FF66]/10 px-3 py-1.5 rounded-full border border-[#00FF66]/20 shadow-[0_0_10px_rgba(0,255,102,0.1)]">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse"></span>
            SmartVenue AI Online
         </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-6 pt-4 pr-2 scrollbar-hide flex flex-col">
         <Message 
            sender="ai" 
            text="What can I help you with?" 
            time="08:15 PM" 
         />
         
         <Message 
            sender="user" 
            text="where to exit" 
            time="08:15 PM" 
         />
         
         <StructuredMessage 
            time="08:15 PM" 
         />
      </div>

      {/* Input Area */}
      <div className="mt-4 pt-4 border-t border-white/5 shrink-0 bg-[#0A0D14]">
         {/* Suggestions */}
         <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {["Less crowded area?", "Fastest exit?", "Best food nearby?", "Gate 8 wait?"].map((chip) => (
               <button key={chip} className="whitespace-nowrap px-4 py-2 rounded-full border border-white/10 bg-[#111622] text-xs font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all">
                  {chip}
               </button>
            ))}
         </div>

         <div className="flex items-end gap-3 pb-safe">
            <div className="flex-1 bg-[#111622] rounded-[1.5rem] border border-white/10 px-5 py-4 focus-within:border-[#00E5FF]/50 transition-colors">
               <textarea 
                  rows={1}
                  placeholder="Ask anything about the stadium..." 
                  className="w-full bg-transparent outline-none resize-none text-sm font-medium placeholder:text-white/30 max-h-32"
               />
            </div>
            <button className="w-14 h-14 rounded-full bg-[#00E5FF] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:bg-[#00E5FF]/90 transition-transform active:scale-95">
               <Send className="w-6 h-6 text-black ml-1" />
            </button>
         </div>
      </div>
    </div>
  )
}

function Message({ sender, text, time }: { sender: 'ai' | 'user', text: string, time: string }) {
   const isAI = sender === 'ai'
   return (
      <div className={`flex gap-3 ${isAI ? 'self-start' : 'self-end flex-row-reverse w-full justify-end'}`}>
         <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1A2234] border border-white/10 shrink-0 mt-1">
            {isAI ? <span className="text-sm">🤖</span> : <div className="text-[#00E5FF]"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>}
         </div>
         <div className="flex flex-col gap-1 max-w-[80%]">
            <div className={`px-5 py-4 text-sm font-medium leading-relaxed ${isAI ? 'bg-[#111622] border border-white/5 rounded-2xl rounded-tl-sm' : 'bg-[#00E5FF] text-black rounded-2xl rounded-tr-sm'}`}>
               {text}
            </div>
            {time && <span className={`text-[10px] font-bold text-white/30 tracking-widest ${!isAI ? 'text-right' : ''}`}>{time}</span>}
         </div>
      </div>
   )
}

function StructuredMessage({ time }: { time: string }) {
   return (
      <div className="flex gap-3 self-start">
         <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1A2234] border border-white/10 shrink-0 mt-1">
            <span className="text-sm">🤖</span>
         </div>
         <div className="flex flex-col gap-1 max-w-[90%] md:max-w-[70%]">
            <div className="bg-[#111622] border border-white/5 rounded-2xl rounded-tl-sm overflow-hidden text-sm">
               
               <div className="p-5 font-medium leading-relaxed">
                   Fastest exit right now is <span className="font-bold">Gate 8</span> (North-West).
               </div>

               <div className="mx-4 mb-4 bg-[#0A0D14] border border-white/5 p-4 rounded-xl space-y-3">
                  <div className="flex gap-3 items-center font-medium">
                     <span className="w-5 h-5 rounded-md bg-[#00FF66]/20 flex items-center justify-center shrink-0">
                        <span className="text-[#00FF66] font-bold text-xs">✓</span>
                     </span>
                     <span className="text-white/90 font-bold">Gate 8</span> <span className="text-white/30">—</span> <span className="text-white/70">~16 min wait</span>
                  </div>
                  <div className="flex gap-3 items-center font-medium">
                     <span className="w-5 h-5 rounded-md bg-[#FFB800]/20 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-3 h-3 text-[#FFB800]" />
                     </span>
                     <span className="text-white/50">Avoid <strong className="text-white/70">Gate 4</strong></span> <span className="text-white/30">—</span> <span className="text-white/50">18 min wait</span>
                  </div>
               </div>

               <div className="px-4 pb-4">
                  <button className="px-5 py-2.5 bg-[#00E5FF]/10 text-[#00E5FF] font-bold rounded-full border border-[#00E5FF]/20 hover:bg-[#00E5FF]/20 transition-colors flex items-center gap-2text-xs">
                     <MapPin className="w-4 h-4"/> Show route to exit
                  </button>
               </div>
            </div>
            {time && <span className="text-[10px] font-bold text-white/30 tracking-widest">{time}</span>}
         </div>
      </div>
   )
}
