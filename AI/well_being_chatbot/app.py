# AI/well_being_chatbot/app.py
from flask import Flask, request, jsonify
from well_being import AIConvo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
ai_convo = AIConvo()

@app.route("/start", methods=["GET"])
def start_conversation():
    return jsonify({"reply": "Hello, how are you feeling today?"})

@app.route("/ask", methods=["POST"])
def ask_question():
    user_input = request.json.get("response")
    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    # Log response and get AI's reply
    ai_reply = ai_convo.log_response(user_input)
    return jsonify({"reply": ai_reply})

@app.route('/response', methods=['POST'])

@app.route('/response', methods=['POST'])
def log_response():
    data = request.get_json()
    response = data.get('response', '')
    print(f"user input received: {response}")
    
    # Log the response and generate AI's reply
    ai_reply = ai_convo.log_response(response)  # Includes sentiment reply and follow-up
    
    print(f"AI response generated: {ai_reply}")
    return jsonify({'reply': ai_reply})  # Send combined reply to frontend


if __name__ == '__main__':
    app.run(debug=True)