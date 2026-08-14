import { CloudUpload, Table, ListTree, ShieldCheck, Share2, Database, ArrowRight } from 'lucide-react'

export function Workflow() {
  const steps = [
    {
      num: 1,
      title: 'Ingest',
      desc: 'Upload PDFs, images, catalogs or URLs.',
      icon: CloudUpload
    },
    {
      num: 2,
      title: 'Parse',
      desc: 'Extract text, tables & images from documents.',
      icon: Table
    },
    {
      num: 3,
      title: 'Extract',
      desc: 'AI extracts attributes into structured data.',
      icon: ListTree
    },
    {
      num: 4,
      title: 'Validate',
      desc: 'Normalize units & validate data with rules.',
      icon: ShieldCheck
    },
    {
      num: 5,
      title: 'Enrich',
      desc: 'Map taxonomy & enrich missing information.',
      icon: Share2
    },
    {
      num: 6,
      title: 'Deliver',
      desc: 'Get clean, structured, commerce-ready data.',
      icon: Database
    }
  ]

  return (
    <section id="how-it-works" className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8 relative">
        <h2 className="text-3xl font-bold tracking-tight text-spec-navy text-center mb-20">
          How SpecPulse Works
        </h2>
        
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-4 lg:gap-2 relative">
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex-1 w-full lg:w-auto max-w-[280px]">
              
              {/* Number Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-spec-primary text-white flex items-center justify-center text-sm font-bold shadow-md z-10">
                {step.num}
              </div>
              
              {/* Card */}
              <div className="h-full bg-white rounded-[14px] border border-spec-border shadow-spec-card pt-10 pb-8 px-5 flex flex-col items-center text-center relative z-0">
                <h3 className="text-[15px] font-bold text-spec-navy mb-2">{step.title}</h3>
                <p className="text-[12px] leading-relaxed text-spec-muted mb-6 flex-grow">{step.desc}</p>
                <step.icon className="w-12 h-12 text-spec-primary stroke-1" />
              </div>
              
              {/* Arrow */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 text-spec-border">
                  <ArrowRight className="w-5 h-5 opacity-50" />
                </div>
              )}
            </div>
          ))}
          
        </div>
      </div>
    </section>
  )
}
