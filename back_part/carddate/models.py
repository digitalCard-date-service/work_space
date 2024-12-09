from . import db

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(10), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    classNumber = db.Column(db.Integer(), nullable=False)
    age = db.Column(db.Integer(), nullable=False)
    major = db.Column(db.String(10), nullable=False)
    mbti = db.Column(db.String(4), nullable=False)
    hobby = db.Column(db.String(25), nullable=True)
    contact = db.Column(db.String(25), nullable=False)
    image = db.Column(db.String(100), nullable=False)
    color = db.Column(db.String(100), nullable=False)
    create_date = db.Column(db.DateTime(0), nullable=False)