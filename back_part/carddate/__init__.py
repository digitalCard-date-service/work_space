from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
migrate = Migrate()
def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    app.config.from_object('config.Config')

    # ORM
    db.init_app(app)
    migrate.init_app(app, db)

    
    from . import models

    # 블루프린트
    from .views import onBoarding, login_views, writing_views, drawing_views, random_views, recommend_views, idealType_views, aiSimulation_views, admin_views
    app.register_blueprint(onBoarding.bp)
    app.register_blueprint(login_views.bp)
    app.register_blueprint(writing_views.bp)
    app.register_blueprint(drawing_views.bp)
    app.register_blueprint(random_views.bp)  
    app.register_blueprint(recommend_views.bp)
    app.register_blueprint(idealType_views.bp)
    app.register_blueprint(aiSimulation_views.bp)
    app.register_blueprint(admin_views.bp)

    return app            