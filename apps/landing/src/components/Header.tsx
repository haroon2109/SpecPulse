import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
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
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-white sticky top-0 z-50">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="sr-only">SpecPulse</span>
            <img className="h-8 w-auto" src="/logo.png" alt="" />
            <span className="text-xl font-semibold tracking-tight text-spec-navy">SpecPulse</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-spec-muted"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navLinks.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              onClick={(e) => handleScroll(e, item.href)}
              className="text-[15px] font-semibold text-spec-navy hover:text-spec-primary cursor-pointer"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-6">
          <Link to="/auth" className="text-[15px] font-semibold text-spec-navy hover:text-spec-primary">
            Sign In
          </Link>
          <Link
            to="/auth"
            className="rounded-lg bg-spec-bright px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-spec-primary transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50"></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                <span className="sr-only">SpecPulse</span>
                <img className="h-8 w-auto" src="/logo.png" alt="" />
                <span className="text-xl font-semibold tracking-tight text-spec-navy">SpecPulse</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-spec-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleScroll(e, item.href)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-spec-navy hover:bg-gray-50 cursor-pointer"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    to="/auth"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-spec-navy hover:bg-gray-50"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth"
                    className="-mx-3 mt-2 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-spec-bright hover:bg-spec-primary"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
