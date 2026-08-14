import { Link } from 'react-router-dom'
import { ShieldCheck, FileText, Users, Factory, PackageOpen, Globe } from 'lucide-react'
import { ProductDataIllustration } from './ProductDataIllustration'

export function MarketingPanel() {
  return (
    <div className="flex flex-col h-full max-w-xl mx-auto lg:mx-0">
      
      {/* Brand Header */}
      <Link to="/" className="flex items-center gap-2 mb-10 w-fit">
        <img src="/logo.png" alt="SpecPulse" className="h-8 w-auto" />
        <span className="text-[22px] font-semibold tracking-tight text-spec-navy">SpecPulse</span>
      </Link>
      
      {/* Product Badge */}
      <div className="inline-flex items-center gap-2 rounded-full bg-[#F0F6FF] px-4 py-1.5 w-fit mb-8">
        <svg className="w-4 h-4 text-spec-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
          <path d="M5 3v4M3 5h4"/>
        </svg>
        <span className="text-[13px] font-bold text-spec-primary tracking-wide">AI-Powered Product Intelligence</span>
      </div>
      
      {/* Hero Heading */}
      <h1 className="text-[36px] md:text-[42px] font-bold leading-[1.15] text-spec-navy mb-6">
        Unlock the Power of<br />
        Product Intelligence<br />
        for <span className="text-spec-primary">Industrial Commerce</span>
      </h1>
      
      {/* Description */}
      <p className="text-[15px] leading-relaxed text-spec-muted mb-10 max-w-[480px]">
        SpecPulse extracts, normalizes, and enriches product data from any spec sheet or catalog—delivering accurate, structured, and explainable insights at scale.
      </p>
      
      {/* Feature List */}
      <div className="space-y-6 mb-12">
        <div className="flex gap-4">
          <ShieldCheck className="w-[22px] h-[22px] text-spec-primary stroke-[2] mt-0.5 shrink-0" />
          <div>
            <div className="text-[14px] font-bold text-spec-navy">Accurate & Reliable</div>
            <div className="text-[13px] text-spec-muted mt-0.5">AI + rules ensure high accuracy and data consistency.</div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <FileText className="w-[22px] h-[22px] text-spec-primary stroke-[2] mt-0.5 shrink-0" />
          <div>
            <div className="text-[14px] font-bold text-spec-navy">Built for Scale</div>
            <div className="text-[13px] text-spec-muted mt-0.5">Enterprise-grade platform for large product catalogs.</div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <Users className="w-[22px] h-[22px] text-spec-primary stroke-[2] mt-0.5 shrink-0" />
          <div>
            <div className="text-[14px] font-bold text-spec-navy">Human-in-the-Loop</div>
            <div className="text-[13px] text-spec-muted mt-0.5">Review, validate, and improve with full transparency.</div>
          </div>
        </div>
      </div>
      
      {/* Product Illustration */}
      <div className="flex-grow flex items-center justify-center relative min-h-[320px] mb-12">
        <ProductDataIllustration />
      </div>
      
      {/* Audience Row */}
      <div className="pt-8 border-t border-spec-border/60 mt-auto">
        <div className="text-[12px] font-bold text-spec-muted mb-6 text-center lg:text-left">
          Trusted by data teams in industrial commerce
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <div className="flex items-center gap-3">
            <Factory className="w-8 h-8 text-spec-muted stroke-[1.5]" />
            <div className="text-[12px] font-semibold text-spec-navy leading-tight">
              Manufacturing<br />Leaders
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <PackageOpen className="w-8 h-8 text-spec-muted stroke-[1.5]" />
            <div className="text-[12px] font-semibold text-spec-navy leading-tight">
              Industrial<br />Suppliers
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Globe className="w-8 h-8 text-spec-muted stroke-[1.5]" />
            <div className="text-[12px] font-semibold text-spec-navy leading-tight">
              Global<br />Enterprises
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-spec-muted stroke-[1.5]" />
            <div className="text-[12px] font-semibold text-spec-navy leading-tight">
              Data<br />Teams
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  )
}
