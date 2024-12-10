from flask import Blueprint, render_template

bp = Blueprint('drawing', __name__, url_prefix='/drawing')

@bp.route('/')
def index():
    return render_template('drawing.html')