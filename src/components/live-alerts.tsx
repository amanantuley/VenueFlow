"use client"

export function LiveAlerts() {
  const alerts = [
     { id: 1, type: "Gate", name: "Gate 8", message: "Estimated 18 min wait. Please plan accordingly.", time: "08:43 PM", isCongested: true },
     { id: 2, type: "Gate", name: "Gate 7", message: "Estimated 16 min wait. Please plan accordingly.", time: "08:43 PM", isCongested: true },
     { id: 3, type: "Gate", name: "Gate 6", message: "Estimated 16 min wait. Please plan accordingly.", time: "08:43 PM", isCongested: true },
     { id: 4, type: "Gate", name: "Gate 5", message: "Estimated 18 min wait. Please plan accordingly.", time: "08:43 PM", isCongested: true },
     { id: 5, type: "Gate", name: "Gate 4", message: "Estimated 19 min wait. Please plan accordingly.", time: "08:43 PM", isCongested: true },
  ]

  return (
    <div className="flex flex-col h-full bg-[#0A0D14] text-white">
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-2">
         <h2 className="text-3xl font-bold font-headline tracking-tight">Live Alerts</h2>
         <p className="text-sm font-medium text-white/50">Real-time stadium updates</p>
      </div>

      <div className="space-y-4 pb-20">
         {alerts.map(alert => (
            <div key={alert.id} className="bg-[#111622] rounded-[1.5rem] p-5 flex gap-4 overflow-hidden relative shadow-lg">
               {/* Left status bar */}
               <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#FF3366] to-[#FF3366]/20"></div>
               
               <div className="w-10 h-10 rounded-xl bg-[#0A0D14] flex flex-col items-center justify-center shrink-0 border border-white/5">
                  <div className="w-2.5 h-4 bg-[#D48C51] rounded-sm"></div>
               </div>
               
               <div className="flex-1 pr-2">
                  <h4 className="text-lg font-bold text-white mb-1.5">{alert.name} is congested</h4>
                  <p className="text-sm text-white/60 mb-2 leading-relaxed">{alert.message}</p>
                  <span className="text-[10px] font-bold text-white/30 tracking-widest">{alert.time}</span>
               </div>
            </div>
         ))}
      </div>
    </div>
  )
}
