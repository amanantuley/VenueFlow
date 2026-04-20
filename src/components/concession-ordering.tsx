"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Plus, Minus, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react"
import Image from "next/image"

const MENU_ITEMS = [
  { id: 1, name: "Stadium Double Burger", price: 12.99, rating: 4.8, category: "Mains", image: "https://picsum.photos/seed/food1/300/300", tag: "Bestseller" },
  { id: 2, name: "Premium Hot Dog", price: 8.50, rating: 4.5, category: "Snacks", image: "https://picsum.photos/seed/food2/300/300" },
  { id: 3, name: "Giant Salted Pretzel", price: 6.99, rating: 4.2, category: "Snacks", image: "https://picsum.photos/seed/pretzel/300/300" },
  { id: 4, name: "Local Craft IPA", price: 11.00, rating: 4.9, category: "Drinks", image: "https://picsum.photos/seed/beer/300/300", tag: "21+" },
]

export function ConcessionOrdering() {
  const [cart, setCart] = useState<Record<number, number>>({})
  const [category, setCategory] = useState("All")
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

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

  const handleCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      setIsCheckingOut(false)
      setOrderComplete(true)
      setCart({})
      setTimeout(() => setOrderComplete(false), 3000)
    }, 2000)
  }

  const filteredItems = category === "All" ? MENU_ITEMS : MENU_ITEMS.filter(i => i.category === category)

  return (
    <div className="space-y-6 pb-24 relative min-h-[500px]">
      {/* Category Pills */}
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide px-2">
        {["All", "Mains", "Snacks", "Drinks"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`relative px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors focus:outline-none ${
              category === cat ? "text-black" : "text-white/60 hover:text-white bg-white/5 border border-white/10"
            }`}
          >
            {category === cat && (
              <motion.div
                layoutId="concessionCat"
                className="absolute inset-0 bg-primary rounded-full shadow-[0_0_15px_rgba(0,255,255,0.4)]"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={item.id} 
              className="group overflow-hidden flex flex-row h-36 bg-card/40 backdrop-blur-sm border border-white/5 rounded-3xl hover:border-primary/30 transition-all hover:bg-card/80"
            >
              <div className="relative w-36 h-36 shrink-0 overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                {item.tag && (
                  <div className="absolute top-2 left-2 bg-accent/90 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-lg backdrop-blur-md">
                    {item.tag}
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 p-4 relative">
                <div className="flex justify-between items-start">
                  <h3 className="font-headline font-bold text-base leading-tight line-clamp-2 text-white pr-2">{item.name}</h3>
                  <span className="font-black text-primary text-base drop-shadow-[0_0_5px_rgba(0,255,255,0.4)]">${item.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-1 mt-1 mb-auto">
                  <Star className="h-3 w-3 fill-accent text-accent drop-shadow-[0_0_3px_rgba(133,255,0,0.5)]" />
                  <span className="text-[10px] font-medium text-white/50">{item.rating}</span>
                </div>
                <div className="flex justify-end items-center gap-4 mt-2">
                  <AnimatePresence>
                    {cart[item.id] > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-4"
                      >
                        <button 
                          onClick={() => updateCart(item.id, -1)}
                          className="h-8 w-8 rounded-full border border-primary/50 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-white font-black text-lg w-4 text-center">{cart[item.id]}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button 
                    onClick={() => updateCart(item.id, 1)}
                    className="h-10 w-10 rounded-full bg-primary text-black flex items-center justify-center hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Floating Checkout Bar */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-24 left-4 right-4 md:bottom-10 md:right-10 md:left-auto md:w-96 z-50"
          >
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full h-16 bg-primary text-black shadow-[0_10px_40px_rgba(0,255,255,0.4)] flex justify-between items-center px-6 rounded-2xl group hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-80"
            >
              <div className="flex items-center gap-4">
                <div className="bg-black text-primary rounded-xl w-10 h-10 flex items-center justify-center font-black text-lg shadow-inner">
                  {cartCount}
                </div>
                <div className="text-left flex flex-col justify-center">
                  <span className="text-[10px] font-bold opacity-70 uppercase tracking-widest leading-none">Total Cart</span>
                  <span className="text-xl font-black leading-none mt-1">${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 font-black">
                {isCheckingOut ? (
                  <>Processing <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Star className="h-5 w-5"/></motion.div></>
                ) : (
                  <>Express Checkout <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" /></>
                )}
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {orderComplete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-card w-full max-w-sm rounded-[2rem] p-8 text-center border border-accent/20 shadow-[0_0_100px_rgba(133,255,0,0.2)]"
            >
              <div className="w-20 h-20 mx-auto bg-accent/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-10 w-10 text-accent drop-shadow-[0_0_10px_rgba(133,255,0,0.5)]" />
              </div>
              <h2 className="text-3xl font-headline font-black text-white mb-2">Order Received!</h2>
              <p className="text-white/60 mb-6 font-medium">Head to the priority pickup lane at Section 105 in approx. 5 minutes.</p>
              <div className="flex items-center justify-center gap-2 text-accent bg-accent/10 py-2 rounded-xl border border-accent/20">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-bold tracking-wider uppercase">VIP Fast Track Assigned</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}