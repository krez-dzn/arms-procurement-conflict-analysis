import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area } from "recharts";
import { Shield, ArrowUp } from "lucide-react";
import { buyerTotals } from "../data/conflictData";

const topBuyers = buyerTotals.slice(0, 10);

const chartData = topBuyers.map((b) => ({
  name: b.country.length > 12 ? b.country.replace(" (TECRO)", "").replace(" Rep.", "") : b.country,
  valueB: b.valueB,
  fullName: b.country,
}));

export default function Section2() {
  return (
    <section id="largest-buyers" className="min-h-screen bg-[#0b0f1a] text-[#f0e6c8] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[15%] right-[5%] w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        <header className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-teal-300 font-medium tracking-widest text-sm uppercase mb-4">
              <Shield size={16} /> <span>Analysis 02</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              Largest Buyers <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-teal-100 to-amber-200">Spline Profile</span>
            </h2>
            <p className="text-lg md:text-xl text-[#a8a39a] max-w-2xl leading-relaxed">
              Polands $51.7B dominates, followed by Israels $20.7B and the UAE's $17.3B across Gulf and Abraham Accords packages. The spline reveals a steep concentration at the top — the top 3 buyers account for ~47% of all notified value.
            </p>
          </div>
          <div className="bg-[#11162f]/70 border border-[#1e2842]/60 rounded-2xl p-6 shadow-xl backdrop-blur-sm min-w-[260px]">
            <div className="text-xs uppercase tracking-widest text-[#a8a39a] mb-1">Dataset Dominance</div>
            <div className="text-4xl font-black text-amber-300 mb-1">47%</div>
            <div className="text-sm text-[#a8a39a]">Top 3 buyers of total $189B</div>
            <div className="mt-4 pt-4 border-t border-[#1e2842]/50 flex items-center gap-2 text-xs text-teal-300">
              <ArrowUp size={14} /> Largest single deal: <strong>Poland IBCS $15.0B</strong>
            </div>
          </div>
        </header>

        <div className="bg-[#11162f]/70 border border-[#1e2842]/60 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-[#f0e6c8]">Deal Value by Buyer — Spline Curve</h3>
            <span className="text-xs text-[#a8a39a] bg-[#1a2238] px-2 py-1 rounded-full">Top 10 Recipients</span>
          </div>
          <p className="text-sm text-[#a8a39a] mb-8">Smooth interpolation highlights the rapid drop-off from Poland's peak to the distributed secondary tier.</p>

          <div className="h-[420px] md:h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                <defs>
                  <linearGradient id="splineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f0a832" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#f0a832" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2842" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#a8a39a", fontSize: 11 }} tickLine={false} axisLine={{ stroke: "#2a3558" }} interval={0} angle={-25} textAnchor="end" height={60} />
                <YAxis tick={{ fill: "#a8a39a", fontSize: 12 }} tickFormatter={(v: number) => `$${v}B`} tickLine={false} axisLine={{ stroke: "#2a3558" }} domain={[0, 60]} />
                <Tooltip
                  contentStyle={{ background: "#0b0f1a", border: "1px solid #2a3558", borderRadius: 12, color: "#f0e6c8", fontSize: 13 }}
                  formatter={(v: any) => [`$${Number(v).toFixed(2)}B`, "Total Value"]}
                  labelFormatter={(l: any) => {
                    const d = chartData.find((c) => c.name === l);
                    return d ? d.fullName : l;
                  }}
                />
                <Area type="monotone" dataKey="valueB" stroke="none" fill="url(#splineGrad)" />
                <Line type="monotone" dataKey="valueB" stroke="#f0a832" strokeWidth={4} dot={{ r: 6, fill: "#0b0f1a", stroke: "#f0a832", strokeWidth: 3 }} activeDot={{ r: 8, fill: "#f0a832", stroke: "#0b0f1a", strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3">
            {chartData.slice(0, 5).map((d, i) => (
              <div key={d.name} className="bg-[#0b0f1a] border border-[#1e2842]/40 rounded-xl p-4 text-center hover:border-amber-500/30 transition-colors">
                <div className="text-xs text-[#a8a39a] uppercase tracking-widest mb-1">{d.name}</div>
                <div className="text-2xl font-black text-amber-200">${d.valueB.toFixed(2)}B</div>
                <div className="text-[10px] text-[#a8a39a] mt-1">Rank #{i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
