"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [demoMode, setDemoMode] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8000/briefing");
      setData(res.data);
      setLastUpdated(new Date().toLocaleTimeString());
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data)
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white text-xl animate-pulse">
        Booting PulseIQ Core…
      </div>
    );

  const sections = parseBriefing(data.executive_briefing || "");

  return (
    <main className="relative min-h-screen bg-black text-white px-12 py-10 space-y-10 overflow-hidden">

      {/* subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <header className="relative flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-bold tracking-wide">
            PULSE<span className="text-red-500">IQ</span>
          </h1>
          <p className="text-gray-400 mt-2">Autonomous Platform Reasoning Engine</p>
        </div>

        <div className="flex gap-4 items-center">
          <label className="text-sm text-gray-400">
            Demo Mode
            <input
              type="checkbox"
              checked={demoMode}
              onChange={() => setDemoMode(!demoMode)}
              className="ml-2"
            />
          </label>

          <button className="animate-pulse bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 rounded-xl font-semibold shadow-[0_0_25px_rgba(255,0,0,.6)]">
            ANALYZE BUSINESS HEALTH
          </button>
        </div>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-6 relative">
        <Metric title="Client LTV" value={data.metrics?.ltv} />
        <Metric title="Low Quality Partner Ratio" value={data.metrics?.low_quality_ratio} />
      </div>

      {/* Intelligence */}
      <div className="grid grid-cols-3 gap-6 relative">
        <Panel title="Insights" items={sections.insights} />
        <Panel title="Risks" items={sections.risks} danger />
        <Panel title="Opportunities" items={sections.opportunities} good />
      </div>

      <Card title="Detected Root Cause">
        {data.root_causes?.map((c, i) => (
          <p key={i} className="text-red-400">• {c}</p>
        ))}
      </Card>

      <Card title="Executive Reasoning Core">
        <pre className="whitespace-pre-wrap text-sm text-gray-300">
          {data.executive_briefing}
        </pre>
      </Card>

      <p className="text-xs text-gray-500">Last updated: {lastUpdated}</p>
    </main>
  );
}

function parseBriefing(text) {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

  const insights = [];
  const risks = [];
  const opportunities = [];

  let current = null;

  lines.forEach(line => {
    if (line.toLowerCase().includes("insight")) current = "insights";
    else if (line.toLowerCase().includes("risk")) current = "risks";
    else if (line.toLowerCase().includes("opportunity")) current = "opportunities";
    else if (current) {
      if (current === "insights") insights.push(line.replace("-", ""));
      if (current === "risks") risks.push(line.replace("-", ""));
      if (current === "opportunities") opportunities.push(line.replace("-", ""));
    }
  });

  return { insights, risks, opportunities };
}

function Metric({ title, value }) {
  return (
    <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
      <p className="text-xs uppercase text-gray-400">{title}</p>
      <div className="flex items-center gap-2 mt-2">
        <p className="text-3xl font-semibold">{value}</p>
        <span className="text-green-400">↓</span>
      </div>
    </div>
  );
}

function Panel({ title, items, danger, good }) {
  return (
    <div className={`bg-white/5 backdrop-blur rounded-2xl p-6 border ${danger ? "border-red-500/40" : good ? "border-green-500/40" : "border-white/10"}`}>
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {items?.length ? (
        <ul className="space-y-2 text-sm text-gray-300">
          {items.map((i, idx) => (
            <li key={idx}>▸ {i}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Scanning signals…</p>
      )}
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
