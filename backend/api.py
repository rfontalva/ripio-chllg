from flask import Blueprint, request
from models import User, City
import bcrypt

api = Blueprint('api', __name__)

@api.route('/')
def index():
    return "Hello, api"

@api.route('/validate')
def validate():
    req = request.args
    u = User.get_by_username(req.get('username'))
    pw = req.get('password').encode('utf-8')
    if u.password == bcrypt.hashpw(pw, u.salt):
        return 'ok'
    return 'wrong'

# @api.route('/user', methods = ['POST'])
@api.route('/user')
def add():
    req = request.args
    email = req.get('email')
    name = req.get('name')
    username = req.get('username')
    password = req.get('password')
    if User.get_by_email(email):
        return "Email ya en uso"
    if User.get_by_username(username):
        return "Username ya en uso"
    u = User(name, username, password, email)
    u.save()
    return u.name

@api.route('/users')
def get_users():
    u = User.collection.filter('name', '==', request.args.get('name')).fetch()
    return u

@api.route('/test')
def city():
    u = User.get_user('cacho')
    print(u)
    return u.name
