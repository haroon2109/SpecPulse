import { Globe, MessageCircle, Mail } from 'lucide-react'

export function Footer() {
  const links = [
    { name: 'Product', href: '#product' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-white border-t border-spec-border pt-12 pb-8">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="SpecPulse" className="h-6 w-auto" />
            <span className="text-lg font-semibold tracking-tight text-spec-navy">SpecPulse</span>
          </div>
          
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleScroll(e, link.href)}
                className="text-sm font-medium text-spec-muted hover:text-spec-primary transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <a href="mailto:justimaginary21@gmail.com" className="flex items-center gap-2 text-spec-muted hover:text-spec-primary transition-colors">
              <Mail className="h-5 w-5" />
              <span className="text-sm font-medium">justimaginary21@gmail.com</span>
            </a>
          </div>
          
        </div>
        
        <div className="mt-12 text-center text-xs text-spec-border/60">
          © 2026 SpecPulse. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
