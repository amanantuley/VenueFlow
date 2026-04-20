"use client"

import { ShieldAlert, Phone, Map, HeartPulse, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function EmergencyGuide() {
  return (
    <div className="space-y-6">
      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-destructive">
            <ShieldAlert className="h-6 w-6" />
            <CardTitle>Safety Center</CardTitle>
          </div>
          <CardDescription>Instant access to security and emergency services.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="destructive" className="h-auto flex-col py-4 gap-2 rounded-xl">
              <Phone className="h-6 w-6" />
              <span className="text-xs font-bold">Call Security</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 gap-2 rounded-xl border-destructive/20 text-destructive hover:bg-destructive/10">
              <HeartPulse className="h-6 w-6" />
              <span className="text-xs font-bold">First Aid Info</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Procedures & Routes
        </h3>
        
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="evac" className="border rounded-xl px-4 bg-white overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <Map className="h-5 w-5 text-primary" />
                <span className="font-semibold text-sm">Evacuation Routes</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
              In the event of an emergency evacuation, please proceed calmly to the nearest exit. Follow the illuminated exit signs.
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Lower Tier: Use Gates A, B, and C.</li>
                <li>Upper Tier: Use Ramps 1-4.</li>
                <li>Accessible Exit: Gate D (North Concourse).</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="lost" className="border rounded-xl px-4 bg-white overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <ShieldAlert className="h-5 w-5 text-primary" />
                <span className="font-semibold text-sm">Lost & Found / Child Safety</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
              Report lost children immediately to any stadium staff or visit the Guest Services hub located at Section 101.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Card className="bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <CardHeader>
          <CardTitle className="text-lg">First Aid Locations</CardTitle>
          <CardDescription className="text-white/70">Find the nearest medical assistance station.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { area: "North Concourse", loc: "Behind Section 110", open: "Until End of Event" },
            { area: "South Concourse", loc: "Behind Section 145", open: "24/7" },
          ].map((aid, i) => (
            <div key={i} className="flex justify-between items-center bg-white/10 p-3 rounded-lg border border-white/20">
              <div>
                <p className="font-bold text-sm">{aid.area}</p>
                <p className="text-xs text-white/70">{aid.loc}</p>
              </div>
              <Badge variant="outline" className="border-white/50 text-white text-[10px]">
                {aid.open}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}