import Link from 'next/link';
import { Twitter, Instagram, Linkedin, Github, Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/10 pt-16 pb-8 relative z-10" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="VenueFlow Home">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                <Zap className="text-black h-5 w-5" aria-hidden="true" />
              </div>
              <span className="font-headline font-black text-2xl tracking-tighter">VenueFlow</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              The intelligent platform for massive live events. Powered by Google Cloud and cutting-edge Gen-AI models.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="VenueFlow on Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="VenueFlow on Instagram" className="text-muted-foreground hover:text-secondary transition-colors">
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="VenueFlow on LinkedIn" className="text-muted-foreground hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="VenueFlow GitHub Repository" className="text-muted-foreground hover:text-white transition-colors">
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-headline font-bold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link href="/dashboard" className="text-sm text-muted-foreground hover:text-white transition-colors">Smart Dashboard</Link></li>
              <li><Link href="/dashboard?tab=map" className="text-sm text-muted-foreground hover:text-white transition-colors">Wayfinding AR</Link></li>
              <li><Link href="/dashboard?tab=order" className="text-sm text-muted-foreground hover:text-white transition-colors">Skip the Line</Link></li>
              <li><Link href="/dashboard?tab=safety" className="text-sm text-muted-foreground hover:text-white transition-colors">Safety Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/partners" className="text-sm text-muted-foreground hover:text-white transition-colors">Partnerships</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-sm text-muted-foreground hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} VenueFlow, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2" aria-label="System Status: Operational">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-xs font-semibold text-white">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
