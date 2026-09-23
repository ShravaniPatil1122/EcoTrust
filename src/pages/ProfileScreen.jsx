import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/common/MobileContainer';
import BrandHeader from '../components/common/BrandHeader';
import { useAuth } from '../context/AuthContext';
import {
  Mail,
  PackageCheck,
  FileText,
  LogOut,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const displayName = user?.name || 'Shravani';
  const displayEmail = user?.email || 'user@example.com';
  const joinedDate = user?.joinedAt || 'September 2026';

  const handleBack = () => {
    navigate('/home');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleViewVerifiedProduct = () => {
    navigate('/verification-results', { state: { barcode: '8901234567890' } });
  };

  return (
    <MobileContainer showStatusBar={true} theme="light">
      <div className="flex-1 flex flex-col justify-between px-6 pb-8 overflow-y-auto text-left">
        {/* Header with back navigation to Home */}
        <div className="-mx-6">
          <BrandHeader
            showBack={true}
            onBack={handleBack}
            backTo="/home"
            title="My Profile"
            showLogo={false}
          />
        </div>

        <div className="space-y-4 my-auto py-2">
          {/* User Identity Card */}
          <div className="bg-white rounded-3xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 flex items-center gap-4">
            {/* Avatar Circle with Initials */}
            <div className="w-16 h-16 rounded-full bg-emerald-700 text-white font-extrabold text-xl flex items-center justify-center flex-shrink-0 shadow-md">
              {displayName.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10.5px] font-bold border border-emerald-200 mb-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>Verified Consumer</span>
              </div>
              <h2 className="text-[18px] font-bold text-[#0F291E] truncate">
                {displayName}
              </h2>
              <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
                <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
                <span>{displayEmail}</span>
              </p>
            </div>
          </div>

          {/* Section: My Activity */}
          <div className="space-y-2.5">
            <h3 className="text-[14px] font-bold text-[#0F291E] px-1">
              My Activity
            </h3>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100 overflow-hidden">
              {/* Products Scanned Item */}
              <button
                type="button"
                onClick={handleViewVerifiedProduct}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <PackageCheck className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] text-[#0F291E] group-hover:text-emerald-800 transition-colors">
                      Products Scanned
                    </h4>
                    <p className="text-xs text-slate-500">
                      1 product verified (Herbal Shampoo)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                    85/100
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              {/* Verification Reports Item */}
              <button
                type="button"
                onClick={handleViewVerifiedProduct}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] text-[#0F291E] group-hover:text-emerald-800 transition-colors">
                      Verification Reports
                    </h4>
                    <p className="text-xs text-slate-500">
                      1 report with verified ECOCERT & FSC
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Section: Account & Settings */}
          <div className="space-y-2.5">
            <h3 className="text-[14px] font-bold text-[#0F291E] px-1">
              Account
            </h3>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100 overflow-hidden text-xs">
              <div className="p-3.5 flex items-center justify-between text-slate-600">
                <span className="font-medium text-slate-700">Account Type</span>
                <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Consumer Demo
                </span>
              </div>

              <div className="p-3.5 flex items-center justify-between text-slate-600">
                <span className="font-medium text-slate-700">Member Since</span>
                <span className="font-medium text-slate-800">{joinedDate}</span>
              </div>

              <div className="p-3.5 flex items-center justify-between text-slate-600">
                <span className="font-medium text-slate-700">Settings</span>
                <span className="text-[11px] text-slate-400">Default preferences active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons: Log Out */}
        <div className="w-full pt-4 space-y-2">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full h-[50px] rounded-full border border-red-200 bg-red-50/70 hover:bg-red-100 text-red-700 font-semibold text-[15px] flex items-center justify-center gap-2 transition-colors cursor-pointer select-none active:scale-[0.985]"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
