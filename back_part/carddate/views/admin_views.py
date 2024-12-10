from flask import Blueprint, render_template, jsonify, request
import os

API_KEY = os.environ.get('UNIV_KEY')
PASSWORD = os.environ.get('PASSWORD')

bp = Blueprint('admin', __name__, url_prefix='/admin')

@bp.route('/')
def index():
    return render_template('adminLogin.html')

@bp.route('/submit', methods=['POST'])
def submit():
    password = request.get_json()['password']
    if password == PASSWORD:
        return jsonify({
            "status": 200,
            "success": "true"
        })
    return jsonify({
        "status": 401,
        "success": "false"
    })

@bp.route('/control')
def control():
    return render_template('master.html')

@bp.route('/control/clear', methods=['POST'])
def clear():
    password = request.get_json()['password']
    return jsonify()