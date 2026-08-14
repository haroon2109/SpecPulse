import { useState } from 'react'
import { ArrowLeft, Shield, Lock, ShieldCheck, MonitorSmartphone } from 'lucide-react'

interface SecuritySettingsViewProps {
  onNavigate: (tab: 'settings') => void;
}

export function SecuritySettingsView({ onNavigate }: SecuritySettingsViewProps) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [is2faModalOpen, setIs2faModalOpen] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  // Password Modal State
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handle2faToggle = () => {
    if (twoFactorEnabled) {
      setTwoFactorEnabled(false) // Allow turning off without modal for simplicity in this demo
    } else {
      setIs2faModalOpen(true)
    }
  }

  const handleEnable2fa = () => {
    setTwoFactorEnabled(true)
    setIs2faModalOpen(false)
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl relative">
      
      {/* Back Navigation */}
      <button 
        onClick={() => onNavigate('settings')}
        className="flex items-center gap-2 text-[13px] font-medium text-spec-muted hover:text-spec-navy transition-colors mb-6 mt-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Settings
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-[26px] font-bold text-spec-navy flex items-center gap-2">
            Security <Shield className="w-6 h-6 text-spec-primary stroke-[2]" />
          </h1>
        </div>
        <p className="text-[14px] text-spec-muted">
          Manage your password, authentication and session security.
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        
        {/* Password Card */}
        <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-5 lg:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5 flex-1">
            <div className="w-12 h-12 rounded-xl bg-[#F2F7FF] flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6 text-spec-primary stroke-[1.5]" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-spec-navy mb-1">Change Password</h2>
              <p className="text-[13px] text-spec-muted">Update your password to keep your account secure.</p>
            </div>
          </div>
          <button 
            onClick={() => setIsPasswordModalOpen(true)}
            className="px-5 py-2.5 bg-white border border-spec-border text-spec-navy rounded-lg text-[13px] font-bold hover:bg-gray-50 transition-colors shrink-0"
          >
            Change Password
          </button>
        </div>

        {/* Two-Factor Authentication Card */}
        <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-5 lg:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5 flex-1">
            <div className="w-12 h-12 rounded-xl bg-[#F2F7FF] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-spec-primary stroke-[1.5]" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-spec-navy mb-1">Two-Factor Authentication</h2>
              <p className="text-[13px] text-spec-muted">Protect your account with an additional verification step.</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={handle2faToggle}
            style={{ width: '44px', height: '24px', backgroundColor: twoFactorEnabled ? '#1268E8' : '#e5e7eb', borderRadius: '9999px', position: 'relative', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s', marginLeft: '16px', flexShrink: 0 }}
          >
            <div style={{ width: '20px', height: '20px', backgroundColor: '#ffffff', borderRadius: '9999px', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', transform: twoFactorEnabled ? 'translateX(20px)' : 'translateX(0px)', transition: 'transform 0.2s' }} />
          </button>
        </div>

        {/* Active Sessions Card */}
        <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-5 lg:p-6">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#F2F7FF] flex items-center justify-center shrink-0">
              <MonitorSmartphone className="w-6 h-6 text-spec-primary stroke-[1.5]" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-spec-navy mb-1">Active Sessions</h2>
              <p className="text-[13px] text-spec-muted">Manage devices and sessions where your account is signed in.</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center py-8 bg-gray-50/50 rounded-xl border border-dashed border-spec-border">
            <p className="text-[14px] font-bold text-spec-navy mb-1">Session information unavailable</p>
            <p className="text-[13px] text-spec-muted text-center max-w-sm">Your active sessions will appear here once available.</p>
          </div>
        </div>

      </div>

      {/* Security Footer Notice */}
      <div className="w-full bg-[#F2F7FF] rounded-xl border border-blue-100 px-5 py-4 flex items-center gap-3">
        <Lock className="w-4 h-4 text-spec-primary shrink-0" />
        <span className="text-[13px] text-spec-navy font-medium">Your data is secure and encrypted.</span>
      </div>


      {/* MODALS */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spec-navy/20 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-spec-border shadow-lg w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-spec-border">
              <h3 className="text-[18px] font-bold text-spec-navy">Change Password</h3>
              <p className="text-[13px] text-spec-muted mt-1">Please enter your current password to create a new one.</p>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-[13px] font-bold text-spec-navy mb-2">Current Password</label>
                <input 
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-[#DCE6F2] rounded-lg text-[14px] text-spec-navy focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary/20"
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-spec-navy mb-2">New Password</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-[#DCE6F2] rounded-lg text-[14px] text-spec-navy focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary/20"
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-spec-navy mb-2">Confirm New Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-[#DCE6F2] rounded-lg text-[14px] text-spec-navy focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary/20"
                />
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t border-spec-border flex justify-end gap-3">
              <button 
                onClick={() => {
                  setIsPasswordModalOpen(false)
                  setCurrentPassword('')
                  setNewPassword('')
                  setConfirmPassword('')
                }}
                className="px-4 py-2 bg-white border border-spec-border text-spec-navy rounded-lg text-[13px] font-bold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setIsPasswordModalOpen(false)
                  setCurrentPassword('')
                  setNewPassword('')
                  setConfirmPassword('')
                }}
                className="px-4 py-2 bg-spec-primary text-white rounded-lg text-[13px] font-bold hover:bg-spec-primary/90 transition-colors shadow-sm"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {is2faModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spec-navy/20 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-spec-border shadow-lg w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-spec-border">
              <h3 className="text-[18px] font-bold text-spec-navy">Setup Two-Factor Authentication</h3>
              <p className="text-[13px] text-spec-muted mt-1">Enhance your account security.</p>
            </div>
            <div className="p-6">
              <div className="w-full aspect-square max-w-[200px] mx-auto bg-gray-100 rounded-xl border border-dashed border-spec-border flex items-center justify-center mb-6">
                <span className="text-spec-muted text-[13px] font-medium">QR Code Placeholder</span>
              </div>
              <p className="text-[13px] text-spec-muted text-center leading-relaxed">
                Scan this QR code with your authenticator app (e.g. Google Authenticator, Authy), then enter the 6-digit code below.
              </p>
            </div>
            <div className="p-6 bg-gray-50 border-t border-spec-border flex justify-end gap-3">
              <button 
                onClick={() => setIs2faModalOpen(false)}
                className="px-4 py-2 bg-white border border-spec-border text-spec-navy rounded-lg text-[13px] font-bold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleEnable2fa}
                className="px-4 py-2 bg-spec-primary text-white rounded-lg text-[13px] font-bold hover:bg-spec-primary/90 transition-colors shadow-sm"
              >
                Verify & Enable
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
