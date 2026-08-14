import sys
import os

# Add backend directory to Python path so backend imports work correctly
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "backend"))

from app import database

if __name__ == "__main__":
    database.init_db()
    database.ensure_seeded()
    print("Database initialized and seeded successfully")
