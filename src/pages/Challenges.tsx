import React from "react";
import { useApp } from "../context/AppContext";
import { Timer, ArrowRight, Play } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function Challenges() {
  const { challenges } = useApp();
  const challenge = challenges[0];

  return (
    <div className="max-w-[1200px] mx-auto px-6 pt-12 animate-fade-in">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-pressed-rose/20 text-ink font-sans text-[10px] uppercase tracking-widest rounded-full">Weekly Prompt</span>
            <span className="font-sans text-[10px] text-ink/50 uppercase tracking-widest">Issue No. {challenge.issueNumber}</span>
          </div>
          <h1 className="font-serif text-5xl leading-tight">{challenge.title}</h1>
          <p className="font-serif text-xl italic text-ink/60 max-w-[540px] leading-relaxed">
            {challenge.prompt}
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-4">
            <button className="bg-ink text-white font-sans text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-lg">
              Submit Entry
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex flex-col">
              <span className="font-sans text-[10px] text-ink/40 uppercase tracking-widest flex items-center gap-1">
                <Timer className="w-3 h-3" /> Time Remaining
              </span>
              <span className="font-serif text-3xl tabular-nums">02 : 14 : 45 : 12</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 aspect-[4/5] rounded-sm overflow-hidden shadow-2xl border border-ink/5 grayscale hover:grayscale-0 transition-all duration-1000">
          <img 
            src={challenge.imageUrl} 
            alt="Minimalist Atmosphere"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
      </section>

      <div className="w-24 h-[1px] bg-ink/10 mx-auto my-12"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4 space-y-6">
          <div className="sticky top-28">
            <h2 className="font-serif text-3xl mb-4">The Archives</h2>
            <p className="font-sans text-[10px] text-ink/50 uppercase tracking-[0.2em] mb-6">Top Entries: "The First Frost"</p>
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="p-6 bg-ink/5 border-b border-ink/5 flex items-start gap-4 group cursor-pointer hover:bg-ink/10 transition-colors">
                  <span className="font-serif text-2xl text-ink/20 group-hover:text-ink/40 transition-colors">0{n}</span>
                  <div className="flex-1">
                    <h3 className="font-sans text-xs font-bold uppercase tracking-widest">Julian Blackwood</h3>
                    <p className="font-serif text-sm italic text-ink/60 mb-1 leading-relaxed">"The garden sleeps in silver chains..."</p>
                    <span className="text-[10px] font-sans text-quill-blue uppercase">Critic's Choice</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 border border-ink font-sans text-[10px] font-semibold uppercase tracking-widest hover:bg-ink hover:text-white transition-all">
              View Full Results
            </button>
          </div>
        </aside>

        <section className="lg:col-span-8">
          <div className="flex items-center justify-between mb-8 border-b border-ink/5 pb-4">
            <h2 className="font-serif text-3xl">Live Submissions</h2>
            <div className="flex gap-4">
              <span className="font-sans text-[10px] font-bold text-ink border-b-2 border-ink pb-1 cursor-pointer">Recent</span>
              <span className="font-sans text-[10px] font-bold text-ink/40 cursor-pointer hover:text-ink">Rising</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="bg-white p-8 shadow-sm flex flex-col justify-between min-h-[300px] border border-ink/5">
                <div>
                  <span className="font-sans text-[10px] text-ink/30 mb-4 block uppercase tracking-widest">Just Now</span>
                  <blockquote className="font-serif text-lg italic text-ink/80 leading-relaxed">
                    "Silence is not the absence of noise, but the presence of a thousand unasked questions."
                  </blockquote>
                </div>
                <div className="flex items-center justify-between border-t border-ink/5 pt-4">
                  <span className="font-sans text-[10px] text-ink/50 uppercase tracking-widest">@m_proust</span>
                  <button className="flex items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-widest hover:text-quill-blue">
                    <Play className="w-3 h-3 fill-current rotate-90" /> Vote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
