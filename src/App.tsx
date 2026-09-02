import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Shield, Crosshair, Map, BarChart3, Clock } from "lucide-react";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import Section5 from "./components/Section5";

const navLinks = [
  { id: "largest-events", label: "Largest Events", icon: BarChart3 },
  { id: "largest-buyers", label: "Largest Buyers", icon: Shield },
  { id: "conflict-map", label: "Conflict Map", icon: Map },
  { id: "weapon-categories", label: "Categories", icon: Crosshair },
  { id: "timeline", label: "Time Periods", icon: Clock },
];

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-ink text-parchment font-sans selection:bg-amber-400/20">
      {/* Fixed nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled ? "bg-ink/85 backdrop-blur-xl border-white/5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)]" : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <a href="#" className="flex items-center group">
            <div className="leading-none">
              <div className="text-sm md:text-base font-black tracking-tight">CONFLICT</div>
              <div className="text-[9px] md:text-[10px] font-mono font-bold text-amber-300 tracking-[0.2em]">ANALYSIS</div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-[#b0a898] hover:text-parchment hover:bg-white/[0.06] transition-colors"
              >
                <link.icon size={14} /> {link.label}
              </a>
            ))}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-parchment hover:text-amber-300" aria-label="Menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 border-t border-white/5 ${mobileOpen ? "max-h-[320px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-6 py-4 space-y-1 bg-ink/95 backdrop-blur-xl">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-[#b0a898] hover:text-parchment hover:bg-white/[0.06] transition-colors">
                <link.icon size={18} className="text-amber-300" /> {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header ref={heroRef} className="relative min-h-[92vh] flex flex-col items-center justify-center px-6 pt-24 overflow-hidden bg-ink">
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-[10%] left-[15%] w-[600px] h-[600px] bg-amber-700/15 rounded-full blur-[160px] transition-transform duration-200 ease-out"
            style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
          />
          <div 
            className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] bg-rose-700/15 rounded-full blur-[140px] transition-transform duration-200 ease-out"
            style={{ transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)` }}
          />
          <div 
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-800/10 rounded-full blur-[200px] transition-transform duration-300 ease-out"
            style={{ transform: `translate(calc(-50% + ${mousePos.x * 15}px), calc(-50% + ${mousePos.y * 15}px))` }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] backdrop-blur-md rounded-full px-4 py-1.5 text-xs md:text-sm font-mono tracking-widest text-amber-300 mb-8 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            436 ROWS • 9 CONFLICTS • $189.1B NOTIFIED
          </div>

          <h1 className="font-display text-6xl sm:text-7xl md:text-9xl leading-[0.92] tracking-[-0.04em] mb-8 animate-fade-in-up">
            <span className="text-parchment inline-block hover:text-amber-100 transition-colors duration-500">Conflict</span>
            <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-rose-200 animate-gradient-shift">Analytics</span>
          </h1>

          <p className="text-lg md:text-2xl text-[#a8a39a] max-w-3xl mx-auto leading-relaxed mb-12 font-light animate-fade-in-up animation-delay-200">
            A data-driven breakdown of how geopolitical threats drive U.S. defense procurement — from Gulf missile defense to Poland's unprecedented $51.7B eastern-flank build-up.
          </p>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 animate-fade-in-up animation-delay-400">
            {navLinks.map((link, idx) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="group flex items-center gap-2 bg-[#11162f]/80 border border-[#1e2842]/60 hover:border-amber-400/40 rounded-full px-5 py-2.5 text-sm font-semibold text-parchment hover:text-amber-200 transition-all hover:-translate-y-0.5 shadow-lg shadow-black/10 animate-fade-in-up"
                style={{ animationDelay: `${400 + idx * 80}ms` }}
              >
                <link.icon size={16} className="text-amber-300 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-16 md:mt-24 animate-bounce">
            <a href="#largest-events" className="inline-flex items-center gap-2 text-[#a8a39a] hover:text-amber-300 transition-colors text-sm font-medium tracking-wide">
              Begin Analysis <ChevronDown size={18} />
            </a>
          </div>
        </div>
      </header>

      <main>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
      </main>

      <footer className="relative bg-[#060a12] border-t border-[#1e2842]/60">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-900/20">
                  <Shield size={22} className="text-ink" strokeWidth={2.5} />
                </div>
                <div className="leading-none">
                  <div className="text-xl font-black tracking-tight">CONFLICT</div>
                  <div className="text-[10px] font-mono font-bold text-amber-300 tracking-[0.2em]">ANALYSIS</div>
                </div>
              </div>
              <p className="text-sm text-[#a8a39a] max-w-md leading-relaxed">
                Derived from 436-row U.S. arms-transfer dataset across 9 major geopolitical events (2019–2024). All values represent notified deal sizes, not necessarily delivered.
              </p>
            </div>
            <div className="flex gap-6 text-sm text-[#a8a39a]">
              <div>
                <div className="text-xs uppercase tracking-widest text-amber-300 mb-1 font-semibold">Dataset</div>
                <div>436 notifications</div>
                <div>9 events analyzed</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-rose-300 mb-1 font-semibold">Total Value</div>
                <div>$189.1B USD</div>
                <div>77 total deals</div>
              </div>
            </div>
          </div>
          <div className="border-t border-[#1e2842]/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#6b6780] font-mono">
            <span>Data source: U.S. Defense Security Cooperation Agency notifications (DSCA).</span>
            <span>Built for strategic analysis and presentation.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
