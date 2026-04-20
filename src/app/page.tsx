"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Zap, Shield, Sparkles, MapPin, Ticket, Cpu, BarChart3, CloudLightning } from "lucide-react"
import { Footer } from "@/components/footer"

/**
 * Reusable Feature Component for code efficiency and DRY principles.
 * Includes explicit TypeScript types for props.
 */
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  desc: string;
  colorClass: string;
  gradientClass: string;
  delay: number;
}

const FeatureCard = ({ icon: Icon, title, desc, colorClass, gradientClass, delay }: FeatureCardProps) => (
  <motion.article 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    className={`group relative overflow-hidden rounded-[2rem] bg-card border border-white/5 p-8 hover:${colorClass} transition-colors flex flex-col h-full`}
    data-testid={`feature-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} aria-hidden="true" />
    <Icon className={`h-10 w-10 ${colorClass.replace('border-', 'text-')} mb-6`} aria-hidden="true" />
    <h3 className="text-2xl font-headline font-bold mb-3">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{desc}</p>
  </motion.article>
);

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      
      {/* Background Decorators - Semantic presentation layer */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-secondary/10 blur-[120px] mix-blend-screen animate-slow-zoom" />
      </div>

      {/* Header - Accessible Navigation */}
      <header className="relative z-20 w-full" data-testid="global-header">
        <nav className="flex items-center justify-between px-6 py-4 md:px-12 md:py-6 max-w-7xl mx-auto" aria-label="Main Navigation">
          <Link href="/" className="flex items-center gap-2" aria-label="Navigate to Home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="text-black h-5 w-5" aria-hidden="true" />
            </div>
            <span className="font-headline font-black text-2xl tracking-tighter">VenueFlow</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1">
              Log in
            </Link>
            <Link href="/signup" data-testid="header-nav-cta" className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 w-full" id="main-content">
        
        {/* Section: Hero */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-28 pb-20" aria-label="Introduction">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
              role="status"
            >
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/80">The Future of Live Events</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-6xl md:text-8xl md:leading-[0.95] font-headline font-black tracking-tight mb-8 text-white"
            >
              Your Ultimate <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Stadium </span>
              Experience.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-2xl text-muted-foreground max-w-2xl font-body leading-relaxed mb-10"
            >
              Navigate crowds, skip the concession lines, and get real-time game analytics directly from your seat. Powered by enterprise-grade AI infrastructure.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/dashboard" data-testid="hero-primary-cta" className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-black font-black text-lg hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black">
                Enter Dashboard
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link href="/signup" data-testid="hero-secondary-cta" className="flex items-center justify-center px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md font-bold text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                 Create Free Account
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Section: Social Proof & Integrations / Google Services */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-y border-white/5 bg-black/20" aria-label="Technology Partners">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-500">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-center w-full md:w-auto">Engineered With</span>
            <div className="flex items-center gap-8 md:gap-16 flex-wrap justify-center">
              <div className="flex items-center gap-2"><CloudLightning className="h-6 w-6"/> <span className="font-bold text-lg">Google Cloud</span></div>
              <div className="flex items-center gap-2"><Cpu className="h-6 w-6"/> <span className="font-bold text-lg">Firebase Auth</span></div>
              <div className="flex items-center gap-2"><Sparkles className="h-6 w-6"/> <span className="font-bold text-lg">Gemini AI</span></div>
            </div>
          </div>
        </section>

        {/* Section: Core Features Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24" aria-labelledby="features-heading">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 max-w-2xl"
          >
            <h2 id="features-heading" className="text-4xl md:text-5xl font-headline font-bold mb-4">Unmatched Capabilities</h2>
            <p className="text-xl text-muted-foreground">Built to handle stadiums scaling to 100,000+ fans with zero downtime.</p>
          </motion.div>

          {/* Grid Layout replacing the legacy Bento for a more robust Enterprise look */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={MapPin}
              title="Predictive Wayfinding"
              desc="Real-time AR mapping that re-routes you based on bathroom lines and active crowd blockages."
              colorClass="border-primary"
              gradientClass="from-primary/10"
              delay={0}
            />
            <FeatureCard 
              icon={BarChart3}
              title="Real-Time Telemetry"
              desc="Live wait-time estimations calculated by our proprietary machine-learning inference engines."
              colorClass="border-secondary"
              gradientClass="from-secondary/10"
              delay={0.1}
            />
            <FeatureCard 
              icon={Ticket}
              title="Instant Ordering"
              desc="Deep integrations with stadium POS systems to let you order without leaving your seat."
              colorClass="border-accent"
              gradientClass="from-accent/10"
              delay={0.2}
            />
          </div>
        </section>

        {/* Section: Call To Action (Bottom) */}
        <section className="mb-24 mt-12 max-w-5xl mx-auto px-6" aria-label="Final Call to Action">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="rounded-[3rem] bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 p-12 md:p-20 text-center relative overflow-hidden"
           >
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-black/0 to-black/0 pointer-events-none" />
             <div className="relative z-10">
               <h2 className="text-4xl md:text-6xl font-headline font-black mb-6">Ready to upgrade your game day?</h2>
               <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">Join thousands of fans already transforming how they experience live entertainment globally.</p>
               <Link href="/signup" data-testid="footer-cta" className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-white text-black font-black text-xl hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-primary/50">
                 Create Your Account <ArrowRight className="h-6 w-6" aria-hidden="true" />
               </Link>
             </div>
           </motion.div>
        </section>
        
      </main>

      {/* Semantic Footer Component */}
      <Footer />
      
    </div>
  )
}
