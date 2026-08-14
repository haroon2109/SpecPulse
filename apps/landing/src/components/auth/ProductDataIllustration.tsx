import { ShieldCheck, Database, FileText } from 'lucide-react'

export function ProductDataIllustration() {
  return (
    <div className="relative w-[500px] h-[400px] scale-[0.85] sm:scale-100 origin-center lg:origin-left">
      
      {/* Background connector paths */}
      <svg className="absolute inset-0 w-full h-full text-spec-primary/20" viewBox="0 0 500 400" fill="none">
        <path d="M120 120 L300 200 L400 320" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M120 320 L250 280 L350 320" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M250 80 L380 150" stroke="currentColor" strokeWidth="1" />
        
        {/* Subtle decorative sparkles */}
        <path d="M420 180 l2-8 l8-2 l-8-2 l-2-8 l-2 8 l-8 2 l8 2 z" fill="#DDE6F0" />
        <path d="M280 40 l1-4 l4-1 l-4-1 l-1-4 l-1 4 l-4 1 l4 1 z" fill="#DDE6F0" />
        <path d="M80 300 l1-4 l4-1 l-4-1 l-1-4 l-1 4 l-4 1 l4 1 z" fill="#DDE6F0" />
      </svg>

      {/* Node: File Top */}
      <div className="absolute top-[60px] left-[200px] w-12 h-12 bg-white rounded-full shadow-sm border border-spec-border flex items-center justify-center text-spec-primary z-0">
        <FileText className="w-5 h-5 stroke-[1.5]" />
      </div>

      {/* Node: Database Bottom Left */}
      <div className="absolute bottom-[40px] left-[60px] w-14 h-14 bg-white rounded-full shadow-sm border border-spec-border flex items-center justify-center text-spec-primary z-0">
        <Database className="w-6 h-6 stroke-[1.5]" />
      </div>

      {/* Node: Shield Bottom Right */}
      <div className="absolute bottom-[10px] left-[280px] w-12 h-12 bg-white rounded-full shadow-sm border border-spec-border flex items-center justify-center text-spec-primary z-0">
        <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
      </div>

      {/* SPEC SHEET CARD */}
      <div className="absolute top-[80px] left-0 w-[180px] bg-white rounded-lg shadow-[0_8px_30px_rgba(15,39,79,0.08)] border border-spec-border overflow-hidden z-10">
        <div className="flex justify-between items-center px-3 py-2 border-b border-spec-border/60">
          <span className="text-[9px] font-bold text-spec-navy uppercase tracking-wider">Spec Sheet</span>
          <div className="w-2 h-2 text-spec-border font-bold text-[8px] flex items-center justify-center leading-none">x</div>
        </div>
        <div className="p-3 bg-white">
          <div className="h-1.5 w-12 bg-spec-primary/80 rounded-full mb-1"></div>
          <div className="h-1 w-20 bg-spec-muted/30 rounded-full mb-3"></div>
          
          <div className="flex gap-2 mb-3">
            <div className="w-full space-y-1.5">
              <div className="h-1 w-full bg-spec-muted/20 rounded-full"></div>
              <div className="h-1 w-full bg-spec-muted/20 rounded-full"></div>
              <div className="h-1 w-3/4 bg-spec-muted/20 rounded-full"></div>
            </div>
            <div className="w-12 h-16 shrink-0 bg-yellow-600/10 border border-yellow-600/20 rounded flex items-center justify-center relative">
              <div className="w-4 h-10 bg-yellow-700/40 rounded-sm"></div>
            </div>
          </div>
          
          <div className="space-y-2 mt-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex justify-between items-center border-b border-spec-border/40 pb-1">
                <div className="h-1 w-8 bg-spec-muted/40 rounded-full"></div>
                <div className="h-1 w-12 bg-spec-muted/20 rounded-full"></div>
              </div>
            ))}
          </div>
          
          <div className="mt-3">
            <div className="h-1.5 w-full bg-spec-navy/70 rounded-sm mb-1"></div>
            <div className="h-1 w-2/3 bg-spec-muted/30 rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* EXTRACTION PREVIEW CARD */}
      <div className="absolute top-[140px] left-[150px] w-[260px] bg-white rounded-xl shadow-[0_12px_40px_rgba(15,39,79,0.12)] border border-spec-border p-5 z-20">
        <h4 className="text-[11px] font-bold text-spec-navy mb-4">Extraction Preview</h4>
        
        <div className="space-y-3 relative">
          
          {/* Highlight rectangle */}
          <div className="absolute top-[58px] -left-2 right-12 h-[28px] bg-spec-primary/5 border border-spec-primary/20 rounded-md -z-10"></div>
          
          {[
            { attr: 'Brand', val: 'Dixon' },
            { attr: 'MPN', val: 'BV2-100' },
            { attr: 'Material', val: 'Brass' },
            { attr: 'Thread Size', val: '1/2 in' },
            { attr: 'Pressure Rating', val: '600 PSI' },
            { attr: 'Temperature Range', val: '-20°C to 120°C' },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-2 gap-4 text-[10px] items-center border-b border-spec-border/40 pb-2 last:border-0 last:pb-0">
              <div className="font-bold text-spec-navy">{row.attr}</div>
              <div className="text-spec-navy">{row.val}</div>
            </div>
          ))}
          
        </div>
        
        {/* Confidence Row Inside Card (Desktop view shows it floating, but the prompt says at the bottom "Confidence Score" and circular score) */}
        <div className="mt-5 pt-3 border-t border-spec-border/60 flex items-center justify-between">
          <span className="text-[10px] font-semibold text-spec-muted">Confidence Score</span>
          <div className="relative w-10 h-10 flex items-center justify-center mr-2">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
              <path className="text-spec-bg-subtle-1" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-spec-primary" strokeWidth="4" strokeDasharray="94, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute text-[10px] font-bold text-spec-primary">94%</div>
          </div>
        </div>
        
      </div>
      
    </div>
  )
}
