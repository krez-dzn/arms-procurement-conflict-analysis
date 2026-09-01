import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts";
import { Crosshair, Flame } from "lucide-react";
import { weaponCategories } from "../data/conflictData";

const data = weaponCategories.map((w) => ({
  x: w.deals,
  y: w.valueB,
  z: w.valueB * 4,
  name: w.name,
  value: w.valueB,
  deals: w.deals,
  color: w.color,
  threat: w.threat,
}));

export default function Section4() {
  return (
    <section id="weapon-categories" className="min-h-screen bg-[#0b0f1a] text-[#f0e6c8] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] left-[40%] w-[500px] h-[500px] bg-violet-800/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        <header className="mb-16 md:mb-20 text-center">
          <div className="flex items-center justify-center gap-3 text-violet-300 font-medium tracking-widest text-sm uppercase mb-4">
            <Crosshair size={16} /> <span>Analysis 04</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Weapon Categories <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-violet-100 to-amber-200">Nature of Threats</span>
          </h2>
          <p className="text-lg md:text-xl text-[#a8a39a] max-w-3xl mx-auto leading-relaxed">
            The scatter reveals a clear pattern: high-value, low-deal-count deals cluster around aircraft platforms (F-35, F-16, F-15IA), while high-frequency, lower-unit-value clusters represent sustained munitions and air-defense replenishment — the hallmark of prolonged conflict.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">
          <div className="bg-[#11162f]/70 border border-[#1e2842]/60 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-[#f0e6c8]">Category Scatter</h3>
              <span className="text-xs text-[#a8a39a] bg-[#1a2238] px-2 py-1 rounded-full">Bubble size = Value</span>
            </div>
            <p className="text-sm text-[#a8a39a] mb-6">X-axis: Number of deals (frequency) | Y-axis: Total deal value ($B)</p>

            <div className="h-[460px] md:h-[540px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2842" />
                  <XAxis type="number" dataKey="x" name="Deals" tick={{ fill: "#a8a39a", fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#2a3558" }} label={{ value: "Deal Count (Frequency)", position: "insideBottom", offset: -10, fill: "#a8a39a", fontSize: 13 }} domain={[0, 22]} />
                  <YAxis type="number" dataKey="y" name="Value ($B)" tick={{ fill: "#a8a39a", fontSize: 12 }} tickFormatter={(v: number) => `$${v}B`} tickLine={false} axisLine={{ stroke: "#2a3558" }} label={{ value: "Total Value ($B)", angle: -90, position: "insideLeft", offset: 10, fill: "#a8a39a", fontSize: 13 }} domain={[0, 60]} />
                  <ZAxis type="number" dataKey="z" range={[60, 800]} />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3", stroke: "#f0a832" }}
                    contentStyle={{ background: "#0b0f1a", border: "1px solid #2a3558", borderRadius: 12, color: "#f0e6c8", fontSize: 13 }}
                    formatter={(v: any, n: any) => [v, n]}
                  />
                  <Scatter data={data} fill="#8884d8" shape="circle">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {data.map((d) => (
              <a key={d.name} href="#" className="group bg-[#11162f]/60 border border-[#1e2842]/50 hover:border-violet-500/40 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-15px_rgba(180,150,220,0.15)]">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shrink-0" style={{ background: d.color + "20", border: `1px solid ${d.color}40` }}>
                      <Flame size={18} style={{ color: d.color }} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#f0e6c8] leading-tight group-hover:text-violet-200 transition-colors">{d.name}</h4>
                      <div className="text-[11px] text-[#a8a39a]">Threat: <span className="text-violet-300 font-semibold">{d.threat}</span></div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xl font-black text-violet-200">${d.value.toFixed(1)}B</div>
                    <div className="text-[11px] text-[#a8a39a]">{d.deals} deals</div>
                  </div>
                </div>
                <div className="w-full bg-[#0b0f1a] rounded-full h-1.5 overflow-hidden mt-2">
                  <div className="h-full rounded-full" style={{ width: `${(d.value / 60) * 100}%`, background: d.color }} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
