from flask import Blueprint, render_template, request, session, jsonify

bp = Blueprint('survey', __name__, url_prefix='/survey')

@bp.route('/')
def index():
    return render_template('idealTypeSurvey.html')

@bp.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    print(data)
    session['age'] = data['age']
    session['major'] = data['major']
    session['mbti'] = data['mbti']
    session['hobby'] = data['hobbies']
    return jsonify({
        'status': 'success',
        'message': '이상형타입이 성공적으로 저장되었습니다.'
    }, 200)
