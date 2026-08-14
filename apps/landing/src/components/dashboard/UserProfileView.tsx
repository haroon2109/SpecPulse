import { User, Upload, Lock, Bell } from 'lucide-react'
import { useState, useEffect } from 'react'

interface UserProfileViewProps {
  state: any;
}

export function UserProfileView({ state }: UserProfileViewProps) {
  const [email, setEmail] = useState('')
  const [notifications, setNotifications] = useState(true)

  // Use the email from the decoded token if possible, or fallback to state.workspace.workEmail, or empty string
  useEffect(() => {
    try {
      const token = localStorage.getItem('specPulseAuthToken')
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]))
        if (payload.sub) {
          setEmail(payload.sub)
          return
        }
      }
    } catch (e) {
      console.error("Failed to decode token", e)
    }
    
    if (state?.workspace?.workEmail) {
      setEmail(state.workspace.workEmail)
    }
  }, [state])

  // Get name from state, fallback to empty string
  const fullName = state?.workspace?.fullName || ''
  const role = state?.workspace?.jobTitle || 'User'
  const initial = fullName ? fullName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'U'

  // Load preferences from local storage if available
  useEffect(() => {
    const savedPrefs = localStorage.getItem('specPulseUserPrefs')
    if (savedPrefs) {
      try {
        const prefs = JSON.parse(savedPrefs)
        if (prefs.emailNotifications !== undefined) {
          setNotifications(prefs.emailNotifications)
        }
      } catch (e) {
        console.error("Failed to parse prefs", e)
      }
    }
  }, [])

  const handleToggleNotifications = () => {
    const newVal = !notifications
    setNotifications(newVal)
    localStorage.setItem('specPulseUserPrefs', JSON.stringify({ emailNotifications: newVal }))
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl">
      {/* Header */}
      <div className="mb-8 mt-2">
        <h1 className="text-[26px] font-bold text-spec-navy flex items-center gap-2 mb-2">
          User Profile <User className="w-6 h-6 text-spec-primary" />
        </h1>
        <p className="text-[14px] text-spec-muted">
          Manage your personal information and account preferences.
        </p>
      </div>

      {/* Profile Information Card */}
      <div className="w-full bg-white rounded-2xl border border-spec-border shadow-sm p-6 md:p-8 mb-6">
        <div className="mb-6">
          <h2 className="text-[16px] font-bold text-spec-navy mb-1">Profile Information</h2>
          <p className="text-[13px] text-spec-muted">Update your basic profile details.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side: Avatar */}
          <div className="flex flex-col items-center gap-4 shrink-0">
            <div className="w-24 h-24 rounded-full bg-spec-primary flex items-center justify-center text-white font-bold text-[32px] shrink-0">
              {initial}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-spec-border rounded-lg text-[13px] font-semibold text-spec-primary hover:bg-blue-50 transition-colors">
              <Upload className="w-4 h-4" />
              Change Avatar
            </button>
          </div>

          {/* Right Side: Form Fields */}
          <div className="flex-1 space-y-5">
            <div>
              <label className="block text-[13px] font-semibold text-spec-navy mb-2">Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your full name" 
                defaultValue={fullName}
                className="w-full px-3 py-2.5 bg-white border border-spec-border rounded-lg text-[14px] text-spec-navy focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary transition-all placeholder:text-spec-muted"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-spec-navy mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                defaultValue={email}
                className="w-full px-3 py-2.5 bg-white border border-spec-border rounded-lg text-[14px] text-spec-navy focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary transition-all placeholder:text-spec-muted"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-spec-navy mb-2">Role</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={role}
                  disabled
                  className="w-full px-3 py-2.5 bg-gray-50 border border-spec-border rounded-lg text-[14px] text-spec-muted cursor-not-allowed"
                />
                <Lock className="w-4 h-4 text-spec-muted absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Card */}
      <div className="w-full bg-white rounded-2xl border border-spec-border shadow-sm p-6 md:p-8 mb-6">
        <div className="mb-6">
          <h2 className="text-[16px] font-bold text-spec-navy mb-1">Preferences</h2>
          <p className="text-[13px] text-spec-muted">Set your preferences for a better experience.</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <Bell className="w-6 h-6 text-spec-primary stroke-[1.5]" />
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-spec-navy mb-0.5">Email Notifications</h3>
              <p className="text-[13px] text-spec-muted">Receive important updates and alerts via email.</p>
            </div>
          </div>
          
          {/* Toggle */}
          <button 
            onClick={handleToggleNotifications}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center shrink-0 ${notifications ? 'bg-spec-primary' : 'bg-gray-300'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 absolute ${notifications ? 'translate-x-6' : 'translate-x-1'}`}></div>
          </button>
        </div>
      </div>

      {/* Security Footer Notice */}
      <div className="w-full bg-[#F2F7FF] rounded-xl border border-blue-100 px-5 py-4 flex items-center gap-3">
        <Lock className="w-4 h-4 text-spec-primary shrink-0" />
        <span className="text-[13px] text-spec-navy font-medium">Your profile information is secure and private.</span>
      </div>

    </div>
  )
}
