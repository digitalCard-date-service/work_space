from flask import Blueprint, request, render_template, redirect, url_for, flash, session
import requests
from werkzeug.utils import redirect

from ..forms import ProfileForm
from ..models import Profile
from .. import db

bp = Blueprint('recommend', __name__, url_prefix='/recommend')

@bp.route('/')
def index():
    return render_template('recommendOpen.html')