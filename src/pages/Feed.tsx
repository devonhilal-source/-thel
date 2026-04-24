import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { PoemCard } from "../components/PoemCard";

export default function Feed() {
  const { poems, currentUser, challenges } = useApp();
  const [filter, setFilter] = useState<"trending" | "chronological">("trending");

  // Mock initial poems if none exist
  const displayPoems = poems.length > 0 ? poems : [
    {
      id: "p1",
      title: "The Silence of the Glade",
      content: "Morning mist clings to the low-hanging boughs,\nWhere the thrush forgets its frantic song.\nA heavy velvet stillness rests upon the moss,\nUnbroken by the passage of a searching wind.",
      authorId: "user_1",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      upvotes: 124,
      tags: ["Nature", "FreeVerse"],
      isDraft: false,
      version: 1
    },
    {
      id: "p2",
      title: "Iron & Ink",
      content: "The city breathes in rhythmic, soot-stained sighs,\nBeneath a canopy of rusted steel and glass.\nThe streetlamp's flicker meets the tired eyes,\nOf ghosts who watch the midnight trains that pass.",
      authorId: "user_1",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      upvotes: 89,
      tags: ["Urban", "Sonnet"],
      isDraft: false,
      version: 1
    }
  ];

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Sidebar: Challenges & Stats */}
      <aside className="hidden lg:flex w-64 border-r border-ink/10 p-6 flex-col gap-8 h-full overflow-y-auto custom-scrollbar">
        {challenges.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] opacity-40 mb-4 font-bold tracking-[0.2em]">Weekly Challenge</p>
            <div className="editorial-card shadow-sm">
              <h3 className="font-serif text-lg leading-tight mb-2">{challenges[0].title}</h3>
              <p className="text-[10px] text-ink/60 mb-4 uppercase tracking-tighter">Theme: Negative Space</p>
              <div className="flex justify-between items-end">
                <div className="text-[10px] uppercase">
                  <span className="block opacity-40">Deadline</span>
                  <span className="font-bold text-oxblood">42:15:08</span>
                </div>
                <button className="px-3 py-1 bg-ink text-white text-[9px] uppercase tracking-wider font-semibold">Enter</button>
              </div>
            </div>
          </div>
        )}

        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] opacity-40 mb-4 font-bold tracking-[0.2em]">Featured Poet</p>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-stone rounded-full overflow-hidden grayscale">
              <img src={currentUser?.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"} alt="Poet" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-serif italic">{currentUser?.name || "Anonymous"}</p>
              <p className="text-[10px] text-oxblood font-bold tracking-tighter">Sonnet Specialist</p>
            </div>
          </div>
          <p className="text-[11px] leading-relaxed opacity-70 italic">Exploring the intersection of modern geometry and Petrarchan constraints.</p>
        </div>

        <div className="mt-auto border-t border-ink/5 pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center group cursor-pointer hover:bg-ink/5 p-2 transition-all">
              <span className="block text-xl font-serif italic text-oxblood">{currentUser?.stats?.posts || 0}</span>
              <span className="text-[9px] uppercase opacity-40 tracking-widest font-bold">Drafts</span>
            </div>
            <div className="text-center group cursor-pointer hover:bg-ink/5 p-2 transition-all">
              <span className="block text-xl font-serif italic text-oxblood">{currentUser?.stats?.votes || 0}</span>
              <span className="text-[9px] uppercase opacity-40 tracking-widest font-bold">Feedback</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Feed: Poetry Scroll */}
      <section className="flex-1 bg-white/20 p-10 overflow-y-auto custom-scrollbar shadow-inner">
        <div className="max-w-xl mx-auto flex flex-col gap-12">
          <header className="mb-4">
             <span className="text-[10px] uppercase tracking-[0.15em] opacity-40 mb-2 font-bold block tracking-[0.3em]">Correspondence & Verse</span>
             <h2 className="text-4xl font-serif font-light mb-1 border-b border-ink/10 pb-4">Daily Anthology</h2>
          </header>
          {displayPoems.map((poem: any) => (
            <PoemCard key={poem.id} poem={poem} author={currentUser || {}} />
          ))}
        </div>
      </section>
    </div>
  );
}
