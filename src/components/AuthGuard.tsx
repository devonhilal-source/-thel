import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { LogIn, Feather, Mail, Lock } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { currentUser, authLoading, login, signUpWithEmail, signInWithEmail } = useApp();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "signup") {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    }
  };

  const signInWith = async (provider: "google" | "anonymous") => {
    setError("");
    try {
      await login(provider);
    } catch (err: any) {
       setError(err.message || "Failed to sign in with provider");
    }
  };

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] animate-pulse">
        <Feather className="w-12 h-12 text-ink/20 mb-4" />
        <p className="font-serif italic text-ink/40">Awakening the anthology...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-stone/10 py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="w-16 h-16 bg-oxblood rounded-sm flex items-center justify-center shadow-2xl rotate-3">
              <Feather className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-serif text-5xl font-light leading-tight">Welcome to the <br/><span className="italic">Æthel Anthology</span></h2>
            <p className="font-serif text-xl italic text-ink/60 leading-relaxed">
              A structured sanctuary for the modern poet. Sign in to contribute your stanzas, join challenges, and connect with fellow wordsmiths.
            </p>
          </div>

          <div className="bg-parchment p-10 shadow-2xl border border-ink/5 rounded-sm">
            <div className="flex gap-8 mb-8 border-b border-ink/10">
              <button 
                onClick={() => setMode("login")}
                className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all ${mode === "login" ? "text-oxblood border-b-2 border-oxblood" : "text-ink/30"}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setMode("signup")}
                className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all ${mode === "signup" ? "text-oxblood border-b-2 border-oxblood" : "text-ink/30"}`}
              >
                New Account
              </button>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-6 mb-10">
              {error && <p className="text-[10px] text-red-600 font-bold uppercase bg-red-50 p-3 border border-red-100">{error}</p>}
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 flex items-center gap-2">
                   <Mail className="w-3 h-3" /> Email Archive
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-ink/20 py-2 font-serif focus:outline-none focus:border-oxblood text-lg italic"
                  placeholder="name@anthology.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 flex items-center gap-2">
                   <Lock className="w-3 h-3" /> Digital Key
                </label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-ink/20 py-2 font-serif focus:outline-none focus:border-oxblood text-lg"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-ink text-white py-4 text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-oxblood transition-all active:scale-[0.98]"
              >
                {mode === "login" ? "Enter the Archive" : "Create My Seal"}
              </button>
              
              <button 
                type="button"
                onClick={() => signInWith("anonymous")}
                className="w-full border border-ink/10 text-ink/40 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-all active:scale-[0.98]"
              >
                Explore as Guest
              </button>
            </form>

            <div className="relative flex items-center justify-center my-8">
              <div className="w-full border-t border-ink/10"></div>
              <span className="absolute bg-parchment px-4 text-[9px] font-bold uppercase text-ink/30 tracking-widest">Or authenticate via</span>
            </div>

            <div className="flex justify-center">
              <button 
                onClick={() => signInWith("google")}
                className="flex items-center justify-center p-4 border border-ink/10 hover:bg-stone/20 transition-all rounded-full grayscale hover:grayscale-0 shadow-sm"
                title="Google"
              >
                <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-widest text-ink/60">Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
