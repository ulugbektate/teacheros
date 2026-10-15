'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, CheckCircle2, ShieldCheck, Sparkles, User, ExternalLink } from 'lucide-react';

interface TelegramLoginProps {
  botUsername?: string;
  onSuccess?: (user: any) => void;
  redirectUrl?: string;
}

declare global {
  interface Window {
    onTelegramAuth?: (user: any) => void;
  }
}

export default function TelegramLoginWidget({
  botUsername = 'TeacherOS_official_bot',
  onSuccess,
  redirectUrl = '/'
}: TelegramLoginProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuthData = async (user: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      const data = await res.json();

      if (data.success && data.user) {
        const u = data.user;
        localStorage.setItem('teacheros_user', JSON.stringify(u));
        localStorage.setItem('teacheros_role', u.role);
        localStorage.setItem('teacheros_user_name', u.name);
        localStorage.setItem('teacheros_credits', String(u.credits || 3));
        localStorage.setItem('teacheros_student_level', 'B1');
        localStorage.setItem('a1_student_name', u.name);
        localStorage.setItem('b1_student_name', u.name);

        if (onSuccess) {
          onSuccess(u);
        } else {
          router.push(redirectUrl);
        }
      } else {
        setError(data.error || 'Telegram orqali kirishda xatolik yuz berdi');
      }
    } catch (err: any) {
      setError(err.message || 'Server bilan aloqa uzildi');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.onTelegramAuth = (user: any) => {
      handleAuthData(user);
    };

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.async = true;
      script.setAttribute('data-telegram-login', botUsername);
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-radius', '12');
      script.setAttribute('data-request-access', 'write');
      script.setAttribute('data-userpic', 'true');
      script.setAttribute('data-onauth', 'onTelegramAuth(user)');
      containerRef.current.appendChild(script);
    }

    return () => {
      delete window.onTelegramAuth;
    };
  }, [botUsername]);

  // Demo 1-click login for instant test as Ulugb7k
  const handleQuickDemo = (username: string, role: 'teacher' | 'student') => {
    handleAuthData({
      id: 6315515792,
      first_name: 'Ulugbek',
      last_name: '',
      username: username,
      photo_url: '',
      auth_date: Math.floor(Date.now() / 1000),
      hash: 'direct_pass'
    });
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      {/* Official Telegram Login Widget Container */}
      <div 
        ref={containerRef} 
        className="min-h-[46px] flex items-center justify-center transition-transform hover:scale-[1.02]"
      />

      {error && (
        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs text-center w-full">
          {error}
        </div>
      )}

      {/* Alternative Bot Link */}
      <div className="w-full pt-3 border-t border-slate-800/80 flex flex-col items-center gap-2">
        <a
          href={`https://t.me/${botUsername}`}
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#229ED9]/15 hover:bg-[#229ED9]/25 text-[#229ED9] border border-[#229ED9]/30 text-xs font-bold transition-all"
        >
          <Send className="w-3.5 h-3.5" />
          @{botUsername} botida ochish
          <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
        </a>

        {/* 1-click Quick Test as @Ulugb7k */}
        <button
          type="button"
          onClick={() => handleQuickDemo('Ulugb7k', 'teacher')}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all border border-slate-700/50"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>@Ulugb7k profili bilan darhol kirish (1-klik)</span>
        </button>
      </div>
    </div>
  );
}
