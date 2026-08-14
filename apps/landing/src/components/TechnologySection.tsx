import { Check, Code2, Link, Shield, Database, Cloud, Brain } from 'lucide-react'

export function TechnologySection() {
  const techs = [
    { name: 'Python', icon: Code2 },
    { name: 'LangChain', icon: Link },
    { name: 'Pydantic', icon: Shield },
    { name: 'Pinecone', icon: Database },
    { name: 'AWS', icon: Cloud },
    { name: 'OpenAI', icon: Brain },
  ]

  const benefits = [
    'Secure & Private',
    'Scalable Architecture',
    'API First',
    'Enterprise Ready'
  ]

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="bg-spec-bg-subtle-1 rounded-[24px] p-10 lg:p-16 border border-spec-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
            
            {/* Left */}
            <div>
              <div className="text-[11px] font-bold tracking-[0.1em] text-spec-primary uppercase mb-4">
                Built for Industrial Commerce
              </div>
              <h2 className="text-[32px] font-bold leading-[1.2] text-spec-navy mb-6 max-w-md">
                Trusted Technology.<br />Built for Real-World Data.
              </h2>
              <p className="text-[15px] leading-relaxed text-spec-muted max-w-md">
                SpecPulse combines AI, rules, and industrial data knowledge to deliver accuracy, scalability, and explainability you can trust.
              </p>
            </div>
            
            {/* Right */}
            <div>
              <h3 className="text-[15px] font-bold text-spec-navy mb-8 text-center lg:text-left">
                Powered by Modern AI & Open Technologies
              </h3>
              
              <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
                {techs.map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center justify-center bg-white rounded-xl border border-spec-border shadow-sm p-4 aspect-square">
                    <tech.icon className="w-8 h-8 text-spec-navy mb-3 stroke-1" />
                    <span className="text-[10px] font-semibold text-spec-navy">{tech.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center lg:justify-start">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 text-[13px] font-semibold text-spec-navy">
                    <Check className="w-4 h-4 text-spec-primary stroke-[3]" />
                    {benefit}
                  </div>
                ))}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
