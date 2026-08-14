import { useState, useEffect } from 'react'
import { TopHeader } from './TopHeader'
import { MarketingPanel } from './MarketingPanel'
import { WorkspaceFormCard } from './WorkspaceFormCard'
import { PreferencesLeftPanel } from './PreferencesLeftPanel'
import { PreferencesFormCard } from './PreferencesFormCard'
import { DataSourcesLeftPanel } from './DataSourcesLeftPanel'
import { DataSourcesFormCard } from './DataSourcesFormCard'
import { ReviewLeftPanel } from './ReviewLeftPanel'
import { ReviewFormCard } from './ReviewFormCard'
import { SecurityFooter } from './SecurityFooter'

export type ConnectedSource = {
  id: string
  name: string
  type: string
  icon: any
  color: string
}

export type OnboardingState = {
  workspace: {
    fullName: string
    workEmail: string
    jobTitle: string
    phone: string
    workspaceName: string
    workspaceSlug: string
    industry: string
    teamSize: string
  }
  preferences: {
    goals: string[]
    dataTypes: string[]
    workflow: string
    priorities: string[]
    notes: string
    industry: string
    teamSize: string
  }
  dataSources: {
    selectedTypes: string[]
    connectedSources: ConnectedSource[]
  }
}

const initialState: OnboardingState = {
  workspace: {
    fullName: '', workEmail: '', jobTitle: '', phone: '',
    workspaceName: '', workspaceSlug: 'your-workspace', industry: '', teamSize: ''
  },
  preferences: { goals: [], dataTypes: [], workflow: '', priorities: [], notes: '', industry: '', teamSize: '' },
  dataSources: { selectedTypes: [], connectedSources: [] }
}

export function WorkspaceSetupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [onboardingState, setOnboardingState] = useState<OnboardingState>(initialState)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let wsId = localStorage.getItem('specpulse_workspace_id')
    if (!wsId) {
      wsId = 'ws_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('specpulse_workspace_id', wsId)
    }

    fetch(`http://localhost:8000/workspace/${wsId}`)
      .then(res => res.json())
      .then(data => {
        if (data.id) {
           setOnboardingState({
             workspace: data.workspace || initialState.workspace,
             preferences: data.preferences || initialState.preferences,
             dataSources: data.dataSources || initialState.dataSources
           })
           setCurrentStep(data.currentStep || 1)
        }
      })
      .catch(err => console.error("Failed to load workspace state", err))
      .finally(() => setIsLoaded(true))
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    const wsId = localStorage.getItem('specpulse_workspace_id')
    if (!wsId) return
    
    fetch(`http://localhost:8000/workspace`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: wsId,
        workspace: onboardingState.workspace,
        preferences: onboardingState.preferences,
        dataSources: onboardingState.dataSources,
        currentStep: currentStep
      })
    }).catch(err => console.error("Failed to save workspace state", err))
  }, [onboardingState, currentStep, isLoaded])

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4))
  }

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
  }

  return (
    <div className="min-h-screen bg-[#F7FAFF] flex flex-col font-sans text-spec-navy">
      <TopHeader currentStep={currentStep} />
      
      {!isLoaded ? (
        <div className="flex-grow flex items-center justify-center">Loading your workspace...</div>
      ) : (
        <main className="flex-grow flex flex-col items-center p-4 md:p-8 w-full max-w-[1400px] mx-auto">
          {/* Outer 2-Column Container */}
          <div className="w-full flex flex-col lg:flex-row gap-6">
          
          {/* Left Panel (~30%) */}
          <div className="w-full lg:w-[30%] relative z-10 flex flex-col">
            {currentStep === 1 && <MarketingPanel />}
            {currentStep === 2 && <PreferencesLeftPanel />}
            {currentStep === 3 && <DataSourcesLeftPanel />}
            {currentStep === 4 && <ReviewLeftPanel />}
          </div>

          {/* Right Panel (~70%) */}
          <div className="w-full lg:w-[70%] relative z-10">
            {currentStep === 1 && <WorkspaceFormCard state={onboardingState.workspace} updateState={(s) => setOnboardingState(prev => ({...prev, workspace: {...prev.workspace, ...s}}))} onContinue={handleNextStep} />}
            {currentStep === 2 && <PreferencesFormCard state={onboardingState.preferences} updateState={(s) => setOnboardingState(prev => ({...prev, preferences: {...prev.preferences, ...s}}))} onBack={handlePrevStep} onContinue={handleNextStep} />}
            {currentStep === 3 && <DataSourcesFormCard state={onboardingState.dataSources} updateState={(s) => setOnboardingState(prev => ({...prev, dataSources: {...prev.dataSources, ...s}}))} onBack={handlePrevStep} onContinue={handleNextStep} />}
            {currentStep === 4 && <ReviewFormCard state={onboardingState} onEdit={goToStep} onBack={handlePrevStep} />}
          </div>

        </div>
        
      </main>
      )}

      <SecurityFooter />
      
    </div>
  )
}
