from flask import Blueprint, render_template

bp = Blueprint('master', __name__, url_prefix='/master')

@bp.route('/')
def index():
    return render_template('master.html')