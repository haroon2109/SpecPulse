import { Header } from '../Header'
import { Hero } from '../Hero'
import { IntelligenceFeatures } from '../IntelligenceFeatures'
import { Workflow } from '../Workflow'
import { FinalCTA } from '../FinalCTA'
import { Footer } from '../Footer'

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-spec-navy">
      <Header />
      <main className="flex-grow">
        <Hero />
        <IntelligenceFeatures />
        <Workflow />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
