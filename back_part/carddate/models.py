from . import db

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(10), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    age = db.Column(db.String(5), nullable=False)
    major = db.Column(db.String(10), nullable=False)
    mbti = db.Column(db.String(4), nullable=False)
    hobby = db.Column(db.String(25), nullable=True)
    contact = db.Column(db.String(25), nullable=False)
    image_data = db.Column(db.String(100), nullable=False)  # 이미지 경로 저장
    color = db.Column(db.String(100), nullable=False)  # 색상 경로 저장
    create_date = db.Column(db.DateTime(0), nullable=False)