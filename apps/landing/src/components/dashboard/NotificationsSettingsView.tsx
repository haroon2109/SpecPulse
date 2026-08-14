import { useState } from 'react'
import { ChevronRight, Mail, FileText, Bell, ShieldCheck, ClipboardList, MessageSquare, CloudUpload, ChevronDown, Lock } from 'lucide-react'

interface NotificationsSettingsViewProps {
  onNavigate: (tab: 'settings') => void;
}

export function NotificationsSettingsView({ onNavigate }: NotificationsSettingsViewProps) {
  // Email Notifications State
  const [emailProductUpdates, setEmailProductUpdates] = useState(true)
  const [emailExtractionReports, setEmailExtractionReports] = useState(true)
  const [emailSystemAlerts, setEmailSystemAlerts] = useState(true)
  const [emailSecurityAlerts, setEmailSecurityAlerts] = useState(false)

  // In-App Notifications State
  const [inAppTaskUpdates, setInAppTaskUpdates] = useState(true)
  const [inAppMentions, setInAppMentions] = useState(true)
  const [inAppUploads, setInAppUploads] = useState(true)

  // Quiet Hours State
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(false)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl relative">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px] mb-6 mt-2">
        <button 
          onClick={() => onNavigate('settings')}
          className="text-spec-muted hover:text-spec-navy transition-colors"
        >
          Settings
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-spec-muted" />
        <span className="font-bold text-spec-navy">Notifications</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[26px] font-bold text-spec-navy mb-2">Notifications</h1>
          <p className="text-[14px] text-spec-muted">
            Manage email notifications and in-app alerts.
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-spec-primary text-white rounded-lg text-[13px] font-bold hover:bg-spec-primary/90 transition-colors shadow-sm shrink-0">
          Save Changes
        </button>
      </div>

      <div className="flex flex-col gap-6 mb-6">
        
        {/* Email Notifications Card */}
        <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-6 lg:p-8">
          <h2 className="text-[16px] font-bold text-spec-navy mb-1">Email Notifications</h2>
          <p className="text-[13px] text-spec-muted mb-6">Manage email notifications for important updates.</p>

          <div className="flex flex-col gap-4">
            
            {/* ROW 1: Product Updates */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-xl bg-[#F2F7FF] flex items-center justify-center text-spec-primary shrink-0">
                  <Mail className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-8 items-center">
                  <div className="text-[14px] font-bold text-spec-navy">Product Updates</div>
                  <div className="text-[12px] text-spec-muted lg:col-span-2">Receive email notifications about product updates and new features.</div>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setEmailProductUpdates(!emailProductUpdates)}
                style={{ width: '44px', height: '24px', backgroundColor: emailProductUpdates ? '#1268E8' : '#e5e7eb', borderRadius: '9999px', position: 'relative', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s', marginLeft: '16px', flexShrink: 0 }}
              >
                <div style={{ width: '20px', height: '20px', backgroundColor: '#ffffff', borderRadius: '9999px', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', transform: emailProductUpdates ? 'translateX(20px)' : 'translateX(0px)', transition: 'transform 0.2s' }} />
              </button>
            </div>

            <div className="w-full h-px bg-spec-border/40 my-2"></div>

            {/* ROW 2: Extraction Reports */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-xl bg-[#F2F7FF] flex items-center justify-center text-spec-primary shrink-0">
                  <FileText className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-8 items-center">
                  <div className="text-[14px] font-bold text-spec-navy">Extraction Reports</div>
                  <div className="text-[12px] text-spec-muted lg:col-span-2">Get notified when extraction jobs are completed.</div>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setEmailExtractionReports(!emailExtractionReports)}
                style={{ width: '44px', height: '24px', backgroundColor: emailExtractionReports ? '#1268E8' : '#e5e7eb', borderRadius: '9999px', position: 'relative', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s', marginLeft: '16px', flexShrink: 0 }}
              >
                <div style={{ width: '20px', height: '20px', backgroundColor: '#ffffff', borderRadius: '9999px', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', transform: emailExtractionReports ? 'translateX(20px)' : 'translateX(0px)', transition: 'transform 0.2s' }} />
              </button>
            </div>

            <div className="w-full h-px bg-spec-border/40 my-2"></div>

            {/* ROW 3: System Alerts */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-xl bg-[#F2F7FF] flex items-center justify-center text-spec-primary shrink-0">
                  <Bell className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-8 items-center">
                  <div className="text-[14px] font-bold text-spec-navy">System Alerts</div>
                  <div className="text-[12px] text-spec-muted lg:col-span-2">Receive alerts for system issues and downtime.</div>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setEmailSystemAlerts(!emailSystemAlerts)}
                style={{ width: '44px', height: '24px', backgroundColor: emailSystemAlerts ? '#1268E8' : '#e5e7eb', borderRadius: '9999px', position: 'relative', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s', marginLeft: '16px', flexShrink: 0 }}
              >
                <div style={{ width: '20px', height: '20px', backgroundColor: '#ffffff', borderRadius: '9999px', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', transform: emailSystemAlerts ? 'translateX(20px)' : 'translateX(0px)', transition: 'transform 0.2s' }} />
              </button>
            </div>

            <div className="w-full h-px bg-spec-border/40 my-2"></div>

            {/* ROW 4: Security Alerts */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-xl bg-[#F2F7FF] flex items-center justify-center text-spec-primary shrink-0">
                  <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-8 items-center">
                  <div className="text-[14px] font-bold text-spec-navy">Security Alerts</div>
                  <div className="text-[12px] text-spec-muted lg:col-span-2">Get notified about security events and account activity.</div>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setEmailSecurityAlerts(!emailSecurityAlerts)}
                style={{ width: '44px', height: '24px', backgroundColor: emailSecurityAlerts ? '#1268E8' : '#e5e7eb', borderRadius: '9999px', position: 'relative', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s', marginLeft: '16px', flexShrink: 0 }}
              >
                <div style={{ width: '20px', height: '20px', backgroundColor: '#ffffff', borderRadius: '9999px', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', transform: emailSecurityAlerts ? 'translateX(20px)' : 'translateX(0px)', transition: 'transform 0.2s' }} />
              </button>
            </div>

          </div>
        </div>

        {/* In-App Notifications Card */}
        <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-6 lg:p-8">
          <h2 className="text-[16px] font-bold text-spec-navy mb-1">In-App Notifications</h2>
          <p className="text-[13px] text-spec-muted mb-6">Manage in-app notifications and alerts.</p>

          <div className="flex flex-col gap-4">
            
            {/* ROW 1: Task Updates */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-xl bg-[#F2F7FF] flex items-center justify-center text-spec-primary shrink-0">
                  <ClipboardList className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-8 items-center">
                  <div className="text-[14px] font-bold text-spec-navy">Task Updates</div>
                  <div className="text-[12px] text-spec-muted lg:col-span-2">Show notifications for task progress and completion.</div>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setInAppTaskUpdates(!inAppTaskUpdates)}
                style={{ width: '44px', height: '24px', backgroundColor: inAppTaskUpdates ? '#1268E8' : '#e5e7eb', borderRadius: '9999px', position: 'relative', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s', marginLeft: '16px', flexShrink: 0 }}
              >
                <div style={{ width: '20px', height: '20px', backgroundColor: '#ffffff', borderRadius: '9999px', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', transform: inAppTaskUpdates ? 'translateX(20px)' : 'translateX(0px)', transition: 'transform 0.2s' }} />
              </button>
            </div>

            <div className="w-full h-px bg-spec-border/40 my-2"></div>

            {/* ROW 2: Mentions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-xl bg-[#F2F7FF] flex items-center justify-center text-spec-primary shrink-0">
                  <MessageSquare className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-8 items-center">
                  <div className="text-[14px] font-bold text-spec-navy">Mentions</div>
                  <div className="text-[12px] text-spec-muted lg:col-span-2">Notify me when I am mentioned in comments.</div>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setInAppMentions(!inAppMentions)}
                style={{ width: '44px', height: '24px', backgroundColor: inAppMentions ? '#1268E8' : '#e5e7eb', borderRadius: '9999px', position: 'relative', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s', marginLeft: '16px', flexShrink: 0 }}
              >
                <div style={{ width: '20px', height: '20px', backgroundColor: '#ffffff', borderRadius: '9999px', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', transform: inAppMentions ? 'translateX(20px)' : 'translateX(0px)', transition: 'transform 0.2s' }} />
              </button>
            </div>

            <div className="w-full h-px bg-spec-border/40 my-2"></div>

            {/* ROW 3: Upload Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-xl bg-[#F2F7FF] flex items-center justify-center text-spec-primary shrink-0">
                  <CloudUpload className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-8 items-center">
                  <div className="text-[14px] font-bold text-spec-navy">Upload Notifications</div>
                  <div className="text-[12px] text-spec-muted lg:col-span-2">Show notifications for file uploads and processing.</div>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setInAppUploads(!inAppUploads)}
                style={{ width: '44px', height: '24px', backgroundColor: inAppUploads ? '#1268E8' : '#e5e7eb', borderRadius: '9999px', position: 'relative', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s', marginLeft: '16px', flexShrink: 0 }}
              >
                <div style={{ width: '20px', height: '20px', backgroundColor: '#ffffff', borderRadius: '9999px', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', transform: inAppUploads ? 'translateX(20px)' : 'translateX(0px)', transition: 'transform 0.2s' }} />
              </button>
            </div>

          </div>
        </div>

        {/* Quiet Hours Card */}
        <div className="bg-white rounded-2xl border border-spec-border shadow-sm p-6 lg:p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-[16px] font-bold text-spec-navy mb-1">Quiet Hours (Optional)</h2>
              <p className="text-[13px] text-spec-muted">Set quiet hours to pause non-urgent notifications.</p>
            </div>
            <button 
              type="button"
              onClick={() => setQuietHoursEnabled(!quietHoursEnabled)}
              style={{ width: '44px', height: '24px', backgroundColor: quietHoursEnabled ? '#1268E8' : '#e5e7eb', borderRadius: '9999px', position: 'relative', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s', marginLeft: '16px', flexShrink: 0 }}
            >
              <div style={{ width: '20px', height: '20px', backgroundColor: '#ffffff', borderRadius: '9999px', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', transform: quietHoursEnabled ? 'translateX(20px)' : 'translateX(0px)', transition: 'transform 0.2s' }} />
            </button>
          </div>

          {quietHoursEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {/* Start Time */}
              <div>
                <label className="block text-[13px] font-bold text-spec-navy mb-2">Start Time</label>
                <div className="relative">
                  <select 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className={`w-full h-10 pl-3 pr-10 appearance-none bg-white border border-[#DCE6F2] rounded-lg text-[14px] ${startTime ? 'text-spec-navy' : 'text-[#8899AE]'} focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary/20`}
                  >
                    <option value="" disabled>Select start time</option>
                    <option value="8:00 PM">8:00 PM</option>
                    <option value="9:00 PM">9:00 PM</option>
                    <option value="10:00 PM">10:00 PM</option>
                    <option value="11:00 PM">11:00 PM</option>
                    <option value="12:00 AM">12:00 AM</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-spec-muted pointer-events-none" />
                </div>
              </div>

              {/* End Time */}
              <div>
                <label className="block text-[13px] font-bold text-spec-navy mb-2">End Time</label>
                <div className="relative">
                  <select 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className={`w-full h-10 pl-3 pr-10 appearance-none bg-white border border-[#DCE6F2] rounded-lg text-[14px] ${endTime ? 'text-spec-navy' : 'text-[#8899AE]'} focus:outline-none focus:border-spec-primary focus:ring-1 focus:ring-spec-primary/20`}
                  >
                    <option value="" disabled>Select end time</option>
                    <option value="6:00 AM">6:00 AM</option>
                    <option value="7:00 AM">7:00 AM</option>
                    <option value="8:00 AM">8:00 AM</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-spec-muted pointer-events-none" />
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Security Footer Notice */}
      <div className="w-full bg-[#F2F7FF] rounded-xl border border-blue-100 px-5 py-4 flex items-center gap-3">
        <Lock className="w-4 h-4 text-spec-primary shrink-0" />
        <span className="text-[13px] text-spec-navy font-medium">Your notification preferences are saved and applied across all devices.</span>
      </div>

    </div>
  )
}
