from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from pydantic import BaseModel
import json
from datetime import date, timedelta
from .. import models, database

router = APIRouter()


def get_default_user(session: Session) -> models.User:
    user = session.get(models.User, 1)
    if not user:
        user = models.User(
            id=1, username="demo_user",
            xp=240, gems=505, hearts=5, streak=4,
            dailyXp=20, dailyGoal=50,
            completed="[]", answers=0, correctAnswers=0,
            quests='{"xp": 20, "lessons": 1, "perfect": 0, "gems": 0}',
        )
        session.add(user)
        session.commit()
        session.refresh(user)
    return user


class DuoStateUpdate(BaseModel):
    xp: int
    gems: int
    hearts: int
    streak: int
    dailyXp: int
    dailyGoal: int
    completed: list[str]
    answers: int
    correctAnswers: int
    quests: dict
    dark: bool
    sound: bool
    motion: bool
    listening: bool
    name: str


@router.get("/state")
async def get_state(session: Session = Depends(database.get_session)):
    user = get_default_user(session)
    return {
        "xp": user.xp,
        "gems": user.gems,
        "hearts": user.hearts,
        "streak": user.streak,
        "dailyXp": user.dailyXp,
        "dailyGoal": user.dailyGoal,
        "completed": json.loads(user.completed),
        "answers": user.answers,
        "correctAnswers": user.correctAnswers,
        "quests": json.loads(user.quests),
        "dark": user.dark,
        "sound": user.sound,
        "motion": user.motion,
        "listening": user.listening,
        "name": user.username,
    }


@router.post("/state")
async def update_state(state: DuoStateUpdate, session: Session = Depends(database.get_session)):
    user = get_default_user(session)

    user.xp = state.xp
    user.gems = state.gems
    user.hearts = state.hearts
    user.dailyXp = state.dailyXp
    user.dailyGoal = state.dailyGoal
    user.completed = json.dumps(state.completed)
    user.answers = state.answers
    user.correctAnswers = state.correctAnswers
    user.quests = json.dumps(state.quests)
    user.dark = state.dark
    user.sound = state.sound
    user.motion = state.motion
    user.listening = state.listening
    user.username = state.name

    today = date.today().isoformat()
    if user.last_active != today:
        if user.last_active == (date.today() - timedelta(days=1)).isoformat():
            user.streak = state.streak
        elif state.dailyXp > 0:
            user.streak = 1
        user.last_active = today
    else:
        user.streak = state.streak

    session.add(user)
    session.commit()
    return {"status": "ok"}


@router.get("/leaderboard")
async def leaderboard(session: Session = Depends(database.get_session)):
    users = session.exec(
        select(models.User).order_by(models.User.xp.desc()).limit(10)
    ).all()

    extras = [
        {"name": "Sofía", "xp": 2480, "avatar": "🦉"},
        {"name": "Mateo", "xp": 1920, "avatar": "🐆"},
        {"name": "Valentina", "xp": 1560, "avatar": "🦋"},
        {"name": "Diego", "xp": 1180, "avatar": "🦎"},
        {"name": "Camila", "xp": 990, "avatar": "🌺"},
        {"name": "Lucas", "xp": 720, "avatar": "🦜"},
        {"name": "Elena", "xp": 460, "avatar": "🐢"},
    ]

    board = []
    for u in users:
        board.append({"name": u.username, "xp": u.xp, "avatar": "🧑‍🎓", "isYou": u.id == 1})

    for extra in extras:
        if not any(b["name"] == extra["name"] for b in board):
            board.append({**extra, "isYou": False})

    board.sort(key=lambda x: x["xp"], reverse=True)
    for i, entry in enumerate(board):
        entry["rank"] = i + 1
    return board
