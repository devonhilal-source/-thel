import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { TopNav, BottomNav } from "./components/Navigation";
import Feed from "./pages/Feed";
import Compose from "./pages/Compose";
import Challenges from "./pages/Challenges";
import Profile from "./pages/Profile";
import Correspondence from "./pages/Correspondence";
import ChatDetail from "./pages/ChatDetail";

import { AuthGuard } from "./components/AuthGuard";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="h-screen flex flex-col overflow-hidden">
          <TopNav />
          <main className="flex-grow overflow-hidden flex flex-col relative pb-20 md:pb-0">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/compose" element={<AuthGuard><Compose /></AuthGuard>} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
              <Route path="/correspondence" element={<AuthGuard><Correspondence /></AuthGuard>} />
              <Route path="/chat/:id" element={<AuthGuard><ChatDetail /></AuthGuard>} />
            </Routes>
          </main>
          <BottomNav />
          <footer className="hidden md:flex h-10 border-t border-ink/10 bg-ink text-white/40 items-center px-6 justify-between text-[9px] uppercase tracking-[0.2em] z-50">
            <div className="flex gap-6">
              <span>Connected: node_primary_01</span>
              <span>Buffer: 14KB</span>
            </div>
            <div className="flex gap-6">
              <span className="text-white">48 Poets Online</span>
              <span>Current Revision: v2.4.0</span>
            </div>
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
}
