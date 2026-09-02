import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts";
import { TrendingUp, Zap } from "lucide-react";
import { events } from "../data/conflictData";

const topEvents = [...events].sort((a, b) => b.valueB - a.valueB).slice(0, 8);

export default function Section1() {
  return (
    <section id="largest-events" className="min-h-screen bg-[#0b0f1a] text-[#f0e6c8] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-rose-700/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        <header className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 text-amber-400 font-medium tracking-widest text-sm uppercase mb-4">
            <Zap size={16} /> <span>Analysis 01</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Largest Events <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-rose-200">by Value</span>
          </h2>
          <p className="text-lg md:text-xl text-[#a8a39a] max-w-3xl leading-relaxed">
            Nine geopolitical flashpoints triggered $189B in U.S. arms notifications. The densest single window was Poland's 430% year-over-year rearmament after February 2022, with the $15B IBCS deal standing as the single largest notification in the entire dataset.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start">
          {/* Chart */}
          <div className="bg-[#11162f]/70 border border-[#1e2842]/60 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-[#f0e6c8]">Event Value ($B) — Top 8</h3>
              <div className="flex items-center gap-2 text-xs text-[#a8a39a] bg-[#1a2238] px-3 py-1 rounded-full">
                <TrendingUp size={12} /> Sorted by deal size
              </div>
            </div>
            <div className="h-[440px] md:h-[520px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topEvents} layout="vertical" barSize={28} margin={{ top: 8, right: 24, left: 60, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2842" horizontal={false} />
                  <XAxis type="number" domain={[0, 60]} tick={{ fill: "#a8a39a", fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#2a3558" }} />
                  <YAxis type="category" dataKey="title" tick={{ fill: "#e8dcc8", fontSize: 13, fontWeight: 600 }} tickLine={false} axisLine={false} width={130} />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                    contentStyle={{ background: "#0b0f1a", border: "1px solid #2a3558", borderRadius: 12, color: "#f0e6c8", fontSize: 13 }}
                    formatter={(v: any) => [`$${Number(v).toFixed(2)}B`, "Value"]}
                    labelFormatter={(l: any) => {
                      const ev = topEvents.find((e) => e.title === l);
                      return ev ? `${ev.title} (${ev.period})` : l;
                    }}
                  />
                  <Bar dataKey="valueB" radius={[0, 8, 8, 0]}>
                    {topEvents.map((_, i) => (
                      <Cell key={i} fill={i < 3 ? "#f0a832" : i < 6 ? "#e63946" : "#457b9d"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats column */}
          <div className="flex flex-col gap-5">
            {topEvents.slice(0, 5).map((ev) => (
              <div
                key={ev.id}
                className="group relative bg-[#11162f]/60 border border-[#1e2842]/50 hover:border-amber-500/40 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(240,168,50,0.1)]"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-[#f0e6c8] leading-tight">{ev.title}</h4>
                    <span className="text-xs font-medium text-amber-300">{ev.period}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-black text-amber-300">${ev.valueB.toFixed(2)}B</div>
                    <div className="text-xs text-[#a8a39a]">{ev.deals} deals</div>
                  </div>
                </div>
                <p className="text-sm text-[#a8a39a] leading-relaxed">{ev.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ev.buyers.map((b) => (
                    <span key={b.country} className="text-[10px] uppercase tracking-widest bg-[#0b0f1a] border border-[#2a3558] text-[#c8b896] px-2 py-0.5 rounded-md font-semibold">
                      {b.country} ${b.valueB.toFixed(2)}B
                    </span>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-[#1e2842]/40 flex items-center gap-2 text-xs text-rose-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  Threat: <strong>{ev.threat}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
