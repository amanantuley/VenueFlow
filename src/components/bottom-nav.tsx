"use client"

import { Map as MapIcon, Navigation2, Menu, Bell, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { id: "map", label: "Map", icon: MapIcon },
    { id: "navigate", label: "Navigate", icon: Navigation2 },
    { id: "queues", label: "Queues", icon: Menu },
    { id: "alerts", label: "Alerts", icon: Bell },
    { id: "chat", label: "AI Chat", icon: MessageSquare },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0D14] border-t border-white/5 flex items-center justify-around px-2 py-4 md:hidden pb-safe mb-safe">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300 relative",
              isActive ? "text-primary scale-105" : "text-muted-foreground hover:text-white/70"
            )}
          >
            {/* Active Indicator Glow */}
            {isActive && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-primary rounded-full shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
            )}
            <div className="relative">
               <Icon className={cn("h-[22px] w-[22px] transition-colors", isActive && "fill-primary/20")} />
               {/* Notification badge for alerts */}
               {tab.id === 'alerts' && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-destructive rounded-full border-2 border-[#0A0D14] text-[8px] font-bold flex items-center justify-center text-white">3</span>
               )}
            </div>
            <span className="text-[10px] font-semibold tracking-wide">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}