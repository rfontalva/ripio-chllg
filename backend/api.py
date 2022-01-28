from crypt import methods
import bcrypt
import fireo
from flask import Blueprint, request, jsonify
from flask_cors import CORS
from models import User, Wallet
from models.currency import Currency

from models.transaction import Transaction

api = Blueprint('api', __name__)
CORS(api)

@api.route('/')
def index():
    return "Hello, api"

@api.route('/validate', methods=["POST", "GET"])
def validate():
    req = request.args
    print(req)
    u = User.get_by_username(req.get('username'))
    pw = req.get('password').encode('utf-8')
    if u.password == bcrypt.hashpw(pw, u.salt):
        return jsonify({"status": 200, "username": u.username})
    return jsonify({"status": 403})


@api.route('/user', methods = ['PUT'])
def add():
    req = request.args
    email = req.get('email')
    name = req.get('name')
    username = req.get('username')
    password = req.get('password')
    if User.get_by_email(email):
        return "Email ya en uso", 403
    if User.get_by_username(username):
        return "Username ya en uso", 403
    u = User()
    u.load_values(name, username, password, email)
    wallet = Wallet()
    wallet.create_wallet(u)
    return jsonify({"status": 200})

@api.route('/balance')
def get_balance():
    username = request.args.get('username')
    u = User.get_by_username(username)
    wallet = Wallet.get_by_user(u)
    return jsonify(wallet.get_balance())

@api.route('/users')
def get_users():
    u = User.collection.filter('name', '==', request.args.get('name')).fetch()
    return u

@api.route('/deposit')
def transaction():
    req = request.args
    # try:
    batch = fireo.batch()
    user = User.get_by_username(req['username'])
    currency_id = req['currency']
    amount = int(req['amount'])
    transaction = Transaction()
    transaction.load_values(**{"buyer": user.key, 
    "buyer_currency": currency_id, 
    "buyer_price": amount,
    "is_deposit": True})
    wallet = Wallet.get_by_user(user)
    wallet.update_wallet(currency_id, amount)
    batch.commit()
    return jsonify({"status": 200})
    # except:
    #     return jsonify({"status": 400})

@api.route('/currency')
def get_currency():
    return jsonify(Currency.get_all())

@api.route('/currency', methods=["POST"])
def add_currency():
    req = request.args
    id = req.get("currency")
    name = req.get("name")
    currency = Currency()
    currency.add(id, name)
    return jsonify({"status": 200})

@api.route('/transactions')
def get_transactions():
    t = Transaction.get_completed()
    return jsonify({"incompleteTransactions": t})

@api.route('/test')
def test():
    u = User.get_by_username('rami')
    wallet = Wallet()
    wallet.create_wallet(u)
    return wallet.key
