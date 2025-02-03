import os
from flask_sqlalchemy import SQLAlchemy

# Initialize db object
db = SQLAlchemy()

SQLALCHEMY_DATABASE_URI = "sqlite:///bus_management.db"  # Ensure this is present
SQLALCHEMY_TRACK_MODIFICATIONS = False
