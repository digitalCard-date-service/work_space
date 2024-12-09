from flask_wtf import FlaskForm
from sqlalchemy import Integer
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, Regexp

class ProfileForm(FlaskForm):
    name = StringField('이름', validators=[DataRequired(), Length(max=10)])  # 이름
    gender = StringField('성별', validators=[DataRequired(), Length(max=10)])  # 성별
    classNumber = IntegerField('학번', validators=[DataRequired()])  # 학번
    age = IntegerField('나이', validators=[DataRequired()])  # 나이
    major = StringField('학과', validators=[DataRequired(), Length(max=25)])  # 학과
    mbti = StringField('MBTI', validators=[DataRequired(), Length(min=4, max=4)])  # MBTI, 4글자
    hobby = StringField('취미', validators=[Length(max=25)])  # 취미, 선택사항
    contact = StringField('연락처', validators=[DataRequired(), Length(max=25)])  # 연락처
    image = StringField('이미지', validators=[DataRequired()])
    color = StringField('색상', validators=[DataRequired()])