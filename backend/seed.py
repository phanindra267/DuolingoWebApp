from app import database


def main():
    database.init_db()
    database.ensure_seeded()
    print("Database initialized and seeded successfully")


if __name__ == "__main__":
    main()
