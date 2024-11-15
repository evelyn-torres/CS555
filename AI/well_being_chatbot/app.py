# AI/well_being_chatbot/app.py
from flask import Flask, request, jsonify
from well_being import AIConvo
#from flask_cors import CORS

app = Flask(__name__)
#CORS(app)
ai_convo = AIConvo()

@app.route('/ask', methods=['GET'])
def ask_question():
    # Start with "Hello, how are you?" if no responses have been logged
    if not ai_convo.get_responses():
        question = "Hello, how are you?"
    else:
        question = ai_convo.ask_other_questions()
    return jsonify({'question': question})

@app.route('/response', methods=['POST'])
def log_response():
    data = request.get_json()
    response = data.get('response', '')
    ai_convo.log_response(response)
    # Get a new follow-up question after logging the response
    next_question = ai_convo.ask_other_questions()
    return jsonify({'next_question': next_question})

if __name__ == '__main__':
    app.run(debug=True)
