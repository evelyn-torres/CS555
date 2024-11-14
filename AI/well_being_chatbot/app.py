from flask import Flask, request, jsonify
from well_being_chatbot import get_responses  # Import your AI function

app = Flask(__name__)

@app.route('/get_response', methods=['POST'])
def get_ai_response():
    data = request.get_json()
    user_message = data.get('message')
    ai_response = get_responses(user_message)  # Call your AI function
    return jsonify({'response': ai_response})

if __name__ == '__main__':
    app.run(port=5000)  # Run on port 5000
