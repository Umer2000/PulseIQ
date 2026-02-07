from app.metrics import compute_metrics
from app.graph import build_graph


def fake_llm(metrics, causes):
    return f"""
INSIGHTS
- Client LTV has declined significantly.
- Low-quality partner acquisition now dominates traffic.
- Conversion efficiency dropped across partner channels.

RISKS
- Monthly revenue projected to decline by ~12%.
- Increased churn risk from low-retention users.

OPPORTUNITY
- Rebalancing partner commissions can recover high-value traffic within 2 weeks.

(Generated locally for demo)
"""


def extract_causes(G):
    causes = []

    for node in G.nodes(data=True):
        name, attrs = node
        if attrs.get("type") == "partner" and attrs.get("quality", 1) < 0.5:
            causes.append(f"Partner {name} volume increased while quality is low.")

    return causes


def generate_briefing():
    metrics = compute_metrics()

    if not metrics:
        return {"status": "collecting"}

    G = build_graph()
    causes = extract_causes(G)

    executive = "Monitoring metrics."

    # deterministic demo trigger
    if metrics["low_quality_ratio"] > 0.6:
        executive = fake_llm(metrics, causes)

    return {
        "metrics": metrics,
        "root_causes": causes,
        "executive_briefing": executive
    }
