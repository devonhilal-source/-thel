import React from "react";
import { useApp } from "../context/AppContext";
import { LogOut, Settings, Calendar, Award } from "lucide-react";

export default function Profile() {
  const { currentUser, logout } = useApp();
  if (!currentUser) return null;

  return (
    <div className="max-w-[680px] mx-auto px-6 py-12 animate-fade-in custom-scrollbar overflow-y-auto h-full">
      <header className="flex flex-col items-center mb-12 text-center">
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full p-1 border border-ink/10 bg-parchment shadow-sm overflow-hidden">
            <img 
              src={currentUser.photoUrl} 
              alt={currentUser.name} 
              className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700" 
            />
          </div>
          <div className="absolute -bottom-2 flex gap-2 w-full justify-center">
            <button className="p-2 bg-ink text-white rounded-full shadow-lg hover:opacity-90">
              <Settings className="w-4 h-4" />
            </button>
            <button 
              onClick={logout}
              title="Sign Out"
              className="p-2 bg-oxblood text-white rounded-full shadow-lg hover:opacity-90"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
        <h2 className="font-serif text-4xl mb-1">{currentUser.name}</h2>
        <p className="font-sans text-[10px] text-ink/50 uppercase tracking-[0.3em] mb-6">@{currentUser.username}</p>
        <p className="font-serif text-lg italic text-ink/60 max-w-[480px] leading-relaxed mb-8">
          {currentUser.bio}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {currentUser.skillTags.map(tag => (
            <span key={tag} className="px-4 py-1.5 bg-pressed-rose/20 text-ink font-sans text-[10px] uppercase tracking-widest rounded-full border border-pressed-rose/30">
              {tag}
            </span>
          ))}
          <span className="px-4 py-1.5 bg-ink/5 text-ink/50 font-sans text-[10px] uppercase tracking-widest rounded-full">Archive Member</span>
        </div>
      </header>

      <div className="grid grid-cols-3 w-full border-y border-ink/5 py-8 mb-12 text-center">
        <div>
          <div className="font-serif text-3xl mb-1">{currentUser.stats.posts}</div>
          <div className="font-sans text-[8px] uppercase tracking-[0.25em] text-ink/40">Archive Entries</div>
        </div>
        <div className="border-x border-ink/5">
          <div className="font-serif text-3xl mb-1">{currentUser.stats.votes}</div>
          <div className="font-sans text-[8px] uppercase tracking-[0.25em] text-ink/40">Critical Votes</div>
        </div>
        <div>
          <div className="font-serif text-3xl mb-1">{currentUser.stats.challengeWins}</div>
          <div className="font-sans text-[8px] uppercase tracking-[0.25em] text-ink/40">Laurels Earned</div>
        </div>
      </div>

      <nav className="flex justify-center border-b border-ink/10 mb-8">
        {["Published", "Drafts", "Bookmarks"].map((tab, i) => (
          <button key={tab} className={`px-8 py-4 font-sans text-xs uppercase tracking-widest transition-all ${i === 0 ? "border-b-2 border-ink text-ink" : "text-ink/40 hover:text-ink"}`}>
            {tab}
          </button>
        ))}
      </nav>

      <div className="space-y-12">
        {[1, 2].map(n => (
          <article key={n} className="bg-ink/5 p-8 rounded-sm border-l-4 border-quill-blue transition-all hover:bg-ink/10 cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-serif text-2xl italic">The Architecture of Silence</h3>
              <span className="font-sans text-[10px] text-ink/40 uppercase tracking-widest">Oct 12</span>
            </div>
            <div className="font-serif text-lg italic text-ink/60 line-clamp-3 leading-relaxed mb-6">
              Empty rooms hold more than breath,<br/>
              They carry the weight of what was never said,<br/>
              Between the mortar and the shadow...
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-ink/5">
              <div className="flex gap-4">
                <span className="flex items-center gap-1 font-sans text-[10px] text-ink/40 uppercase tracking-widest"><Award className="w-3 h-3" /> 248</span>
              </div>
              <button className="font-sans text-[10px] font-bold text-quill-blue uppercase hover:underline">Read Stanza</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
