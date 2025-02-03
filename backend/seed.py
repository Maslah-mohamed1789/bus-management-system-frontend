from flask import Flask
from models import  Bus, Passenger, Routeline
from config import Config
from app import db


app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

with app.app_context():
    db.create_all()

    # Seed data
    bus1 = Bus(name='Bus 1', capacity=50)
    bus2 = Bus(name='Bus 2', capacity=40)
    db.session.add(bus1)
    db.session.add(bus2)
    db.session.commit()

    passenger1 = Passenger(name='John Doe', bus_id=1)
    passenger2 = Passenger(name='Jane Doe', bus_id=2)
    db.session.add(passenger1)
    db.session.add(passenger2)
    db.session.commit()

    routeline1 = Routeline(name='Route 1', bus_id=1)
    routeline2 = Routeline(name='Route 2', bus_id=2)
    db.session.add(routeline1)
    db.session.add(routeline2)
    db.session.commit()