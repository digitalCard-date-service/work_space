import os
import logging
class Config:
    BASE_DIR = os.path.dirname(__file__)

    logging.getLogger('werkzeug').disabled = True

    SQLALCHEMY_DATABASE_URI = 'sqlite:///{}'.format(os.path.join(BASE_DIR, 'carddate.db'))
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "dev"


    UNIV_API = '3ff92442-2fa8-4115-9902-9454f05fcdb9'
    GPT_API = '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'