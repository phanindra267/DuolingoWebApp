from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from ..models import Language, Unit, Skill, Lesson, Exercise
from ..database import get_session

router = APIRouter()

@router.get("/", response_model=list[Language])
def get_languages(session: Session = Depends(get_session)):
    """Return all languages (normally just one seeded language)."""
    languages = session.exec(select(Language)).all()
    return languages

@router.get("/language/{language_id}", response_model=Language)
def get_language(language_id: int, session: Session = Depends(get_session)):
    language = session.get(Language, language_id)
    if not language:
        raise HTTPException(status_code=404, detail="Language not found")
    return language

@router.get("/language/{language_id}/units", response_model=list[Unit])
def get_units(language_id: int, session: Session = Depends(get_session)):
    units = session.exec(select(Unit).where(Unit.language_id == language_id).order_by(Unit.order)).all()
    return units

@router.get("/unit/{unit_id}/skills", response_model=list[Skill])
def get_skills(unit_id: int, session: Session = Depends(get_session)):
    skills = session.exec(select(Skill).where(Skill.unit_id == unit_id).order_by(Skill.id)).all()
    return skills

@router.get("/skill/{skill_id}/lessons", response_model=list[Lesson])
def get_lessons(skill_id: int, session: Session = Depends(get_session)):
    lessons = session.exec(select(Lesson).where(Lesson.skill_id == skill_id).order_by(Lesson.order)).all()
    return lessons

@router.get("/lesson/{lesson_id}", response_model=Lesson)
def get_lesson(lesson_id: int, session: Session = Depends(get_session)):
    lesson = session.get(Lesson, lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson

@router.get("/lesson/{lesson_id}/exercises", response_model=list[Exercise])
def get_exercises(lesson_id: int, session: Session = Depends(get_session)):
    exercises = session.exec(select(Exercise).where(Exercise.lesson_id == lesson_id)).all()
    return exercises

@router.post("/skill/{skill_id}/complete", response_model=Skill)
def complete_skill(skill_id: int, session: Session = Depends(get_session)):
    skill = session.get(Skill, skill_id)
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    skill.progress += 25
    if skill.progress >= 100:
        skill.progress = 100
        skill.lock_status = "completed"
    elif skill.lock_status == "locked":
        skill.lock_status = "unlocked"
        
    session.add(skill)
    session.commit()
    session.refresh(skill)
    return skill
