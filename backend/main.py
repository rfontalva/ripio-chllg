from flask import Flask
from flask_cors import CORS, cross_origin
from api import api
import fireo

fireo.connection(from_file="settings.json")

def create_app():
    app = Flask(__name__)
    app.config['CORS_HEADERS'] = 'Content-Type'
    CORS(app)
    app.register_blueprint(api, url_prefix='/api')

    @app.route('/')
    def index():
        return 'Hello, world'
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
