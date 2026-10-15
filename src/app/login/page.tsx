'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Shield, Send, GraduationCap, ArrowRight, User } from 'lucide-react';
import TelegramLoginWidget from '@/components/TelegramLoginWidget';

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'teacher' | 'student'>('student');
  const [name, setName] = useState('');
  const [showManual, setShowManual] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const existingUser = localStorage.getItem('teacheros_user_name');
    if (existingUser) {
      setName(existingUser);
    }
  }, []);

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const studentName = name.trim() || (activeTab === 'teacher' ? 'Ustoz Ulug\'bek' : 'Talaba');
    localStorage.setItem('teacheros_role', activeTab);
    localStorage.setItem('teacheros_user_name', studentName);
    localStorage.setItem('teacheros_credits', '3');
    localStorage.setItem('a1_student_name', studentName);
    localStorage.setItem('b1_student_name', studentName);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#070d18] text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          TeacherOS 2.0 • QuizPilot-Style Platform
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          Teacher<span className="text-indigo-400">OS</span> ga Xush Kelibsiz
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
          Telegram orqali 1-klikda kiring va interaktiv AI doskadan foydalaning
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6">
        
        {/* Telegram Auth Primary Section */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-[#229ED9]/15 border border-[#229ED9]/30 flex items-center justify-center mb-3">
            <Send className="w-6 h-6 text-[#229ED9]" />
          </div>
          <h2 className="text-base font-bold text-white mb-1">Telegram orqali Kirish</h2>
          <p className="text-xs text-slate-400 mb-4 max-w-xs">
            Parol va email kiritish shart emas. Telegram hisobingiz bilan bir zumda ulaning.
          </p>

          {/* Official Telegram Login Widget */}
          <TelegramLoginWidget redirectUrl="/" />
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-slate-900 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Yoki
          </span>
        </div>

        {/* Manual Login Accordion */}
        {!showManual ? (
          <button
            type="button"
            onClick={() => setShowManual(true)}
            className="w-full py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-all"
          >
            Oddiy ism bilan kirish (Ism yozish)
          </button>
        ) : (
          <form onSubmit={handleManualLogin} className="space-y-4 animate-fade-in">
            {/* Role Switcher */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950/60 rounded-xl border border-slate-800/60">
              <button
                type="button"
                onClick={() => setActiveTab('student')}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'student'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                Talaba
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('teacher')}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'teacher'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                Ustoz
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Ism-familiyangiz
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={activeTab === 'teacher' ? "Ustoz Ulug'bek" : "Masalan: Ulug'bek"}
                className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-xs transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-lg"
            >
              <span>Platformaga kirish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
