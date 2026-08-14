import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function FinalCTA() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-spec-navy to-spec-bright px-10 py-16 lg:px-20 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Background subtle effect */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
          
          <div className="relative z-10 max-w-2xl text-center lg:text-left flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <div className="shrink-0">
               <img src="/logo.png" alt="SpecPulse" className="h-16 w-auto brightness-0 invert opacity-90" />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
                Ready to Unlock the Power<br />of Your Product Data?
              </h2>
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col items-center lg:items-end shrink-0">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-4">
              <Link
                to="/auth"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3.5 text-[15px] font-bold text-spec-primary hover:bg-gray-50 transition-colors w-full sm:w-auto"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/auth"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-transparent px-8 py-3.5 text-[15px] font-bold text-white hover:bg-white/10 transition-colors w-full sm:w-auto"
              >
                Request a Demo
              </Link>
            </div>
            <p className="text-[12px] text-blue-200">
              Enterprise-grade product intelligence at scale
            </p>
          </div>
          
        </div>
      </div>
    </section>
  )
}
