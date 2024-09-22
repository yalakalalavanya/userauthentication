from flask import Flask, request, jsonify, render_template
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# In-memory user store (for demonstration purposes)
users = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if username in users:
        return jsonify({"message": "Username already exists."}), 400
    
    # Hash the password and store it
    hashed_password = generate_password_hash(password)
    users[username] = hashed_password
    return jsonify({"message": "User registered successfully!"}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if username not in users:
        return jsonify({"message": "Invalid username or password."}), 401
    
    # Check the password
    hashed_password = users[username]
    if check_password_hash(hashed_password, password):
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"message": "Invalid username or password."}), 401

@app.route('/dashboard')
def dashboard():
    return "Welcome to the dashboard!"

if __name__ == '__main__':
    app.run(debug=True)
