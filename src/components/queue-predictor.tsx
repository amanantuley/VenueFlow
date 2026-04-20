"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Timer, Loader2, ArrowRight, Zap, Target, Activity, MapPin } from "lucide-react"

export function QueuePredictor() {
  const [loading, setLoading] = useState(false)
  const [prediction, setPrediction] = useState<any | null>(null)
  
  const [type, setType] = useState("concession stand")
  const [location, setLocation] = useState("Section 105, Level 2")

  const handlePredict = async () => {
    setLoading(true)
    
    // Simulate complex AI calculation for UI purposes
    setTimeout(() => {
      setPrediction({
        predictedWaitTimeMinutes: Math.floor(Math.random() * 15) + 2,
        isHighTraffic: Math.random() > 0.5,
        reasoning: "Based on biometric flow sensors and halftime interval proximity.",
        recommendation: "Redirect to Section 108 for 40% faster checkout times."
      });
      setLoading(false);
    }, 1500)
  }

  return (
    <div className="w-full">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
             <label className="text-[10px] uppercase font-bold text-muted-foreground/70 tracking-widest ml-1">Amenity Type</label>
             <div className="relative">
                <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select 
                  value={type} 
                  onChange={(e) => setType(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rounded-xl bg-black/40 border border-white/10 text-sm font-medium focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary appearance-none text-white"
                >
                  <option value="concession stand">⚡ Turbo Concessions</option>
                  <option value="restroom">🚻 Restroom Facilities</option>
                  <option value="entry gate">🎟️ Entry Gates</option>
                </select>
             </div>
          </div>
          <div className="space-y-1">
             <label className="text-[10px] uppercase font-bold text-muted-foreground/70 tracking-widest ml-1">Live Location</label>
             <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rounded-xl bg-black/40 border border-white/10 text-sm font-medium focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary appearance-none text-white"
                >
                  <option value="Section 105, Level 2">West Side (Sec 105)</option>
                  <option value="Section 202, Level 3">East Side (Sec 202)</option>
                  <option value="Main Entrance Gate 1">Gate 1 Alpha</option>
                </select>
             </div>
          </div>
        </div>

        <button 
          onClick={handlePredict} 
          disabled={loading}
          className="relative w-full h-14 rounded-2xl overflow-hidden group border border-secondary/30 disabled:opacity-50 transition-all font-bold"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-secondary/10 to-transparent group-hover:via-secondary/30 transition-all" />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm -z-10" />
          <span className="relative z-10 flex items-center justify-center gap-2 text-secondary tracking-wide">
            {loading ? (
              <>
                 <Loader2 className="h-5 w-5 animate-spin" />
                 Processing Heatmaps...
              </>
            ) : (
              <>
                <Activity className="h-5 w-5" />
                Run AI Prediction
              </>
            )}
          </span>
        </button>

        <AnimatePresence>
          {prediction && !loading && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: 10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="mt-4 p-5 rounded-[2rem] bg-black/60 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                 <Zap className="h-24 w-24 text-secondary/10 -rotate-12" />
              </div>

              <div className="flex justify-between items-start relative z-10 mb-4">
                 <div>
                   <span className="uppercase text-[10px] font-bold text-muted-foreground tracking-widest">Est. Clearing Time</span>
                   <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-5xl font-headline font-black text-secondary drop-shadow-[0_0_15px_rgba(255,0,255,0.4)]">
                        {prediction.predictedWaitTimeMinutes}
                      </span>
                      <span className="text-lg font-medium text-white/50">min</span>
                   </div>
                 </div>
                 <div className={cn(
                    "px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md border",
                    prediction.isHighTraffic ? "bg-primary/20 text-primary border-primary/30" : "bg-accent/20 text-accent border-accent/30"
                 )}>
                    {prediction.isHighTraffic ? "Severe Peak" : "Optimized"}
                 </div>
              </div>
              
              <div className="relative z-10 space-y-3">
                 <p className="text-sm font-medium text-white/70 italic border-l-2 border-white/20 pl-3">"{prediction.reasoning}"</p>
                 
                 {prediction.recommendation && (
                   <motion.div 
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.2 }}
                     className="flex items-start gap-3 bg-gradient-to-r from-secondary/20 to-transparent p-3 rounded-xl border border-secondary/20"
                   >
                     <Zap className="h-4 w-4 mt-0.5 text-secondary shrink-0" />
                     <span className="text-sm font-bold text-white">{prediction.recommendation}</span>
                   </motion.div>
                 )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}