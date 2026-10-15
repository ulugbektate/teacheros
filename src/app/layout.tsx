import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TeacherOS 2.0 — AI Powered Digital English Classroom",
  description: "Dars tayyorlash, interaktiv taqdimot, 3D fleshkartalar va uyga vazifani avtomatlashtiruvchi zamonaviy ta'lim tizimi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className="dark h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[#080b14] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-indigo-500/30 selection:text-indigo-200 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
