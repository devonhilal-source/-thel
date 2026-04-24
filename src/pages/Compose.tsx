import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { PenTool, Send, Hash, Wind, Sliders } from "lucide-react";
import { motion } from "framer-motion";

export default function Compose() {
  const { addPoem, socket, currentUser } = useApp();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [mood, setMood] = useState("");
  const [isCoWriting, setIsCoWriting] = useState(false);

  useEffect(() => {
    if (socket && isCoWriting) {
      socket.emit("join-draft", "temp-draft-123");
      socket.on("draft-updated", (newContent: string) => {
        setContent(newContent);
      });
    }
  }, [socket, isCoWriting]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (socket && isCoWriting) {
      socket.emit("edit-draft", { draftId: "temp-draft-123", content: newContent });
    }
  };

  const handlePublish = () => {
    addPoem({ title, content, tags, mood, isDraft: false, version: 1 });
    setTitle("");
    setContent("");
    setTags([]);
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar pt-12 pb-24 px-6 bg-stone/10">
      <div className="max-w-[680px] mx-auto bg-parchment shadow-2xl p-margin-page relative border border-ink/5">
        <header className="mb-12 border-b border-ink/10 pb-8">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled Manuscript"
            className="w-full bg-transparent border-none text-4xl font-serif italic outline-none placeholder:text-ink/10 font-light tracking-tighter"
          />
          <div className="flex flex-wrap items-center gap-6 mt-6">
            <button className="flex items-center gap-2 group">
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-ink/40 group-hover:text-oxblood transition-colors font-bold">Select Mood</span>
            </button>
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-oxblood/40" />
              <div className="flex gap-2">
                <span className="text-[10px] font-sans uppercase tracking-widest px-2 py-0.5 bg-oxblood/10 text-oxblood rounded-sm font-bold">Sonnet</span>
                <span className="text-[10px] font-sans uppercase tracking-widest px-2 py-0.5 border border-ink/10 text-ink/40 rounded-sm cursor-pointer hover:bg-ink/5">+ Add Tag</span>
              </div>
            </div>
            <button 
              onClick={() => setIsCoWriting(!isCoWriting)}
              className={`flex items-center gap-2 px-3 py-1 rounded-sm text-[10px] font-sans uppercase tracking-widest transition-all font-bold ${isCoWriting ? "bg-oxblood text-white" : "border border-ink/10 text-ink/40"}`}
            >
              {isCoWriting ? "Collaboration Active" : "Invite Co-Writer"}
            </button>
          </div>
        </header>

        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Draw a breath and begin..."
          className="w-full h-[500px] bg-transparent border-none p-0 text-xl font-serif italic leading-relaxed resize-none outline-none placeholder:text-ink/5"
        />

        <div className="absolute top-margin-page right-8 flex flex-col gap-4 opacity-20 hover:opacity-100 transition-opacity">
          <button title="Meter Guide"><Sliders className="w-5 h-5 hover:text-oxblood" /></button>
          <button title="Rhyme Assistant"><PenTool className="w-5 h-5 hover:text-oxblood" /></button>
        </div>

        <div className="footer mt-12 flex justify-end gap-4 border-t border-ink/10 pt-8">
          <button className="px-6 py-2 text-[10px] font-sans uppercase tracking-[0.2em] text-ink/40 hover:text-ink font-bold">Save Draft</button>
          <button 
            onClick={handlePublish}
            className="bg-ink text-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-oxblood active:scale-95 transition-all"
          >
            Publish Stanza
          </button>
        </div>
      </div>
    </div>
  );
}
