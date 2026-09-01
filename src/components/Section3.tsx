import { useMemo, useState } from "react";
import { CircleMarker, MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Crosshair, MapPin } from "lucide-react";

type LatLng = [number, number];

type Connection = {
  threat: string;
  buyer: string;
  from: LatLng;
  to: LatLng;
  value: string;
  zone: "Europe" | "Middle East" | "Indo-Pacific";
};

const connections: Connection[] = [
  { threat: "Iran", buyer: "UAE", from: [32.4, 53.7], to: [23.4, 53.8], value: "$3.91B", zone: "Middle East" },
  { threat: "Iran", buyer: "Bahrain", from: [32.4, 53.7], to: [26.1, 50.6], value: "$3.23B", zone: "Middle East" },
  { threat: "Iran", buyer: "Qatar", from: [32.4, 53.7], to: [25.3, 51.2], value: "$3.00B", zone: "Middle East" },
  { threat: "Iran", buyer: "Saudi Arabia", from: [32.4, 53.7], to: [24.7, 46.7], value: "$2.74B", zone: "Middle East" },
  { threat: "Iran", buyer: "Israel", from: [32.4, 53.7], to: [31.8, 35.2], value: "$20.66B", zone: "Middle East" },
  { threat: "Russia", buyer: "Poland", from: [55.8, 37.6], to: [52.1, 19.4], value: "$51.67B", zone: "Europe" },
  { threat: "Russia", buyer: "Germany", from: [55.8, 37.6], to: [51.2, 10.4], value: "$9.97B", zone: "Europe" },
  { threat: "Russia", buyer: "Finland", from: [59.9, 30.3], to: [61.9, 25.7], value: "$14.79B", zone: "Europe" },
  { threat: "Russia", buyer: "Romania", from: [55.8, 37.6], to: [45.9, 24.9], value: "$8.13B", zone: "Europe" },
  { threat: "Russia", buyer: "Sweden", from: [59.9, 30.3], to: [60.1, 18.6], value: "$0.93B", zone: "Europe" },
  { threat: "China", buyer: "Taiwan", from: [35.9, 104.2], to: [23.7, 121.0], value: "$10.22B", zone: "Indo-Pacific" },
  { threat: "China", buyer: "Japan", from: [35.9, 104.2], to: [36.2, 138.3], value: "$4.19B", zone: "Indo-Pacific" },
  { threat: "China", buyer: "Australia", from: [35.9, 104.2], to: [-25.3, 133.8], value: "$21.20B", zone: "Indo-Pacific" },
];

const focusZones = {
  All: { center: [31, 62] as LatLng, zoom: 2 },
  Europe: { center: [54, 24] as LatLng, zoom: 4 },
  "Middle East": { center: [28, 48] as LatLng, zoom: 5 },
  "Indo-Pacific": { center: [13, 116] as LatLng, zoom: 3 },
};

function midpoint(a: LatLng, b: LatLng): LatLng {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

function valueLabel(value: string, isActive: boolean) {
  return L.divIcon({
    className: "conflict-value-label",
    html: `<span class="${isActive ? "active" : ""}">${value}</span>`,
    iconSize: [70, 22],
    iconAnchor: [35, 11],
  });
}

function pointLabel(label: string, kind: "buyer" | "threat") {
  return L.divIcon({
    className: `conflict-point-label ${kind}`,
    html: `<span>${label}</span>`,
    iconSize: [110, 22],
    iconAnchor: [55, -8],
  });
}

function ZoneControls({ activeZone, setActiveZone }: { activeZone: keyof typeof focusZones; setActiveZone: (zone: keyof typeof focusZones) => void }) {
  const map = useMap();

  return (
    <div className="absolute top-12 left-3 z-[500] flex flex-wrap gap-2 max-w-[calc(100%-1.5rem)]">
      {(Object.keys(focusZones) as Array<keyof typeof focusZones>).map((zone) => (
        <button
          key={zone}
          type="button"
          onClick={() => {
            setActiveZone(zone);
            map.flyTo(focusZones[zone].center, focusZones[zone].zoom, { duration: 0.9 });
          }}
          className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md transition-all ${
            activeZone === zone
              ? "border-amber-300/70 bg-amber-400/20 text-amber-100 shadow-[0_0_24px_-8px_rgba(240,168,50,0.8)]"
              : "border-white/10 bg-black/35 text-[#d4c8a8] hover:border-amber-300/40 hover:text-amber-100"
          }`}
        >
          {zone}
        </button>
      ))}
    </div>
  );
}

export default function Section3() {
  const [hoverConn, setHoverConn] = useState<number | null>(null);
  const [activeZone, setActiveZone] = useState<keyof typeof focusZones>("All");

  const threatNodes = useMemo(() => {
    const map = new Map<string, LatLng>();
    connections.forEach((c) => {
      if (!map.has(c.threat)) map.set(c.threat, c.from);
    });
    return Array.from(map.entries()).map(([label, position]) => ({ label, position }));
  }, []);

  const buyerNodes = useMemo(() => {
    const map = new Map<string, LatLng>();
    connections.forEach((c) => {
      if (!map.has(c.buyer)) map.set(c.buyer, c.to);
    });
    return Array.from(map.entries()).map(([label, position]) => ({ label, position }));
  }, []);

  return (
    <section id="conflict-map" className="min-h-screen bg-[#0b0f1a] text-[#f0e6c8] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[5%] left-[15%] w-[700px] h-[700px] bg-rose-800/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[5%] right-[15%] w-[600px] h-[600px] bg-cyan-800/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        <header className="mb-14 md:mb-16 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 text-rose-300 font-medium tracking-widest text-sm uppercase mb-4">
            <Crosshair size={16} /> <span>Analysis 03</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Conflict Map <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-rose-100 to-amber-200">Cause & Effect</span>
          </h2>
          <p className="text-lg md:text-xl text-[#a8a39a] max-w-3xl mx-auto md:mx-0 leading-relaxed">
            Red lines show threat-to-buyer dynamics on a real satellite basemap. Each line points from the adversary toward the buyer, revealing the geographic cause-and-effect behind the procurement spike.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
          <div className="relative bg-[#0f1322] border border-[#1e2842]/60 rounded-3xl overflow-hidden shadow-2xl min-h-[560px]">
            <div className="absolute top-3 left-3 z-[500] flex gap-2 pointer-events-none">
              <span className="text-[10px] uppercase tracking-widest bg-rose-900/80 text-rose-100 px-2 py-0.5 rounded-md border border-rose-800/50">Threat to Buyer</span>
              <span className="text-[10px] uppercase tracking-widest bg-black/50 text-amber-100 px-2 py-0.5 rounded-md border border-amber-800/40">Satellite Basemap</span>
            </div>

            <MapContainer
              center={focusZones.All.center}
              zoom={focusZones.All.zoom}
              minZoom={2}
              maxZoom={6}
              scrollWheelZoom={false}
              attributionControl={false}
              className="h-[560px] w-full"
            >
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution="Tiles &copy; Esri" />
              <TileLayer url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}" opacity={0.78} />
              <ZoneControls activeZone={activeZone} setActiveZone={setActiveZone} />

              {connections.map((c, i) => {
                const isActive = hoverConn === i;
                const muted = hoverConn !== null && !isActive;

                return (
                  <Polyline
                    key={`${c.threat}-${c.buyer}`}
                    positions={[c.from, c.to]}
                    pathOptions={{ color: "#e63946", weight: isActive ? 4.5 : 2.5, opacity: muted ? 0.2 : 0.9, dashArray: isActive ? undefined : "7 8" }}
                    eventHandlers={{ mouseover: () => setHoverConn(i), mouseout: () => setHoverConn(null) }}
                  >
                    <Tooltip sticky direction="top" className="conflict-map-tooltip">
                      <strong>{c.threat}</strong> to <strong>{c.buyer}</strong><br />
                      Procurement signal: {c.value}
                    </Tooltip>
                  </Polyline>
                );
              })}

              {connections.map((c, i) => {
                const isActive = hoverConn === i;

                return isActive ? <Marker key={`value-${i}`} position={midpoint(c.from, c.to)} icon={valueLabel(c.value, true)} interactive={false} /> : null;
              })}

              {threatNodes.map((n) => (
                <div key={n.label}>
                  <CircleMarker center={n.position} radius={10} pathOptions={{ color: "#f0a832", fillColor: "#c7253d", fillOpacity: 0.95, weight: 2 }}>
                    <Tooltip direction="top" className="conflict-map-tooltip">{n.label} threat origin</Tooltip>
                  </CircleMarker>
                  <Marker position={n.position} icon={pointLabel(`${n.label} threat`, "threat")} interactive={false} />
                </div>
              ))}

              {buyerNodes.map((n) => (
                <div key={n.label}>
                  <CircleMarker center={n.position} radius={8} pathOptions={{ color: "#0b0f1a", fillColor: "#f0a832", fillOpacity: 0.95, weight: 2 }}>
                    <Tooltip direction="top" className="conflict-map-tooltip" sticky>{n.label} buyer node</Tooltip>
                  </CircleMarker>
                </div>
              ))}
            </MapContainer>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-[#11162f]/70 border border-[#1e2842]/60 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
              <h3 className="text-xl font-bold text-[#f0e6c8] mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-rose-300" /> Threat-to-Buyer Lines
              </h3>
              <p className="text-sm text-[#a8a39a] mb-5 leading-relaxed">
                Use the zone controls on the satellite map to zoom into Europe, the Middle East, or the Indo-Pacific. Hover a red line or list item to isolate one threat vector.
              </p>

              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2 custom-scroll">
                {connections.map((c, i) => (
                  <button
                    key={i}
                    onMouseEnter={() => setHoverConn(i)}
                    onMouseLeave={() => setHoverConn(null)}
                    className={`w-full text-left rounded-xl px-4 py-3 border transition-all flex items-center gap-3 ${
                      hoverConn === i ? "bg-rose-950/50 border-rose-500/50 shadow-[0_0_20px_-5px_rgba(230,57,70,0.3)]" : "bg-[#0b0f1a]/60 border-[#1e2842]/50 hover:border-rose-500/30"
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_2px_rgba(230,57,70,0.6)] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-[#f0e6c8] truncate">{c.threat} <span className="text-rose-300">to</span> {c.buyer}</span>
                        <span className="text-sm font-black text-amber-300 shrink-0">{c.value}</span>
                      </div>
                      <div className="text-[10px] text-[#a8a39a] mt-0.5">{c.zone} security vector</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900/30 to-rose-900/30 border border-amber-500/20 rounded-3xl p-6 shadow-xl">
              <h4 className="text-sm font-bold text-amber-200 uppercase tracking-widest mb-3">Why U.S. Alliance</h4>
              <ul className="space-y-3 text-sm text-[#d4c8a8] leading-relaxed">
                <li className="flex gap-3"><span className="text-amber-400 font-black text-lg leading-none">•</span> Russian arms carry direct sanctions risk and alienate NATO partners.</li>
                <li className="flex gap-3"><span className="text-amber-400 font-black text-lg leading-none">•</span> French alternatives lack fifth-generation stealth and regional defense architecture scale.</li>
                <li className="flex gap-3"><span className="text-amber-400 font-black text-lg leading-none">•</span> The F-35 is exclusively American and was used as direct diplomatic leverage in the Abraham Accords.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}