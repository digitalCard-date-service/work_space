from flask import Blueprint, request, render_template, redirect, url_for, flash, session
import requests
from werkzeug.utils import redirect

from ..forms import ProfileForm
from ..models import Profile
from .. import db

bp = Blueprint('drawing', __name__, url_prefix='/drawing')

@bp.route('/')
def index():
    return render_template('drawing.html')