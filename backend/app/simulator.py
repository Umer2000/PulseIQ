import threading
import time
import random
from faker import Faker

fake = Faker()

EVENTS = []

START_TIME = time.time()

PARTNERS = {
    "A": {"quality": 0.9},
    "B": {"quality": 0.4}
}

def generate_event():
    elapsed = time.time() - START_TIME

    # After 60 seconds, shift traffic to low quality partner
    if elapsed > 60:
        partner_id = "B"
    else:
        partner_id = random.choice(["A", "A", "A", "B"])

    partner = PARTNERS[partner_id]

    return {
        "customer_id": fake.uuid4(),
        "partner_id": partner_id,
        "partner_quality": partner["quality"],
        "amount": random.randint(50, 200),
        "timestamp": time.time()
    }

def simulation_loop():
    while True:
        event = generate_event()
        EVENTS.append(event)

        if len(EVENTS) > 500:
            EVENTS.pop(0)

        time.sleep(2)

def start_simulation():
    t = threading.Thread(target=simulation_loop)
    t.daemon = True
    t.start()

def get_events():
    return EVENTS
