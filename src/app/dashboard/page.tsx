'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Users, CheckCircle2, Award, Clock, ArrowUpRight, 
  Sparkles, RefreshCw, BookOpen, AlertCircle, Eye, ExternalLink, LogOut
} from 'lucide-react';

interface Submission {
  id: string;
  student_name: string;
  syllabus_level: string;
  topic_id: number;
  topic_title: string;
  score: number;
  total_questions: number;
  percent: number;
  mistakes: any[];
  created_at: string;
}

interface StudentSummary {
  name: string;
  totalSubmissions: number;
  highestPercent: number;
  averagePercent: number;
  levels: string[];
  lastActive: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('Ustoz');
  const [userRole, setUserRole] = useState('teacher');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/submissions');
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.submissions || []);
        setStudents(data.students || []);
      }
    } catch (e) {
      console.error('Failed to load dashboard data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('teacheros_role') || 'teacher';
    const name = localStorage.getItem('teacheros_user_name') || 'Ustoz';
    setUserRole(role);
    setUserName(name);
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('teacheros_role');
    localStorage.removeItem('teacheros_user_name');
    router.push('/login');
  };

  // Stats
  const totalSubmissions = submissions.length;
  const perfectScores = submissions.filter(s => s.percent === 100).length;
  const avgPercent = totalSubmissions > 0
    ? Math.round(submissions.reduce((acc, curr) => acc + curr.percent, 0) / totalSubmissions)
    : 0;

  return (
    <div className="min-h-screen bg-[#070d18] text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Navbar */}
        <header className="flex flex-wrap justify-between items-center gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-500/20">
              T
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">TeacherOS Dashboard</h1>
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                  {userRole === 'teacher' ? 'Ustoz Kabineti' : 'Talaba Portali'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Xush kelibsiz, <strong className="text-slate-200">{userName}</strong>! Real vaqtdagi o'quvchilar progressi va test natijalari.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
            >
              <Sparkles className="w-4 h-4" />
              AI Slayd Cockpit
            </Link>
            <button
              onClick={fetchDashboardData}
              disabled={isLoading}
              className="p-2.5 rounded-xl border border-slate-800 hover:bg-slate-800/80 text-slate-400 hover:text-white transition-all"
              title="Yangilash"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl border border-slate-800 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition-all"
              title="Chiqish"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Quick Launch Cards for Trainers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-sky-950/40 via-slate-900 to-slate-900 border border-sky-500/20 rounded-2xl p-5 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-sky-400 mb-1">
                <span>📘 A1 BEGINNER SYLLABUS</span>
                <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-[10px]">11 Mavzu • 365 Savol</span>
              </div>
              <h3 className="text-base font-bold text-white">A1 Grammar Mastery Trainer</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                A1 talaba uchun o'tilgan 11 ta mavzu bo'yicha 100% o'zlashtirish va xatolar ustida ishlash platformasi.
              </p>
            </div>
            <a
              href="/homework/A1/a1-grammar-mastery.html"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all flex-shrink-0"
            >
              Ochish <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/20 rounded-2xl p-5 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 mb-1">
                <span>🚀 B1 INTERMEDIATE SYLLABUS</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-[10px]">29 Mavzu • 925 Savol</span>
              </div>
              <h3 className="text-base font-bold text-white">B1 Grammar Mastery Trainer</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                Barcha 29 ta mavzu, 66 ta noto'g'ri fe'llar chuqur tahlili va yuqori darajadagi kontrast testlar.
              </p>
            </div>
            <a
              href="/homework/B1/b1-grammar-mastery.html"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all flex-shrink-0"
            >
              Ochish <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span>Faol O'quvchilar</span>
              <Users className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{students.length}</div>
            <div className="text-[11px] text-slate-500 mt-1">Ro'yxatdan o'tgan yoki test topshirgan</div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span>Jami Topshirilgan Testlar</span>
              <BookOpen className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{totalSubmissions}</div>
            <div className="text-[11px] text-slate-500 mt-1">Baza orqali qayd etilgan natijalar</div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span>Mukammal 100% Natijalar</span>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">{perfectScores}</div>
            <div className="text-[11px] text-slate-500 mt-1">100% mastery olgan sessiyalar</div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span>O'rtacha O'zlashtirish</span>
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">{avgPercent}%</div>
            <div className="text-[11px] text-slate-500 mt-1">Barcha testlar bo'yicha o'rtacha</div>
          </div>
        </div>

        {/* Content Section: Students + Submissions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Students Leaderboard */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                O'quvchilar ({students.length})
              </h2>
            </div>

            {students.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">
                Hozircha o'quvchilar test topshirmagan.
              </div>
            ) : (
              <div className="space-y-2.5">
                {students.map((st, i) => (
                  <div key={i} className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{st.name}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {st.levels.map(lvl => (
                          <span key={lvl} className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                            {lvl}
                          </span>
                        ))}
                        <span className="text-[10px] text-slate-500">• {st.totalSubmissions} ta test</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-extrabold ${st.highestPercent === 100 ? 'text-emerald-400' : 'text-indigo-300'}`}>
                        {st.highestPercent}%
                      </div>
                      <div className="text-[10px] text-slate-500">Eng yuqori</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Live Submissions Feed */}
          <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400" />
                So'nggi Natijalar Oqimi (Live Feed)
              </h2>
              <span className="text-xs text-slate-500">{submissions.length} ta natija</span>
            </div>

            {submissions.length === 0 ? (
              <div className="text-center py-12 text-xs text-slate-500">
                Hali natijalar kelib tushmagan. A1 yoki B1 trainerda test yechilganda shu yerda paydo bo'ladi.
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                {submissions.map((sub) => {
                  const is100 = sub.percent === 100;
                  return (
                    <div 
                      key={sub.id} 
                      className={`p-3.5 rounded-xl border transition-all flex flex-wrap items-center justify-between gap-3 ${
                        is100 
                          ? 'bg-emerald-950/20 border-emerald-500/30' 
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{sub.student_name}</span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            {sub.syllabus_level} #{sub.topic_id}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{sub.topic_title}</div>
                        <div className="text-[10px] text-slate-500 mt-1">
                          {new Date(sub.created_at).toLocaleString('uz-UZ')}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className={`text-sm font-black ${is100 ? 'text-emerald-400' : (sub.percent >= 80 ? 'text-indigo-400' : 'text-amber-400')}`}>
                            {sub.score} / {sub.total_questions} ({sub.percent}%)
                          </div>
                          {sub.mistakes && sub.mistakes.length > 0 && (
                            <div className="text-[10px] text-rose-400 font-semibold">
                              {sub.mistakes.length} ta xato
                            </div>
                          )}
                        </div>

                        {sub.mistakes && sub.mistakes.length > 0 && (
                          <button
                            onClick={() => setSelectedSubmission(sub)}
                            className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                            title="Xatolarni ko'rish"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Modal: View Student Mistakes */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">
                    {selectedSubmission.student_name} — Xatolar Tahlili
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {selectedSubmission.syllabus_level} #{selectedSubmission.topic_id} {selectedSubmission.topic_title} • {selectedSubmission.score}/{selectedSubmission.total_questions} ({selectedSubmission.percent}%)
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-slate-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                {selectedSubmission.mistakes.map((m: any, idx: number) => (
                  <div key={idx} className="p-3 bg-slate-950 border-l-4 border-rose-500 rounded-lg text-xs space-y-1">
                    <div className="font-bold text-white">{idx + 1}. {m.q?.q || m.q}</div>
                    <div className="text-rose-400">❌ O'quvchi javobi: {m.chosen}</div>
                    <div className="text-emerald-400 font-semibold">✅ To'g'ri javob: {m.q?.ans || m.ans}</div>
                    {m.q?.expl && (
                      <div className="text-slate-400 text-[11px] mt-1 pt-1 border-t border-slate-900">
                        💡 <b>Qoida:</b> {m.q.expl}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedSubmission(null)}
                className="mt-5 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
              >
                Yopish
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
