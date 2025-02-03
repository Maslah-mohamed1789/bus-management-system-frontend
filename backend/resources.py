from flask_restful import Resource, reqparse
from models import Bus, Passenger, Routeline
from config import db

# Request parser setup
def get_parser(fields):
    parser = reqparse.RequestParser()
    for field, field_type in fields.items():
        parser.add_argument(field, type=field_type, required=True, help=f"{field} cannot be blank.")
    return parser

# ----------------- Bus Resource -----------------
class BusesResource(Resource):
    def get(self, bus_id):
        bus = Bus.query.get_or_404(bus_id)
        return bus.to_dict()

    def put(self, bus_id):
        bus = Bus.query.get_or_404(bus_id)
        parser = get_parser({'name': str, 'capacity': int})
        args = parser.parse_args()
        bus.name = args['name']
        bus.capacity = args['capacity']
        db.session.commit()
        return bus.to_dict()

    def delete(self, bus_id):
        bus = Bus.query.get_or_404(bus_id)
        db.session.delete(bus)
        db.session.commit()
        return {'message': 'Bus deleted'}

# ----------------- Bus List Resource -----------------
class BusListResource(Resource):
    def get(self):
        return [bus.to_dict() for bus in Bus.query.all()]

    def post(self):
        parser = get_parser({'name': str, 'capacity': int})
        args = parser.parse_args()
        bus = Bus(**args)
        db.session.add(bus)
        db.session.commit()
        return bus.to_dict(), 201

# ----------------- Passenger Resource -----------------
class PassengerResource(Resource):
    def get(self, passenger_id):
        passenger = Passenger.query.get_or_404(passenger_id)
        return passenger.to_dict()

    def put(self, passenger_id):
        passenger = Passenger.query.get_or_404(passenger_id)
        parser = get_parser({'name': str, 'bus_id': int})
        args = parser.parse_args()
        passenger.name = args['name']
        passenger.bus_id = args['bus_id']
        db.session.commit()
        return passenger.to_dict()

    def delete(self, passenger_id):
        passenger = Passenger.query.get_or_404(passenger_id)
        db.session.delete(passenger)
        db.session.commit()
        return {'message': 'Passenger deleted'}

# ----------------- Passenger List Resource -----------------
class PassengerListResource(Resource):
    def get(self):
        return [passenger.to_dict() for passenger in Passenger.query.all()]

    def post(self):
        parser = get_parser({'name': str, 'bus_id': int})
        args = parser.parse_args()
        passenger = Passenger(**args)
        db.session.add(passenger)
        db.session.commit()
        return passenger.to_dict(), 201

# ----------------- Routeline Resource -----------------
class RoutelineResource(Resource):
    def get(self, routeline_id):
        routeline = Routeline.query.get_or_404(routeline_id)
        return routeline.to_dict()

    def put(self, routeline_id):
        routeline = Routeline.query.get_or_404(routeline_id)
        parser = get_parser({'name': str, 'bus_id': int})
        args = parser.parse_args()
        routeline.name = args['name']
        routeline.bus_id = args['bus_id']
        db.session.commit()
        return routeline.to_dict()

    def delete(self, routeline_id):
        routeline = Routeline.query.get_or_404(routeline_id)
        db.session.delete(routeline)
        db.session.commit()
        return {'message': 'Routeline deleted'}

# ----------------- Routeline List Resource -----------------
class RoutelineListResource(Resource):
    def get(self):
        return [routeline.to_dict() for routeline in Routeline.query.all()]

    def post(self):
        parser = get_parser({'name': str, 'bus_id': int})
        args = parser.parse_args()
        routeline = Routeline(**args)
        db.session.add(routeline)
        db.session.commit()
        return routeline.to_dict(), 201
