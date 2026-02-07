import networkx as nx
from app.simulator import get_events

def build_graph():
    G = nx.DiGraph()

    events = get_events()

    partner_counts = {}
    partner_quality = {}

    for e in events:
        pid = e["partner_id"]
        partner_counts[pid] = partner_counts.get(pid, 0) + 1
        partner_quality[pid] = e["partner_quality"]

    for partner, count in partner_counts.items():
        quality = partner_quality[partner]

        G.add_node(partner, type="partner", quality=quality, volume=count)

        G.add_edge("LTV", partner, reason="contributes")

        if quality < 0.5:
            G.add_edge(partner, "LowQualityChannel")

    return G
