"use client"

import { useState } from "react"
import { ShoppingBag, Star, Plus, Minus, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Image from "next/image"

const MENU_ITEMS = [
  { id: 1, name: "Stadium Double Burger", price: 12.99, rating: 4.8, category: "Mains", image: "https://picsum.photos/seed/food1/300/300" },
  { id: 2, name: "Premium Hot Dog", price: 8.50, rating: 4.5, category: "Snacks", image: "https://picsum.photos/seed/food2/300/300" },
  { id: 3, name: "Giant Salted Pretzel", price: 6.99, rating: 4.2, category: "Snacks", image: "https://picsum.photos/seed/pretzel/300/300" },
  { id: 4, name: "Local Craft IPA", price: 11.00, rating: 4.9, category: "Drinks", image: "https://picsum.photos/seed/beer/300/300" },
]

export function ConcessionOrdering() {
  const [cart, setCart] = useState<Record<number, number>>({})
  const [category, setCategory] = useState("All")

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)
  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU_ITEMS.find(m => m.id === Number(id))
    return sum + (item?.price || 0) * qty
  }, 0)

  const updateCart = (id: number, delta: number) => {
    setCart(prev => {
      const next = { ...prev }
      next[id] = Math.max(0, (next[id] || 0) + delta)
      if (next[id] === 0) delete next[id]
      return next
    })
  }

  const filteredItems = category === "All" ? MENU_ITEMS : MENU_ITEMS.filter(i => i.category === category)

  return (
    <div className="space-y-6 pb-12">
      <div className="space-y-2">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 p-1">
            {["All", "Mains", "Snacks", "Drinks"].map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden flex flex-row h-32 border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="relative w-32 h-32 shrink-0">
              <Image 
                src={item.image} 
                alt={item.name} 
                fill 
                className="object-cover"
                data-ai-hint={item.name.toLowerCase()}
              />
            </div>
            <div className="flex flex-col flex-1 p-3">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-sm leading-tight line-clamp-2">{item.name}</h3>
                <span className="font-bold text-primary text-sm">${item.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 mb-auto">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-[10px] font-medium text-muted-foreground">{item.rating}</span>
              </div>
              <div className="flex justify-end items-center gap-3">
                {cart[item.id] > 0 && (
                  <>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="h-8 w-8 rounded-full border-primary text-primary"
                      onClick={() => updateCart(item.id, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-bold text-sm">{cart[item.id]}</span>
                  </>
                )}
                <Button 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-primary hover:bg-primary/90"
                  onClick={() => updateCart(item.id, 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {cartCount > 0 && (
        <div className="fixed bottom-20 left-4 right-4 md:bottom-6 md:right-6 md:left-auto md:w-80 animate-in slide-in-from-bottom-10">
          <Button className="w-full h-14 bg-primary text-white shadow-2xl flex justify-between px-6 rounded-2xl group">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-white text-primary rounded-md px-2 py-0.5 font-bold">
                {cartCount}
              </Badge>
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold opacity-80 leading-none mb-0.5">Total</p>
                <p className="text-lg font-bold leading-none">${total.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm">Checkout</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Button>
        </div>
      )}
    </div>
  )
}