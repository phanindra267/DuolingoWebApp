from sqlmodel import SQLModel, create_engine, Session, select
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_DB_PATH = os.path.join(BASE_DIR, "..", "database.db")
DB_PATH = os.getenv("DATABASE_URL", f"sqlite:///{os.path.abspath(DEFAULT_DB_PATH)}")

if not DB_PATH.startswith("sqlite:///"):
    DB_PATH = f"sqlite:///{os.path.abspath(DB_PATH)}"

connect_args = {"check_same_thread": False}
engine = create_engine(DB_PATH, echo=False, connect_args=connect_args)


def init_db():
    from . import models
    SQLModel.metadata.create_all(engine, checkfirst=True)


def get_session():
    with Session(engine) as session:
        yield session


def ensure_seeded():
    from . import models
    import json

    with Session(engine) as session:
        lang_count = len(session.exec(select(models.Language)).all())
        if lang_count > 0:
            return

        lang = models.Language(name="Spanish", flag="🇪🇸")
        session.add(lang)
        session.flush()

        unit1 = models.Unit(language_id=lang.id, title="Unit 1 · Basics", order=1,
                            description="Master fundamental greetings and everyday phrases.")
        unit2 = models.Unit(language_id=lang.id, title="Unit 2 · Food & Family", order=2,
                            description="Talk about meals, ingredients, and the people you love.")
        session.add_all([unit1, unit2])
        session.flush()

        skills = [
            models.Skill(unit_id=unit1.id, title="Greetings", description="Say hello & goodbye",
                         lock_status="unlocked", progress=0, xp_reward=10, crowns=0),
            models.Skill(unit_id=unit1.id, title="Numbers 1–10", description="Count to ten",
                         lock_status="locked", progress=0, xp_reward=10, crowns=0),
            models.Skill(unit_id=unit1.id, title="Common Phrases", description="Everyday Spanish",
                         lock_status="locked", progress=0, xp_reward=10, crowns=0),
            models.Skill(unit_id=unit2.id, title="Food", description="Order like a local",
                         lock_status="locked", progress=0, xp_reward=15, crowns=0),
            models.Skill(unit_id=unit2.id, title="Family", description="Meet la familia",
                         lock_status="locked", progress=0, xp_reward=15, crowns=0),
            models.Skill(unit_id=unit2.id, title="Restaurant", description="Dining out",
                         lock_status="locked", progress=0, xp_reward=20, crowns=0),
        ]
        session.add_all(skills)
        session.flush()

        lessons = []
        exercises = []
        for idx, skill in enumerate(skills):
            lesson = models.Lesson(skill_id=skill.id, title=f"Lesson {idx + 1}", order=1)
            lessons.append(lesson)
        session.add_all(lessons)
        session.flush()

        skill_lesson_map = list(zip(skills, lessons))

        def _mc(lesson_id, q, opts, correct, order):
            exercises.append(models.Exercise(
                lesson_id=lesson_id, type="multiple_choice", order=order,
                content_json=json.dumps({"question": q, "options": opts}),
                answer_json=json.dumps({"correct": correct}),
            ))

        def _tr(lesson_id, prompt, bank, correct, order):
            exercises.append(models.Exercise(
                lesson_id=lesson_id, type="translate", order=order,
                content_json=json.dumps({"prompt": prompt, "word_bank": bank}),
                answer_json=json.dumps({"correct": correct}),
            ))

        def _fb(lesson_id, sentence, blank, correct, order):
            exercises.append(models.Exercise(
                lesson_id=lesson_id, type="fill_blank", order=order,
                content_json=json.dumps({"sentence": sentence, "blank": blank}),
                answer_json=json.dumps({"correct": correct}),
            ))

        def _tp(lesson_id, q, correct, order):
            exercises.append(models.Exercise(
                lesson_id=lesson_id, type="typing", order=order,
                content_json=json.dumps({"question": q}),
                answer_json=json.dumps({"correct": correct}),
            ))

        def _mp(lesson_id, pairs, order):
            exercises.append(models.Exercise(
                lesson_id=lesson_id, type="match_pairs", order=order,
                content_json=json.dumps({"pairs": pairs}),
                answer_json=json.dumps({"pairs": pairs}),
            ))

        greetings_lid = skill_lesson_map[0][1].id
        _mc(greetings_lid, "How do you say 'Hello' in Spanish?",
            ["Hola", "Adiós", "Gracias", "Por favor"], "Hola", 1)
        _tr(greetings_lid, "Translate: Good morning",
            ["buenos", "días", "hola", "noches"], ["buenos", "días"], 2)
        _fb(greetings_lid, "¿Cómo ___ ustedes?", "___", "están", 3)
        _tp(greetings_lid, "Type: Good night", "Buenas noches", 4)
        _mp(greetings_lid, [
            {"left": "Hello", "right": "Hola"},
            {"left": "Bye", "right": "Adiós"},
            {"left": "Thank you", "right": "Gracias"},
            {"left": "Please", "right": "Por favor"},
        ], 5)

        numbers_lid = skill_lesson_map[1][1].id
        _mc(numbers_lid, "What is 'tres' in English?", ["Two", "Three", "Four", "Ten"], "Three", 1)
        _tr(numbers_lid, "Translate: five eight",
            ["cinco", "ocho", "tres", "siete"], ["cinco", "ocho"], 2)
        _fb(numbers_lid, "Diez menos cuatro = ___ (spell it out)", "___", "seis", 3)
        _tp(numbers_lid, "Type the Spanish number for 'seven'", "siete", 4)

        phrases_lid = skill_lesson_map[2][1].id
        _mc(phrases_lid, "What does 'Lo siento' mean?",
            ["I'm sorry", "I know", "I see", "I agree"], "I'm sorry", 1)
        _tr(phrases_lid, "Translate: I don't understand",
            ["no", "entiendo", "yo", "comprendo"], ["no", "entiendo"], 2)
        _tp(phrases_lid, "Type: See you tomorrow", "Hasta mañana", 3)

        food_lid = skill_lesson_map[3][1].id
        _mc(food_lid, "What is 'agua'?", ["Bread", "Water", "Wine", "Milk"], "Water", 1)
        _tr(food_lid, "Translate: I eat bread",
            ["yo", "como", "pan", "bebo"], ["yo", "como", "pan"], 2)
        _fb(food_lid, "Me gusta el ___ (cheese)", "___", "queso", 3)
        _tp(food_lid, "Type the Spanish for 'apple'", "manzana", 4)
        _mp(food_lid, [
            {"left": "bread", "right": "pan"},
            {"left": "milk", "right": "leche"},
            {"left": "rice", "right": "arroz"},
            {"left": "meat", "right": "carne"},
        ], 5)

        family_lid = skill_lesson_map[4][1].id
        _mc(family_lid, "What does 'madre' mean?", ["Father", "Mother", "Sister", "Aunt"], "Mother", 1)
        _tr(family_lid, "Translate: My brother",
            ["mi", "hermano", "hermana", "yo"], ["mi", "hermano"], 2)
        _fb(family_lid, "Él es mi ___ (grandfather)", "___", "abuelo", 3)
        _tp(family_lid, "Type: My family", "Mi familia", 4)

        rest_lid = skill_lesson_map[5][1].id
        _mc(rest_lid, "How do you ask for 'the bill'?",
            ["La carta", "La cuenta", "La mesa", "La copa"], "La cuenta", 1)
        _tr(rest_lid, "Translate: I would like coffee",
            ["quisiera", "café", "quiero", "té"], ["quisiera", "café"], 2)
        _fb(rest_lid, "¿Tienen una ___ libre? (table)", "___", "mesa", 3)
        _tp(rest_lid, "Type: Delicious food", "Comida deliciosa", 4)

        session.add_all(exercises)

        demo_user = models.User(
            id=1, username="demo_user",
            xp=240, gems=505, hearts=5, streak=4,
            dailyXp=20, dailyGoal=50,
            completed="[]", answers=0, correctAnswers=0,
            quests='{"xp": 20, "lessons": 1, "perfect": 0, "gems": 0}',
        )
        session.add(demo_user)

        session.commit()
