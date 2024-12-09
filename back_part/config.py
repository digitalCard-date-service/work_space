import os
import logging

BASE_DIR = os.path.dirname(__file__)

logging.getLogger('werkzeug').disabled = True

SQLALCHEMY_DATABASE_URI = 'sqlite:///{}'.format(os.path.join(BASE_DIR, 'carddate.db'))
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = "dev"
API_KEY= "0a88c9b6-497f-4236-820c-79866b6a4e08"