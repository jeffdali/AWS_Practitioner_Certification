import React from "react";
import { Link } from "react-router-dom";
import { Library } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-[100] bg-slate-950/95 backdrop-blur-2xl border-b border-emerald-900/50 shadow-2xl shadow-emerald-900/10">
      <div className="container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 no-underline group">
          <div className="bg-emerald-600 p-1.5 rounded-lg shadow-lg shadow-emerald-500/20 group-hover:rotate-6 transition-transform">
            <Library className="text-white" size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-white leading-none">
              CloudPrep <span className="text-emerald-500">Hub</span>
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.1em] text-slate-500">
              Study Repo
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="font-bold text-slate-400 hover:text-emerald-400 transition-colors no-underline text-[10px] uppercase tracking-widest"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
