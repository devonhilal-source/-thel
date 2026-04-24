import React from "react";
import { Link } from "react-router-dom";
import { Search, PenLine, History } from "lucide-react";

export default function Correspondence() {
  const activeChats = [
    { id: "c1", name: "Julian Vane", lastMsg: "The rhythm of the tide seems to mirror...", time: "2m ago", status: "unread", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=128" },
    { id: "c2", name: "Elena Moretti", lastMsg: "I've considered your feedback on the third...", time: "Yesterday", status: "read", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=128" },
    { id: "c3", name: "Arthur Sterling", lastMsg: "Did you see the announcement for the...", time: "Oct 12", status: "read", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=128" },
  ];

  return (
    <div className="max-w-[680px] mx-auto px-6 py-12 animate-fade-in">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="font-serif text-5xl mb-2">Correspondence</h2>
          <p className="font-sans text-[10px] text-ink/50 uppercase tracking-[0.2em]">Archived and active dialogues</p>
        </div>
        <button className="bg-ink text-white px-6 py-3 flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg">
          <PenLine className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-widest">New message</span>
        </button>
      </div>

      <div className="mb-8 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/20 w-5 h-5" />
        <input 
          placeholder="Search by poet or stanza..."
          className="w-full bg-ink/5 border-b border-ink/10 py-5 pl-12 pr-4 outline-none focus:border-quill-blue font-sans text-sm transition-all"
        />
      </div>

      <div className="space-y-2">
        {activeChats.map((chat) => (
          <Link 
            key={chat.id} 
            to={`/chat/${chat.id}`}
            className="group flex items-start gap-4 p-4 hover:bg-ink/5 transition-all relative cursor-pointer"
          >
            <div className="relative flex-shrink-0">
              <img src={chat.avatar} alt={chat.name} className="w-14 h-14 object-cover grayscale opacity-80 rounded-sm" />
              {chat.status === "unread" && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-parchment"></div>
              )}
            </div>
            <div className="flex-grow border-b border-ink/5 pb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-sans text-sm font-bold uppercase tracking-widest">{chat.name}</h3>
                <span className="font-sans text-[10px] text-ink/40 uppercase tracking-wider">{chat.time}</span>
              </div>
              <p className="font-serif text-lg italic text-ink/90 leading-snug line-clamp-1">{chat.lastMsg}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-ink/5 text-center">
        <History className="w-6 h-6 text-ink/10 mx-auto mb-4" />
        <p className="font-sans text-[10px] text-ink/30 italic uppercase tracking-widest">End of recent correspondence</p>
      </div>
    </div>
  );
}
