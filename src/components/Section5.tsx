import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Area } from "recharts";
import { Clock, Activity } from "lucide-react";
import { timelinePoints } from "../data/conflictData";

export default function Section5() {
  return (
    <section id="timeline" className="min-h-screen bg-[#0b0f1a] text-[#f0e6c8] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute bottom-[-10%] left-[30%] w-[700px] h-[700px] bg-amber-800/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        <header className="mb-16 md:mb-20 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 text-amber-300 font-medium tracking-widest text-sm uppercase mb-4">
            <Clock size={16} /> <span>Analysis 05</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Time Periods <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-rose-200">Heavy Purchase Frequency</span>
          </h2>
          <p className="text-lg md:text-xl text-[#a8a39a] max-w-3xl leading-relaxed">
            2023 stands as the peak year ($56.8B across ~28 deals), driven almost entirely by Polands $41.9B rearmament and AUKUS sustainment deals. The 2024 spike is dominated by Israels $20.2B wartime F-15IA notification — a single deal representing 91% of that events value.
          </p>
        </header>

        <div className="bg-[#11162f]/70 border border-[#1e2842]/60 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm mb-10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-[#f0e6c8]">Purchase Intensity Over Time</h3>
            <span className="text-xs text-[#a8a39a] bg-[#1a2238] px-2 py-1 rounded-full">Spline Interpolation</span>
          </div>
          <p className="text-sm text-[#a8a39a] mb-6">Dual-axis spline: Amber line = deal value ($B), Teal line = deal count.</p>

          <div className="h-[440px] md:h-[520px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelinePoints} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                <defs>
                  <linearGradient id="valueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f0a832" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f0a832" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2842" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "#a8a39a", fontSize: 14, fontWeight: 600 }} tickLine={false} axisLine={{ stroke: "#2a3558" }} />
                <YAxis yAxisId="left" tick={{ fill: "#a8a39a", fontSize: 12 }} tickFormatter={(v: number) => `$${v}B`} tickLine={false} axisLine={{ stroke: "#2a3558" }} domain={[0, 70]} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: "#a8a39a", fontSize: 12 }} tickFormatter={(v: number) => `${v}`} tickLine={false} axisLine={{ stroke: "#2a3558" }} domain={[0, 35]} />
                <Tooltip
                  contentStyle={{ background: "#0b0f1a", border: "1px solid #2a3558", borderRadius: 12, color: "#f0e6c8", fontSize: 13 }}
                  formatter={(v: any, name: any) => [v, name]}
                  labelFormatter={(l: any) => {
                    const pt = timelinePoints.find((t: any) => t.label === l);
                    return pt ? `${pt.label} — ${pt.event}` : l;
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ color: "#a8a39a", fontSize: 13 }} />
                <Area yAxisId="left" type="monotone" dataKey="valueB" stroke="#f0a832" strokeWidth={3} fill="url(#valueGrad)" dot={{ r: 5, fill: "#f0a832", stroke: "#0b0f1a", strokeWidth: 2 }} activeDot={{ r: 8 }} name="Deal Value ($B)" />
                <Line yAxisId="right" type="monotone" dataKey="deals" stroke="#2a9d8f" strokeWidth={3} dot={{ r: 5, fill: "#2a9d8f", stroke: "#0b0f1a", strokeWidth: 2 }} activeDot={{ r: 8 }} name="Deal Count" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {timelinePoints.map((pt) => (
            <div key={pt.label} className="relative bg-[#11162f]/60 border border-[#1e2842]/50 rounded-3xl p-7 overflow-hidden group hover:border-amber-500/30 transition-all hover:-translate-y-1">
              <div className="absolute top-0 right-0 text-[120px] font-black text-[#1a2238] leading-none -translate-y-1/4 translate-x-2 select-none">{pt.label}</div>
              <div className="relative z-10">
                <div className="text-xs uppercase tracking-[0.2em] text-amber-300 mb-2 font-medium">Year {pt.label}</div>
                <div className="text-4xl font-black text-[#f0e6c8] mb-1">${pt.valueB.toFixed(2)}B</div>
                <div className="text-sm text-[#a8a39a] mb-4">{pt.deals} deals — <strong className="text-amber-200">{pt.event}</strong></div>
                <div className="flex gap-4 text-sm">
                  <div>
                    <div className="text-[10px] text-[#a8a39a] uppercase tracking-widest">Average / Deal</div>
                    <div className="font-bold text-violet-200">${(pt.valueB / pt.deals).toFixed(2)}B</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#a8a39a] uppercase tracking-widest">Peak Deal</div>
                    <div className="font-bold text-violet-200">{pt.year === 2023 ? "$15.0B IBCS" : pt.year === 2024 ? "$18.82B F-15IA" : "Multiple"}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-amber-950/50 via-rose-950/50 to-amber-950/50 border border-amber-500/20 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-sm flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <div className="w-20 h-20 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0 shadow-[0_0_40px_-10px_rgba(240,168,50,0.25)]">
            <Activity size={36} className="text-amber-300" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-[#f0e6c8] mb-2">Key Temporal Insight: Conflict Drives Procurement Velocity</h3>
            <p className="text-[#c8b896] leading-relaxed">
              The dataset shows a clear correlation between active conflict onset and procurement spike. The February 2022 invasion of Ukraine preceded a ~430% year-over-year increase in Poland's deal volume (2022 to 2023). Similarly, the October 2023 Hamas attack was followed by a concentrated $20.2B notification in August 2024 — 91% of which was a single F-15IA aircraft deal, demonstrating how wartime replenishment creates extreme deal concentration rather than distributed procurement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
