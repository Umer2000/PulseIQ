from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.simulator import start_simulation
from app.agent import generate_briefing

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    start_simulation()

@app.get("/")
def health():
    return {"status": "PulseIQ backend running"}

@app.get("/briefing")
def briefing():
    return generate_briefing()
