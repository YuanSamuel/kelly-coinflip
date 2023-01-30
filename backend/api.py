from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    # allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# username : {bet, heads/tails}
db = {}
starting = 10000
win_prob = 0.6

@app.post("/set-win-prob")
def set_win_prob(prob: float):
    win_prob = prob

@app.post("/set-starting")
def set_starting(amount: float):
    starting = amount

@app.post("/add-user/{user_id}")
def add_user(user_id: str):
    if user_id in db:
        raise HTTPException(status_code=404, description="User Exists")

    db[user_id] = starting

@app.get("/update-bet/{user_id}")
def update_bet(user_id: str, bet_amount: float):
    if not user_id in db:
        raise HTTPException(status_code=404, description="Invalid User")

    if bet_amount > db[user_id] or bet_amount < 0:
        return db[user_id]

    flip_results = 2 * np.random.binomial(1, win_prob, int(1)) - 1

    if flip_results > 0:
        db[user_id] += bet_amount
    else:
        db[user_id] = min(db[user_id] - bet_amount, 0)

    return db[user_id]

@app.get("/curr-amount/{user_id}")
def curr_amount(user_id: str):
    if not user_id in db:
        raise HTTPException(status_code=404, description="Invalid User")
    
    return db[user_id]

@app.get("/leaderboard")
def leaderboard():
    return db