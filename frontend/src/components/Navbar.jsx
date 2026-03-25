import { Home, Search, Compass, MessageCircle, Heart, PlusSquare } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl bg-dark-base/60 border-b border-white/10 shadow-glass-sm">
      <div className="max-w-[975px] mx-auto px-5 h-[80px] flex items-center justify-between">
        <div className="flex items-center px-10">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
            Magnify
          </h1>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-auto mx-auto">
          <div className="relative w-full group">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-slate-800/50 border border-white/5 rounded-full px-5 py-2.5 pl-11 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>

        
      </div>
    </header>
  );
}
