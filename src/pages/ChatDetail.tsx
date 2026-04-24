import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ArrowLeft, Send, Paperclip, MoreVertical, Archive, Zap } from "lucide-react";

export default function ChatDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { messages, sendMessage, currentUser } = useApp();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !id) return;
    sendMessage(id, input);
    setInput("");
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-stone/20">
      <aside className="w-80 border-r border-ink/10 flex flex-col bg-parchment overflow-hidden">
        <div className="p-6 border-b border-ink/10 flex items-center justify-between bg-parchment">
          <span className="text-[10px] font-bold uppercase tracking-widest">Joint Manuscript</span>
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-sm animate-pulse"></span>
        </div>
        
        {/* Collaborative Snippets Area */}
        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-4">
          <div className="p-4 border-l-2 border-oxblood bg-parchment/50 shadow-sm">
            <p className="text-[10px] opacity-40 mb-2 font-bold uppercase tracking-tight">Line 14 • Elena M.</p>
            <p className="font-serif text-sm italic">The obsidian glass reflects nothing but the light it failed to catch.</p>
          </div>
          <div className="p-4 border-l-2 border-ink/20 opacity-50">
             <p className="text-[10px] opacity-40 mb-2 font-bold uppercase tracking-tight">Draft Fragment</p>
             <p className="font-serif text-sm italic">Shattered facets of a mirror world...</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-white overflow-hidden shadow-inner">
        <header className="p-6 border-b border-ink/10 flex items-center justify-between bg-parchment/30 backdrop-blur-sm">
           <div className="flex items-center gap-3">
             <button onClick={() => navigate("/correspondence")} className="p-2 hover:bg-ink/5 rounded-full transition-colors">
               <ArrowLeft className="w-5 h-5" />
             </button>
             <div>
               <h3 className="font-serif text-lg leading-tight">Instant Discourse</h3>
               <p className="text-[9px] uppercase tracking-widest opacity-40 font-bold">Dialogue with @julian_v</p>
             </div>
           </div>
           <div className="flex gap-2">
              <button className="p-2 hover:bg-ink/5 rounded-full text-ink/40"><Archive className="w-4 h-4" /></button>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          {/* Mock Conversation Start */}
          <div className="flex flex-col gap-1">
             <div className="flex justify-between text-[9px] opacity-40 uppercase tracking-widest font-bold">
               <span>Julian Vane</span>
               <span>10:32 AM</span>
             </div>
             <div className="p-4 bg-stone rounded-br-xl rounded-bl-xl rounded-tr-xl text-sm leading-snug font-serif italic border border-ink/5">
                I think we should intensify the imagery in stanza three. It feels too light compared to the introduction.
             </div>
          </div>

          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col gap-1 ${msg.senderId === currentUser?.id ? "items-end" : "items-start"}`}
            >
              <div className="flex justify-between w-full text-[9px] opacity-40 uppercase tracking-widest font-bold px-1">
                {msg.senderId === currentUser?.id ? <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span> : null}
                <span>{msg.senderId === currentUser?.id ? "You" : "Julian"}</span>
                {msg.senderId !== currentUser?.id ? <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span> : null}
              </div>
              <div className={`p-4 rounded-xl text-sm leading-snug font-serif italic border ${
                msg.senderId === currentUser?.id 
                  ? "bg-oxblood text-white border-transparent rounded-br-xl rounded-bl-xl rounded-tl-xl" 
                  : "bg-stone text-ink border-ink/5 rounded-br-xl rounded-bl-xl rounded-tr-xl"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <footer className="p-6 bg-parchment/30 border-t border-ink/10">
          <div className="max-w-2xl mx-auto flex items-end gap-4">
             <div className="relative flex-grow">
               <textarea
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                 placeholder="Cast a line..."
                 className="w-full bg-transparent border-0 border-b border-ink/20 py-2 text-sm focus:ring-0 focus:border-oxblood font-serif italic pr-8 resize-none min-h-[44px]"
                 rows={1}
               />
               <button 
                 onClick={handleSend}
                 className="absolute right-0 bottom-2 text-oxblood opacity-60 hover:opacity-100 transition-opacity"
               >
                 <Send className="w-5 h-5" />
               </button>
             </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
