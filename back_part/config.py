import os
import logging
import pymysql 

pymysql.install_as_MySQLdb() 

class Config:
    DATABASE_URL = os.getenv('JAWSDB_MARIA_URL')

    logging.getLogger('werkzeug').disabled = True

    SQLALCHEMY_DATABASE_URI = DATABASE_URL.replace('mysql://', 'mysql+pymysql://')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "dev"