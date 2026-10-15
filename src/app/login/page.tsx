'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Shield, User, GraduationCap, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'teacher' | 'student'>('teacher');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState<'A1' | 'B1'>('B1');
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg('');

    setTimeout(() => {
      if (activeTab === 'teacher') {
        // Teacher login
        localStorage.setItem('teacheros_role', 'teacher');
        localStorage.setItem('teacheros_user_name', name.trim() || 'Ustoz Ulug\'bek');
        router.push('/dashboard');
      } else {
        // Student login
        const studentName = name.trim() || 'Talaba';
        localStorage.setItem('teacheros_role', 'student');
        localStorage.setItem('teacheros_user_name', studentName);
        localStorage.setItem('teacheros_student_level', level);
        localStorage.setItem(level === 'A1' ? 'a1_student_name' : 'b1_student_name', studentName);
        
        // Redirect to dashboard or student view
        router.push('/dashboard');
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#070d18] text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          TeacherOS Unified Auth & Database
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          Teacher<span className="text-indigo-400">OS</span> Portal
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
          Ustoz va talabalar uchun yagona avtomatlashtirilgan ta'lim platformasi
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10">
        {/* Role Tabs */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950/60 rounded-xl mb-6 border border-slate-800/60">
          <button
            type="button"
            onClick={() => setActiveTab('teacher')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'teacher'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            Ustoz (Teacher)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('student')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'student'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Talaba (Student)
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {activeTab === 'teacher' ? 'Ustoz Ismi yoki Email' : 'Talaba Ism-Familiyasi'}
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={activeTab === 'teacher' ? 'Ulug\'bek yoki teacher@domain.uz' : 'Ismingizni kiriting...'}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <User className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {activeTab === 'student' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Darajangizni tanlang:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLevel('A1')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    level === 'A1'
                      ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  📘 A1 Beginner (11 Mavzu)
                </button>
                <button
                  type="button"
                  onClick={() => setLevel('B1')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    level === 'B1'
                      ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  🚀 B1 Intermediate (29 Mavzu)
                </button>
              </div>
            </div>
          )}

          {activeTab === 'teacher' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Xavfsizlik Paroli (Ixtiyoriy)
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ustoz paroli..."
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          )}

          {msg && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-300 text-xs rounded-xl">
              {msg}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'teacher'
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/30'
            }`}
          >
            {isLoading ? 'Kirilmoqda...' : 'Kabinetga Kirish'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Feature Pills */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>Natijalar real vaqtda bazaga saqlanadi</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
            <span>Xatolar tahlili va 100% o'zlashtirish halqasi</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
            <span>Telegram bot orqali ustozga tezkor hisobot</span>
          </div>
        </div>
      </div>
    </div>
  );
}
