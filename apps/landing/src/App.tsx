import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { LandingPage } from './components/landing/LandingPage'
import { AuthPage } from './components/auth/AuthPage'
import { WorkspaceSetupPage } from './components/onboarding/WorkspaceSetupPage'
import { StudioDashboard } from './components/dashboard/StudioDashboard'

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/onboarding" element={<WorkspaceSetupPage />} />
          <Route path="/dashboard" element={<StudioDashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
