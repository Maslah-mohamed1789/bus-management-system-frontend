from flask import Flask
from flask_restful import Api
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import config
from models import db
from resources import (
    PassengerResource, PassengerListResource, 
    RoutelineResource, RoutelineListResource, 
    BusesResource, BusListResource
)

app = Flask(__name__)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = config.SQLALCHEMY_TRACK_MODIFICATIONS

# Initialize Database and Migrations
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

db = SQLAlchemy(app)


# Initialize Flask-RESTful API
api = Api(app)

# Routes for listing and creating new entries
api.add_resource(PassengerListResource, '/api/passengers')  # GET all, POST new
api.add_resource(RoutelineListResource, '/api/routelines')  # GET all, POST new
api.add_resource(BusListResource, '/api/buses')             # GET all, POST new

# Routes for individual resource operations
api.add_resource(PassengerResource, '/api/passengers/<int:passenger_id>')  # GET, PUT, DELETE
api.add_resource(RoutelineResource, '/api/routelines/<int:routeline_id>')  # GET, PUT, DELETE
api.add_resource(BusesResource, '/api/buses/<int:bus_id>')                 # GET, PUT, DELETE

# Run Application
if __name__ == '__main__':  
    with app.app_context():
        db.create_all()
    app.run(debug=True)
