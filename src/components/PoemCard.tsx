import React from "react";
import { Poem } from "../types";
import { Heart, MessageSquare, Bookmark, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PoemCardProps {
  poem: Poem;
  author: any;
  key?: string | number;
}

export function PoemCard({ poem, author }: PoemCardProps) {
  return (
    <article className="group border-b border-ink/5 pb-10 transition-opacity hover:opacity-100 opacity-90">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-4xl font-serif font-light mb-1">{poem.title}</h2>
          <p className="text-[11px] text-ink/50 uppercase tracking-widest">
            {author.name} • {formatDistanceToNow(new Date(poem.publishedAt))} ago
          </p>
        </div>
        <div className="flex gap-2">
          {poem.tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-[9px] border border-ink/10 opacity-50 uppercase tracking-tighter">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <p className="font-serif text-lg leading-relaxed text-ink/80 italic whitespace-pre-wrap">
        {poem.content}
      </p>
      <div className="mt-6 flex items-center gap-6">
        <button className="text-[10px] flex items-center gap-1 uppercase tracking-widest font-bold">
          <span className="text-oxblood">↑</span> {poem.upvotes} Votes
        </button>
        <button className="text-[10px] flex items-center gap-1 uppercase tracking-widest opacity-60">
          💬 12 Feedback
        </button>
        <button className="text-[10px] ml-auto uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-oxblood transition-all">
          Read full text →
        </button>
      </div>
    </article>
  );
}
