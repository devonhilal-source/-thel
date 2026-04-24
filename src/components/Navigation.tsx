import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Trophy, PenTool, User as UserIcon, Bell, Menu, MessageSquare } from "lucide-react";
import { useApp } from "../context/AppContext";
import { cn } from "../lib/utils";

export function TopNav() {
  const { currentUser } = useApp();
  return (
    <header className="h-16 border-b border-ink/10 flex items-center justify-between px-8 bg-parchment z-50 sticky top-0 shadow-sm">
      <div className="flex items-center gap-12">
        <Link to="/" className="text-3xl font-serif tracking-tighter italic font-light">Æthel</Link>
        <nav className="hidden md:flex gap-8">
          <Link to="/" className="editorial-nav text-ink border-b border-ink">Discourse</Link>
          <Link to="/profile" className="editorial-nav">Library</Link>
          <Link to="/challenges" className="editorial-nav">Anthology</Link>
          <Link to="/correspondence" className="editorial-nav">Collab</Link>
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <button className="hover:bg-ink/5 p-2 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-oxblood rounded-full"></span>
        </button>
        <Link to="/profile" className="w-8 h-8 rounded-full border border-ink/20 bg-stone flex items-center justify-center overflow-hidden">
          {currentUser?.photoUrl ? (
            <img src={currentUser.photoUrl} alt={currentUser.name} className="w-full h-full object-cover grayscale" />
          ) : (
            <div className="w-4 h-4 bg-oxblood rounded-sm rotate-45"></div>
          )}
        </Link>
      </div>
    </header>
  );
}

export function BottomNav() {
  const location = useLocation();
  
  const navItems = [
    { name: "Discourse", path: "/", icon: BookOpen },
    { name: "Anthology", path: "/challenges", icon: Trophy },
    { name: "Compose", path: "/compose", icon: PenTool },
    { name: "Library", path: "/profile", icon: UserIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-parchment border-t border-ink/10 flex justify-around items-center px-4 md:hidden">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center pt-3 pb-5 transition-all text-ink/40 hover:text-ink",
              isActive && "text-oxblood border-t-2 border-oxblood"
            )}
          >
            <item.icon className={cn("w-5 h-5 mb-1", isActive && "fill-current text-oxblood")} />
            <span className="text-[9px] uppercase tracking-widest font-bold tracking-[0.1em]">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
