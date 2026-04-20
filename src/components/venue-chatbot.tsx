"use client"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, X, Send, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { venueChatbot } from "@/ai/flows/venue-chatbot-flow"
import { cn } from "@/lib/utils"

export function VenueChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([
    { role: 'model', content: "Hello! I'm your VenueConcierge. How can I help you enjoy the match today?" }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMsg = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    try {
      const result = await venueChatbot({
        message: input,
        history: messages
      })
      setMessages(prev => [...prev, { role: 'model', content: result.response }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "I'm having trouble connecting. Please try again later." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-24 right-4 z-50 md:bottom-8 md:right-8">
      {isOpen ? (
        <Card className="w-[calc(100vw-32px)] md:w-96 h-[500px] shadow-2xl flex flex-col border-primary/20 animate-in slide-in-from-bottom-5">
          <CardHeader className="bg-primary text-white py-4 flex flex-row items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <CardTitle className="text-lg">VenueConcierge</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10 h-8 w-8">
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0 bg-muted/10">
            <ScrollArea className="h-full p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={cn(
                    "flex flex-col max-w-[80%] gap-1",
                    msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                  )}>
                    <div className={cn(
                      "px-4 py-2 rounded-2xl text-sm shadow-sm",
                      msg.role === 'user' ? "bg-primary text-white rounded-tr-none" : "bg-white text-foreground rounded-tl-none border border-border"
                    )}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-xs">Typing...</span>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-3 border-t bg-white shrink-0">
            <form className="flex w-full gap-2" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
              <Input 
                placeholder="Ask me anything..." 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                className="rounded-full bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
              />
              <Button type="submit" size="icon" className="rounded-full shrink-0" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-2xl bg-primary text-white hover:scale-105 transition-transform group"
        >
          <MessageSquare className="h-6 w-6 group-hover:rotate-12 transition-transform" />
        </Button>
      )}
    </div>
  )
}
