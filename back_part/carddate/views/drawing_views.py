from flask import Blueprint, request, render_template, redirect, url_for, flash, session
import requests
from werkzeug.utils import redirect

from ..forms import ProfileForm
from ..models import Profile
from .. import db

bp = Blueprint('drawing', __name__, url_prefix='/drawing')

@bp.route('/')
def index():
    '''
    if 'user_email' in session:
        return render_template('form.html')
    return redirect(url_for('login.index'))
    '''
    return render_template('drawing.html')