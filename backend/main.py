from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/api/get', methods = ["GET"])
def chat():
    data = request.args.get('text')
    response = query({
	  "inputs": {
		"text": data
	}})
    return response

API_KEY = os.getenv('API_KEY')
API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill"
headers = {"Authorization": f'Bearer {API_KEY}'}
def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()


if __name__ == '__main__':
    app.run(debug=True)