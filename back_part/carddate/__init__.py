from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta

import config
db = SQLAlchemy()
migrate = Migrate()
def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=10)

    # ORM
    db.init_app(app)
    migrate.init_app(app, db)

    
    from . import models

    # 블루프린트
    from .views import home_views, login_views, form_views, drawing_views, random_views, recommend_views
    app.register_blueprint(home_views.bp)
    app.register_blueprint(login_views.bp)
    app.register_blueprint(form_views.bp)
    app.register_blueprint(drawing_views.bp)
    app.register_blueprint(random_views.bp)
    app.register_blueprint(recommend_views.bp)

    return app