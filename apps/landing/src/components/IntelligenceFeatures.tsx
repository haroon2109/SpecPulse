import { ScanText, Settings2, Network, ShieldCheck, Users } from 'lucide-react'

export function IntelligenceFeatures() {
  const features = [
    {
      title: 'Intelligent Extraction',
      description: 'Extract key-value attributes, tables, and text from PDFs, images, and catalogs using advanced AI.',
      icon: ScanText,
    },
    {
      title: 'Normalization & Validation',
      description: 'Standardize units, detect anomalies, and ensure data accuracy with rule-based validation.',
      icon: Settings2,
    },
    {
      title: 'Taxonomy Mapping',
      description: 'Auto-classify products to UNSPSC/ETIM and map attributes to your PIM schema.',
      icon: Network,
    },
    {
      title: 'Explainable Results',
      description: 'Every field is source-grounded with confidence scores and evidence for full transparency.',
      icon: ShieldCheck,
    },
    {
      title: 'Human-in-the-Loop',
      description: 'Review, approve, and correct with an intuitive dashboard built for data teams.',
      icon: Users,
    },
  ]

  return (
    <section id="features" className="py-24 bg-[#FAFAFA]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-spec-navy text-center mb-16">
          Enterprise-Grade Product Intelligence
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-[14px] border border-spec-border shadow-spec-card p-6 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-spec-bg-subtle-1 rounded-2xl flex items-center justify-center text-spec-primary mb-6">
                <feature.icon className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="text-sm font-bold text-spec-navy mb-3">{feature.title}</h3>
              <p className="text-[13px] leading-relaxed text-spec-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
