## 🚀 PulseIQ — Real-Time Enterprise Intelligence Agent

PulseIQ is a real-time enterprise intelligence agent that acts like an **AI Chief of Staff**.  
Instead of dashboards or chat-over-data, PulseIQ continuously monitors business activity, detects meaningful changes, explains *why* they happened across domains, and generates executive-ready briefings with insights, risks, and opportunities.

---

## 🧠 What It Does

PulseIQ:

- Ingests real-time business events (synthetic for hackathon)
- Computes live KPIs (LTV, partner quality, acquisition health)
- Builds a business knowledge graph for cross-domain reasoning
- Detects performance degradation automatically
- Explains root causes (e.g., partner mix → LTV drop)
- Produces executive summaries:
  - 3 Insights  
  - 2 Risks  
  - 1 Opportunity  
- Displays everything in a live executive dashboard

Think: **autonomous business intelligence**, not dashboards.

---

## 🏗 High-Level Architecture

Events → Metrics Engine → Knowledge Graph → Reasoning Agent → Executive UI


### Backend
- FastAPI (Python)
- Real-time synthetic data simulator
- Metrics engine (LTV, partner quality)
- NetworkX knowledge graph
- Root-cause reasoning agent
- Executive briefing generator (local demo LLM)

### Frontend
- Next.js (App Router)
- Tailwind CSS
- Live KPI cards
- Insights / Risks / Opportunities panels
- Root cause timeline
- Executive summary view

---

## ✨ Key Features

- Real-time metric monitoring
- Cross-domain causal reasoning
- Executive-level summaries (not raw analytics)
- Dark AI-themed dashboard
- Deterministic demo mode (hackathon-safe)
- No external APIs required for demo

---

## 📂 Project Structure

pulseiq/
├── backend/
│ ├── app/
│ │ ├── main.py # FastAPI entry
│ │ ├── simulator.py # Real-time event generator
│ │ ├── metrics.py # KPI calculations
│ │ ├── graph.py # Knowledge graph
│ │ └── agent.py # Reasoning + executive briefing
│ └── requirements.txt
│
└── frontend/
└── src/app/page.js # Executive dashboard


---

## ▶ Run Locally

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload

http://localhost:8000
cd frontend
npm install
npm run dev

http://localhost:3000


---
##🧪 Demo Flow

Start backend

Start frontend

Wait ~10–30 seconds

Low-quality partner traffic increases

LTV drops

PulseIQ detects root cause

Executive insights populate automatically

No manual triggers required.

🎯 Hackathon Focus

PulseIQ demonstrates:

Autonomous insight generation

Cross-domain reasoning

Real-time executive intelligence

Business storytelling via AI

This is not BI.
This is decision intelligence.

🔐 API Keys

Current demo uses a local executive generator (no external LLM required).

If integrating real LLMs later:

Store keys in Railway environment variables

Never commit .env files to GitHub

🏆 Use Cases

Executive decision support

Partner quality monitoring

Revenue risk detection

Churn early warning

Platform health intelligence

👥 Team: True_AI
    ##Umer Anis
    ##Shadab Ahmed
    ##Humberto

Built for the Deriv AI Talent Sprint Hackathon.

---


MIT License

Copyright (c) 2026 PulseIQ

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


