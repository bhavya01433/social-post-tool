import type { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-[#0F2027] via-[#2C5364] to-[#232526] flex flex-col items-center justify-start">
          <div className="w-full max-w-3xl mx-auto px-4 py-8">
            <header className="flex flex-col items-center gap-2 mb-8">
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r bg-linear-to-r from-indigo-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
                Social AI Post Generator
              </div>
              <span className="text-lg text-gray-300 font-medium">
                Effortless, AI-powered, platform-ready content creation
              </span>
            </header>
            <main className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8">
              {children}
            </main>
            <footer className="mt-12 text-center text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Social AI Generator. All rights
              reserved.
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
