from sqlmodel import SQLModel, Field
from typing import Optional


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)

    xp: int = Field(default=0)
    gems: int = Field(default=500)
    hearts: int = Field(default=5)
    streak: int = Field(default=0)
    dailyXp: int = Field(default=0)
    dailyGoal: int = Field(default=50)
    completed: str = Field(default="[]")
    answers: int = Field(default=0)
    correctAnswers: int = Field(default=0)
    quests: str = Field(default='{"xp": 0, "lessons": 0, "perfect": 0, "gems": 0}')

    dark: bool = Field(default=False)
    sound: bool = Field(default=True)
    motion: bool = Field(default=True)
    listening: bool = Field(default=True)

    last_active: Optional[str] = Field(default=None)


class Language(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True)
    flag: Optional[str] = Field(default=None)


class Unit(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    language_id: int = Field(foreign_key="language.id", index=True)
    title: str
    order: int = Field(default=0)
    description: Optional[str] = Field(default=None)


class Skill(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    unit_id: int = Field(foreign_key="unit.id", index=True)
    title: str
    description: Optional[str] = Field(default=None)
    lock_status: str = Field(default="locked")
    progress: int = Field(default=0)
    xp_reward: int = Field(default=10)
    crowns: int = Field(default=0)


class Lesson(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    skill_id: int = Field(foreign_key="skill.id", index=True)
    title: str
    order: int = Field(default=0)


class Exercise(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    lesson_id: int = Field(foreign_key="lesson.id", index=True)
    type: str
    content_json: str
    answer_json: str
    order: int = Field(default=0)
