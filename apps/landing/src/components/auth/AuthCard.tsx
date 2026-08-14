import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react'

export function AuthCard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const endpoint = activeTab === 'signin' ? '/auth/login' : '/auth/register'
      const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Authentication failed')
      }

      // Store JWT token
      localStorage.setItem('specPulseAuthToken', data.access_token)
      
      // Navigate to onboarding or dashboard depending on if they are new (for MVP just onboarding)
      navigate('/onboarding')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[420px] bg-white rounded-3xl p-8 md:p-10 shadow-[0_12px_40px_rgba(15,39,79,0.06)] border border-spec-border/60 flex flex-col relative z-20">
      
      {/* Auth Header */}
      <div className="text-center mb-8">
        <h2 className="text-[26px] font-bold tracking-tight text-spec-navy mb-2">
          Welcome back <span className="inline-block hover:animate-wave">👋</span>
        </h2>
        <p className="text-[14px] text-spec-muted">
          Sign in to your SpecPulse account
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-spec-border mb-8">
        <button 
          onClick={() => setActiveTab('signin')}
          className={`flex-1 pb-3 text-[14px] font-semibold text-center transition-colors relative ${activeTab === 'signin' ? 'text-spec-primary' : 'text-spec-muted hover:text-spec-navy'}`}
        >
          Sign In
          {activeTab === 'signin' && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-spec-primary rounded-t-full"></div>
          )}
        </button>
        <button 
          onClick={() => setActiveTab('signup')}
          className={`flex-1 pb-3 text-[14px] font-semibold text-center transition-colors relative ${activeTab === 'signup' ? 'text-spec-primary' : 'text-spec-muted hover:text-spec-navy'}`}
        >
          Sign Up
          {activeTab === 'signup' && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-spec-primary rounded-t-full"></div>
          )}
        </button>
      </div>

      {/* Social Buttons */}
      <div className="space-y-3 mb-8">
        <button className="w-full flex items-center justify-center gap-3 rounded-[10px] border border-spec-border/80 bg-white px-4 py-2.5 text-[14px] font-semibold text-spec-navy hover:bg-spec-bg-subtle-1 transition-colors">
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
        
        <button className="w-full flex items-center justify-center gap-3 rounded-[10px] border border-spec-border/80 bg-white px-4 py-2.5 text-[14px] font-semibold text-spec-navy hover:bg-spec-bg-subtle-1 transition-colors">
          <svg className="w-[18px] h-[18px]" viewBox="0 0 21 21">
            <path fill="#f25022" d="M1 1h9v9H1z"/>
            <path fill="#00a4ef" d="M1 11h9v9H1z"/>
            <path fill="#7fba00" d="M11 1h9v9h-9z"/>
            <path fill="#ffb900" d="M11 11h9v9h-9z"/>
          </svg>
          Continue with Microsoft
        </button>
        
        <button className="w-full flex items-center justify-center gap-3 rounded-[10px] border border-spec-border/80 bg-white px-4 py-2.5 text-[14px] font-semibold text-spec-navy hover:bg-spec-bg-subtle-1 transition-colors">
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          Continue with GitHub
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-spec-border/60"></div>
        <span className="text-[12px] text-spec-muted">or</span>
        <div className="flex-1 h-px bg-spec-border/60"></div>
      </div>

      {/* Form */}
      <form className="space-y-5 mb-6" onSubmit={handleSubmit}>
        
        {/* Email */}
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-spec-navy block">Email address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-spec-muted" />
            </div>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="block w-full pl-10 pr-3 py-2.5 border border-spec-border rounded-[8px] text-[14px] placeholder:text-spec-muted/60 focus:outline-none focus:ring-2 focus:ring-spec-primary/20 focus:border-spec-primary transition-all bg-white"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-spec-navy block">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-spec-muted" />
            </div>
            <input 
              type={showPassword ? 'text' : 'password'} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="block w-full pl-10 pr-10 py-2.5 border border-spec-border rounded-[8px] text-[14px] placeholder:text-spec-muted/60 focus:outline-none focus:ring-2 focus:ring-spec-primary/20 focus:border-spec-primary transition-all bg-white"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-spec-muted hover:text-spec-navy focus:outline-none"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <div className="flex justify-end pt-1">
            <a href="#" className="text-[12px] font-semibold text-spec-primary hover:underline">Forgot password?</a>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input 
            id="remember-me" 
            name="remember-me" 
            type="checkbox" 
            defaultChecked
            className="h-4 w-4 rounded border-spec-border text-spec-primary focus:ring-spec-primary"
          />
          <label htmlFor="remember-me" className="ml-2 block text-[13px] text-spec-navy">
            Remember me
          </label>
        </div>

        {error && (
          <div className="text-red-500 text-[13px] font-medium text-center bg-red-50 p-2 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        {/* Submit */}
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 rounded-[8px] bg-spec-primary px-4 py-3 text-[15px] font-semibold text-white shadow-sm hover:bg-spec-navy transition-colors focus:outline-none focus:ring-2 focus:ring-spec-primary/50 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : (activeTab === 'signin' ? 'Sign In' : 'Sign Up')} 
          {!isLoading && <ArrowRight className="w-[18px] h-[18px]" />}
        </button>

      </form>

      {/* Security Card */}
      <div className="bg-spec-surface-light border border-spec-primary/20 rounded-[10px] p-4 flex gap-3 mb-8">
        <ShieldCheck className="w-5 h-5 text-spec-primary shrink-0 mt-0.5" />
        <div>
          <h4 className="text-[13px] font-bold text-spec-navy">Enterprise-grade security</h4>
          <p className="text-[12px] text-spec-muted mt-1 leading-relaxed">
            Your data is encrypted and protected with industry-standard security.
          </p>
        </div>
      </div>

      {/* Switch Mode Prompt */}
      <div className="text-center text-[13px] text-spec-muted">
        {activeTab === 'signin' ? (
          <>
            Don't have an account?{' '}
            <button onClick={() => setActiveTab('signup')} className="font-semibold text-spec-primary hover:underline">Sign up</button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button onClick={() => setActiveTab('signin')} className="font-semibold text-spec-primary hover:underline">Sign in</button>
          </>
        )}
      </div>

    </div>
  )
}
