import pandas as pd
from app.simulator import get_events

def compute_metrics():
    events = get_events()

    if not events:
        return None

    df = pd.DataFrame(events)

    # Artificially punish low quality partners
    df["adjusted_amount"] = df.apply(
        lambda x: x["amount"] * 0.5 if x["partner_quality"] < 0.5 else x["amount"],
        axis=1
    )

    ltv = df["adjusted_amount"].sum() / df["customer_id"].nunique()
    low_quality_ratio = (df["partner_quality"] < 0.5).mean()

    return {
        "ltv": round(float(ltv), 2),
        "low_quality_ratio": round(float(low_quality_ratio), 2),
        "total_events": len(df)
    }
