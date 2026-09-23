import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/common/MobileContainer';
import BrandLogo from '../components/common/BrandLogo';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ShieldCheck, Sparkles } from 'lucide-react';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Shravani');

  // If already authenticated, redirect to /home immediately
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, isSignUp ? name : (name || 'Shravani'));
    navigate('/home');
  };

  const handleFillDemo = () => {
    setEmail('user@example.com');
    setPassword('password123');
    setName('Shravani');
    login('user@example.com', 'password123', 'Shravani');
    navigate('/home');
  };

  return (
    <MobileContainer showStatusBar={true} theme="light">
      <div className="flex-1 flex flex-col justify-between px-6 pt-7 pb-8 relative overflow-hidden text-left">
        {/* Subtle decorative background watermarks */}
        <div className="absolute -top-12 -right-12 w-44 h-44 pointer-events-none opacity-[0.06] text-emerald-800 -z-0">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M10 90C10 90 20 40 60 20C90 5 95 10 95 10C95 10 100 30 70 60C40 90 10 90 10 90Z" />
          </svg>
        </div>

        {/* Top: EcoTrust Brand Logo */}
        <div className="pt-3 flex flex-col items-center z-10 text-center">
          <BrandLogo showTagline={true} size="large" />
        </div>

        {/* Middle: Auth Card */}
        <div className="my-auto py-4 z-10">
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(22,101,52,0.06)] border border-slate-200/80 space-y-4">
            <div>
              <h2 className="text-[20px] font-bold text-[#0F291E] tracking-tight">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {isSignUp
                  ? 'Sign up to check sustainability evidence before you trust.'
                  : 'Log in to audit product claims and verify eco-credentials.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
              {isSignUp && (
                <div className="space-y-1">
                  <label className="text-[12px] font-semibold text-slate-700 block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="text"
                      required={isSignUp}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Shravani"
                      className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 bg-[#F9FAF9] text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 bg-[#F9FAF9] text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-semibold text-slate-700 block">
                    Password
                  </label>
                  {!isSignUp && (
                    <span className="text-[11px] font-medium text-emerald-700 select-none">
                      Demo mode
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 bg-[#F9FAF9] text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button type="submit" variant="primary" showArrow={true}>
                  {isSignUp ? 'Create Account' : 'Login'}
                </Button>
              </div>
            </form>

            {/* Quick Demo 1-Click Login Button */}
            <div className="pt-1 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={handleFillDemo}
                className="w-full py-2 text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50/70 hover:bg-emerald-100 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>One-Click Demo Login (as Shravani)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Toggle: Switch between Login & Sign Up */}
        <div className="text-center z-10 space-y-2">
          <p className="text-xs text-slate-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-bold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
            >
              {isSignUp ? 'Login' : 'Create account'}
            </button>
          </p>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Independent Eco-Evidence Registry</span>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
