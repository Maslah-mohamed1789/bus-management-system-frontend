from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Bus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)

class Passenger(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    bus_id = db.Column(db.Integer, db.ForeignKey('bus.id'), nullable=False)

class Routeline(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    bus_id = db.Column(db.Integer, db.ForeignKey('bus.id'), nullable=False)