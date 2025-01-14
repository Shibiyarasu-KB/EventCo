from flask import Flask, render_template, request, session, jsonify
from pymongo import MongoClient
import bcrypt
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = os.urandom(24)

# MongoDB connection
client = MongoClient('mongodb+srv://sampleR:sampleR@cluster0.ljwn3ub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['Eventco']
users_collection = db['Users']

# Route to render index.html
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle login
@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')
    password = request.form.get('password').encode('utf-8')

    if not email or not password:
        return render_template('index.html', alert_message="Email and password are required.")

    user = users_collection.find_one({'email': email})
    if user and bcrypt.checkpw(password, user['password']):
        session['email'] = email
        return render_template('index.html', alert_message="Login successful.")
    return render_template('index.html', alert_message="Invalid credentials.")

    
    

# Route to handle signup
@app.route('/signup', methods=['POST'])
def signup():
    name = request.form.get('name')
    email = request.form.get('email')
    password = request.form.get('password')
    dob = request.form.get('dob')
    phone = request.form.get('phone')
    institution_type = request.form.get('institutionType')

    if not all([name, email, password, dob, phone, institution_type]):
        return render_template('index.html', alert_message="All fields are required.")

    if users_collection.find_one({'email': email}):
        return render_template('index.html', alert_message="Email already exists.")

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    users_collection.insert_one({
        'name': name,
        'email': email,
        'password': hashed_password,
        'dob': dob,
        'phone': phone,
        'institution_type': institution_type
    })

    return render_template('index.html', alert_message="Signup successful.")

# Route to fetch dynamic fields for forms
@app.route('/get_form_fields', methods=['GET'])
def get_form_fields():
    institution_type = request.args.get('institutionType')
    options = []
    if institution_type == 'school':
        options = ['LKG', 'UKG'] + [str(i) for i in range(1, 13)]
    elif institution_type == 'college':
        options = [f'Year {i}' for i in range(1, 6)]

    return jsonify(options)

# Route to handle countdown data
@app.route('/get_countdown', methods=['GET'])
def get_countdown():
    event_time = request.args.get('eventTime')
    print(event_time)
    if not event_time:
        return jsonify({'message': 'Invalid event time.'})

    try:
        event_date = datetime.strptime(event_time, '%Y-%m-%dT%H:%M:%S')
    except ValueError:
        return jsonify({'message': 'Invalid date format. Use YYYY-MM-DDTHH:MM:SS.'})

    now = datetime.now()
    if event_date >= now:
        remaining = event_date - now
        return jsonify({
            'days': remaining.days,
            'hours': remaining.seconds // 3600,
            'minutes': (remaining.seconds % 3600) // 60,
            'seconds': remaining.seconds % 60
        })
    return jsonify({'message': 'Event Started!'})

if __name__ == '__main__':
    app.run(debug=True)
