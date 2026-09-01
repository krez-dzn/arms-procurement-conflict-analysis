export interface EventData {
  id: number;
  title: string;
  subtitle: string;
  period: string;
  valueB: number; // billions
  deals: number;
  buyers: { country: string; valueB: number }[];
  threat: string;
  threatType: string; // Russia, China, Iran, Multi
  description: string;
}

export const events: EventData[] = [
  {
    id: 1,
    title: "Gulf Arms Surge",
    subtitle: "May 2019 — Peak Middle East Tensions",
    period: "May 2019",
    valueB: 13.88,
    deals: 13,
    buyers: [
      { country: "UAE", valueB: 3.91 },
      { country: "Bahrain", valueB: 3.23 },
      { country: "Qatar", valueB: 3.00 },
      { country: "Saudi Arabia", valueB: 2.74 },
      { country: "Czech Rep.", valueB: 1.00 },
    ],
    threat: "Iran",
    threatType: "Iran",
    description: "Gulf nations urgently reinforced air and missile defense architectures facing constant threat of missile strikes.",
  },
  {
    id: 2,
    title: "Taiwan Arms Package",
    subtitle: "Jul–Aug 2019 — Cross-Strait Escalation",
    period: "Jul–Aug 2019",
    valueB: 10.22,
    deals: 3,
    buyers: [{ country: "Taiwan (TECRO)", valueB: 10.22 }],
    threat: "Mainland China",
    threatType: "China",
    description: "Asymmetric defense build-up: F-16C/D Block 70, M1A2T Abrams, and Stinger missiles to raise invasion cost.",
  },
  {
    id: 3,
    title: "Abraham Accords",
    subtitle: "Nov 2020 — Diplomatic Realignment",
    period: "Nov 2020",
    valueB: 13.37,
    deals: 2,
    buyers: [
      { country: "UAE (F-35)", valueB: 10.40 },
      { country: "UAE (MQ-9B)", valueB: 2.97 },
    ],
    threat: "Iran / Shared Rival",
    threatType: "Iran",
    description: "U.S. leveraged F-35 sale as diplomatic currency to broker normalization between UAE and Israel.",
  },
  {
    id: 4,
    title: "AUKUS Alliance Buildup",
    subtitle: "2022–2023 — Indo-Pacific Naval Expansion",
    period: "2022–2023",
    valueB: 21.20,
    deals: 19,
    buyers: [{ country: "Australia", valueB: 21.2 }],
    threat: "China",
    threatType: "China",
    description: "Australia pivoted from French conventional submarines to U.S./UK nuclear-powered subs and long-range strike.",
  },
  {
    id: 5,
    title: "Finland F-35 Acquisition",
    subtitle: "Oct 2020 + 2022–2024 — Border Deterrence",
    period: "2020 / 2022–2024",
    valueB: 14.79,
    deals: 8,
    buyers: [
      { country: "Finland (F-35)", valueB: 12.50 },
      { country: "Finland (Munitions)", valueB: 2.29 },
    ],
    threat: "Russia",
    threatType: "Russia",
    description: "Shared 830-mile border with Russia; F-35 selected over European alternatives for stealth and NATO interoperability.",
  },
  {
    id: 6,
    title: "Germany Rearmament",
    subtitle: "2022–2024 — Post-Invasion Reversal",
    period: "2022–2024",
    valueB: 9.97,
    deals: 4,
    buyers: [{ country: "Germany", valueB: 9.97 }],
    threat: "Russia",
    threatType: "Russia",
    description: "Historic reversal of post-Cold War caution: Patriot, P-8A, AMRAAM for NATO air defense and anti-submarine roles.",
  },
  {
    id: 7,
    title: "Ukraine Invasion / Eastern Flank",
    subtitle: "2022–2023 — Poland's Unprecedented Build-up",
    period: "2022–2023",
    valueB: 51.67,
    deals: 10,
    buyers: [{ country: "Poland", valueB: 51.67 }],
    threat: "Russia",
    threatType: "Russia",
    description: "Frontline NATO state facing Kaliningrad and Ukraine warzone; $15B IBCS is largest single notification in dataset.",
  },
  {
    id: 8,
    title: "Indo-Pacific & NATO Expansion",
    subtitle: "2023–2024 — Great-Power Competition",
    period: "2023–2024",
    valueB: 13.26,
    deals: 11,
    buyers: [
      { country: "Romania (F-35)", valueB: 7.20 },
      { country: "Japan", valueB: 4.19 },
      { country: "Sweden", valueB: 0.93 },
    ],
    threat: "China / Russia",
    threatType: "Multi",
    description: "Networked deterrent: F-35, Tomahawk, E-2D to build seamless data-sharing across Indo-Pacific and European theaters.",
  },
  {
    id: 9,
    title: "Israel Arms Transfers",
    subtitle: "Dec 2023–Sep 2024 — Multi-Front War",
    period: "Dec 2023–Sep 2024",
    valueB: 20.66,
    deals: 7,
    buyers: [{ country: "Israel", valueB: 20.66 }],
    threat: "Hamas / Hezbollah / Proxies",
    threatType: "Multi",
    description: "Wartime replenishment: 91% of package in single Aug 2024 F-15IA deal ($18.82B) for sustained campaign readiness.",
  },
];

export const totalDatasetValue = events.reduce((s, e) => s + e.valueB, 0); // ~189.12B
export const totalDeals = events.reduce((s, e) => s + e.deals, 0); // 77

export const buyerTotals = (() => {
  const map = new Map<string, number>();
  events.forEach((e) => e.buyers.forEach((b) => map.set(b.country, (map.get(b.country) || 0) + b.valueB)));
  return Array.from(map.entries())
    .map(([country, valueB]) => ({ country, valueB }))
    .sort((a, b) => b.valueB - a.valueB);
})();

export const weaponCategories = [
  { name: "Fighter / Strike Aircraft", valueB: 52.4, deals: 14, threat: "Multi", color: "#f0a832", x: 14, y: 52.4, r: 48 },
  { name: "Air & Missile Defense", valueB: 28.1, deals: 10, threat: "Multi", color: "#c7253d", x: 10, y: 28.1, r: 32 },
  { name: "Strike Missiles / Munitions", valueB: 21.5, deals: 18, threat: "Multi", color: "#e63946", x: 18, y: 21.5, r: 28 },
  { name: "Tanks / Ground Armor", valueB: 2.2, deals: 3, threat: "China", color: "#f4d35e", x: 3, y: 2.2, r: 14 },
  { name: "Helicopters / Rotary", valueB: 5.8, deals: 2, threat: "China", color: "#2a9d8f", x: 2, y: 5.8, r: 20 },
  { name: "UAV / RPAS / Drones", valueB: 6.3, deals: 4, threat: "Iran", color: "#e76f51", x: 4, y: 6.3, r: 18 },
  { name: "P-8A / Submarine / Naval", valueB: 3.1, deals: 3, threat: "Russia", color: "#457b9d", x: 3, y: 3.1, r: 15 },
  { name: "Training / Sustainment", valueB: 2.7, deals: 4, threat: "Multi", color: "#8e7cc3", x: 4, y: 2.7, r: 14 },
];

export const timelinePoints = [
  { label: "2019", year: 2019, valueB: 24.10, deals: 16, event: "Gulf + Taiwan" },
  { label: "2020", year: 2020, valueB: 25.87, deals: 3, event: "Finland + Abraham" },
  { label: "2022", year: 2022, valueB: 34.31, deals: 22, event: "AUKUS + Poland + Finland/DE" },
  { label: "2023", year: 2023, valueB: 56.81, deals: 28, event: "Poland $41.9B + AUKUS + Indo-Pac" },
  { label: "2024", year: 2024, valueB: 35.68, deals: 12, event: "Israel $20.2B + DE + Indo-Pac" },
];
