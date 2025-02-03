from flask import Flask
from flask_restful import Api
from flask_migrate import Migrate
from flask_cors import CORS
import config
from flask_sqlalchemy import SQLAlchemy
from resources import PassengerResource, RoutelineResource, BusesResource
from models import db

app = Flask(__name__)

# Database Configuration (Update with actual credentials)
app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = config.SQLALCHEMY_TRACK_MODIFICATIONS


# Initialize Database
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

# Initialize Flask-RESTful API
api = Api(app)
api.add_resource(PassengerResource, '/api/passengers', '/api/passengers/<int:id>')
api.add_resource(RoutelineResource, '/api/routelines', '/api/routelines/<int:id>')
api.add_resource(BusesResource, '/api/buses', '/api/buses/<int:id>')

# Run Application
if __name__ == '__main__':  
    with app.app_context():
        db.create_all()
    app.run(debug=True)
