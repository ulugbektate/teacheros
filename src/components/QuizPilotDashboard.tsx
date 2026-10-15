'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Sparkles, Plus, BookOpen, Presentation, Users, Trophy, 
  Settings, LogOut, UploadCloud, MessageSquare, Zap, 
  ArrowRight, CheckCircle2, ChevronRight, FileText, Send, 
  HelpCircle, Shield, Award, ExternalLink, Play
} from 'lucide-react';

interface QuizPilotDashboardProps {
  userName?: string;
  userCredits?: number;
  userRole?: string;
  onGenerateTopic: (topic: string, level?: string) => void;
  onOpenWhiteboard: (topic?: string) => void;
  onLoginClick: () => void;
  onLogout: () => void;
}

export default function QuizPilotDashboard({
  userName = 'Ulugb7k',
  userCredits = 3,
  userRole = 'student',
  onGenerateTopic,
  onOpenWhiteboard,
  onLoginClick,
  onLogout
}: QuizPilotDashboardProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'library' | 'whiteboard' | 'leaderboard'>('home');
  const [topicInput, setTopicInput] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1'>('B1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'topic' | 'file' | 'whiteboard'>('topic');
  const [fileText, setFileText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setFileText(content || '');
      setModalMode('file');
      setIsModalOpen(true);
    };
    reader.readAsText(file);
  };

  const submitModalAction = () => {
    if (modalMode === 'topic') {
      if (!topicInput.trim()) return;
      onGenerateTopic(topicInput.trim(), selectedLevel);
    } else if (modalMode === 'file') {
      if (!fileText.trim()) return;
      // Synthesize curriculum from file text
      onGenerateTopic(`Fayl asosida dars: ${fileText.slice(0, 60)}...`, selectedLevel);
    } else if (modalMode === 'whiteboard') {
      onOpenWhiteboard(topicInput.trim() || 'Present Perfect vs Past Simple');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-screen bg-[#0e111d] text-slate-100 flex overflow-hidden font-sans">
      
      {/* ======================================================== */}
      {/* 1. LEFT SIDEBAR (QuizPilot Style)                       */}
      {/* ======================================================== */}
      <aside className="w-64 bg-[#131627] border-r border-slate-800/80 flex flex-col justify-between p-4 flex-shrink-0 z-30 hidden md:flex">
        <div className="space-y-6">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 px-2 pt-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-sky-400 flex items-center justify-center font-black text-white shadow-lg shadow-indigo-500/20">
              T
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-tight text-white">teacher<span className="text-indigo-400">os</span></span>
                <span className="px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">2.0</span>
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => {
              setModalMode('topic');
              setIsModalOpen(true);
            }}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Yaratish (Create)</span>
          </button>

          {/* Nav Items */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'home'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Bosh sahifa</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'library'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Kutubxona (Library)</span>
            </button>

            <button
              onClick={() => {
                setModalMode('whiteboard');
                setIsModalOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              <div className="flex items-center gap-3">
                <Presentation className="w-4 h-4 text-purple-400" />
                <span>AI Doska (Whiteboard)</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-extrabold uppercase">
                New
              </span>
            </button>

            <Link
              href="/dashboard"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Reyting & Boshqaruv</span>
            </Link>

            <a
              href="https://t.me/TeacherOS_official_bot"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-sky-300 hover:bg-sky-500/10 transition-all"
            >
              <Send className="w-4 h-4 text-[#229ED9]" />
              <span>Telegram Bot</span>
            </a>
          </nav>
        </div>

        {/* User Card at Bottom */}
        <div className="space-y-3 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center font-bold text-xs text-indigo-300 flex-shrink-0">
                {userName.slice(0, 2).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">{userName}</div>
                <div className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                  <span>⚡ {userCredits} ta bepul</span>
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition-colors"
              title="Chiqish"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. MAIN STAGE (QuizPilot Center Area)                   */}
      {/* ======================================================== */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-[#0d101d]">
        
        {/* Top Header Bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#121526]/60 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-sky-500 flex md:hidden items-center justify-center font-bold text-white text-xs">
              T
            </div>
            <div>
              <div className="text-xs text-slate-400">Xush kelibsiz,</div>
              <div className="text-sm font-black text-white">{userName}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Free Quizzes Pill Badge (exact QuizPilot style) */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Bepul testlar: {userCredits}</span>
            </div>

            <Link
              href="/login"
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all border border-slate-700/60"
            >
              {userName === 'Mehmon' ? 'Kirish' : 'Profil'}
            </Link>
          </div>
        </header>

        {/* Content Container */}
        <div className="max-w-4xl w-full mx-auto px-6 py-8 space-y-8">
          
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Qayerdan boshlaymiz?
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Faylingizni yuklang, mavzu tanlang yoki interaktiv AI doskasida o'rganing.
            </p>
          </div>

          {/* ======================================================== */}
          {/* HERO CARD: "Turn your file into a quiz" (Purple card)     */}
          {/* ======================================================== */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#5943f6] via-[#6a54f8] to-[#806cfc] p-6 sm:p-8 text-white shadow-2xl shadow-indigo-600/20 overflow-hidden">
            {/* Background decorative circles */}
            <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-lg space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Faylingizni interaktiv testga aylantiring
              </h2>
              <p className="text-xs sm:text-sm text-indigo-100/90 font-medium">
                PDF, Word (DOCX), Konspekt yoki Matn — taxminan 1 daqiqada test va qoidalar sintez qilinadi.
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".txt,.doc,.docx,.pdf"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-[#5943f6] font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <UploadCloud className="w-4 h-4 stroke-[2.5]" />
                  <span>Faylni yuklash (Upload your file)</span>
                </button>
                <span className="text-[11px] text-indigo-200">
                  yoki mavzu bo'yicha pastdagi kartalarni tanlang
                </span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* TWO LOWER ACTION CARDS (QuizPilot style)                 */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: A quiz on a topic */}
            <div
              onClick={() => {
                setModalMode('topic');
                setIsModalOpen(true);
              }}
              className="bg-[#14182b] hover:bg-[#1a1f38] border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-5 cursor-pointer transition-all hover:shadow-xl group space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                  Mavzu bo'yicha test (A quiz on a topic)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Mavzuni yozing — AI bir zumda test, qoidalar va xato ovchisini tuzadi.
                </p>
              </div>
              <div className="flex items-center text-xs font-bold text-blue-400 gap-1 pt-1">
                <span>Boshlash</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: Lampo explains it (AI Whiteboard) */}
            <div
              onClick={() => {
                setModalMode('whiteboard');
                setIsModalOpen(true);
              }}
              className="bg-[#14182b] hover:bg-[#1a1f38] border border-slate-800/80 hover:border-purple-500/40 rounded-2xl p-5 cursor-pointer transition-all hover:shadow-xl group space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Presentation className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                    AI Doskada tushuntiradi (Lampo Explains)
                  </h3>
                  <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                    HOT
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Ixtiyoriy mavzuni 16:9 interaktiv doskada grafik va animatsiyalar bilan tushuntiradi.
                </p>
              </div>
              <div className="flex items-center text-xs font-bold text-purple-400 gap-1 pt-1">
                <span>Doskani ochish</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CURATED MASTERY TRAINERS (A1 & B1)                       */}
          {/* ======================================================== */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <span>📚 Tayyor Grammar Mastery Trenerlar</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold">
                  1,290 ta savol
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* A1 Trainer Card */}
              <div className="bg-slate-900/60 border border-slate-800 hover:border-sky-500/30 rounded-2xl p-4 flex items-center justify-between gap-3 transition-all">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-sky-400">📘 A1 BOSHLANG'ICH DARAJA</div>
                  <h4 className="text-sm font-bold text-white">A1 Master Grammar Trainer</h4>
                  <p className="text-[11px] text-slate-400">11 ta mavzu • 365 ta interaktiv savol</p>
                </div>
                <a
                  href="/homework/A1/a1-grammar-mastery.html"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 flex-shrink-0 shadow-md shadow-sky-600/20"
                >
                  <Play className="w-3 h-3 fill-white" />
                  Yechish
                </a>
              </div>

              {/* B1 Trainer Card */}
              <div className="bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 rounded-2xl p-4 flex items-center justify-between gap-3 transition-all">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-indigo-400">🚀 B1 O'RTA DARAJA</div>
                  <h4 className="text-sm font-bold text-white">B1 Master Grammar Trainer</h4>
                  <p className="text-[11px] text-slate-400">29 ta mavzu • 925 ta savol & 66 fe'l</p>
                </div>
                <a
                  href="/homework/B1/b1-grammar-mastery.html"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 flex-shrink-0 shadow-md shadow-indigo-600/20"
                >
                  <Play className="w-3 h-3 fill-white" />
                  Yechish
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ======================================================== */}
      {/* ACTION MODAL (Topic generation or File analysis)         */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#14182b] border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                {modalMode === 'topic' && 'Mavzu bo\'yicha test generatsiya qilish'}
                {modalMode === 'file' && 'Fayl matnini testga aylantirish'}
                {modalMode === 'whiteboard' && 'AI Interaktiv Doskani ishga tushirish'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {modalMode === 'file' ? (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Yuklangan matn konspekti:</label>
                <textarea
                  value={fileText}
                  onChange={(e) => setFileText(e.target.value)}
                  rows={6}
                  className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Mavzu nomini kiriting:
                  </label>
                  <input
                    type="text"
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                    placeholder="Masalan: Present Perfect, Passive Voice, Conditionals..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                    autoFocus
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400 font-semibold">CEFR Darajasi:</span>
                  <div className="flex items-center gap-1.5">
                    {(['A1', 'A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSelectedLevel(lvl)}
                        className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all ${
                          selectedLevel === lvl
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              >
                Bekor qilish
              </button>
              <button
                type="button"
                onClick={submitModalAction}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
              >
                Boshlash ➔
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
