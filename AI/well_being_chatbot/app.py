# AI/well_being_chatbot/app.py
from flask import Flask, request, jsonify
from well_being import AIConvo
from flask_cors import CORS
from whisper import *
import os

app = Flask(__name__)
CORS(app)
ai_convo = AIConvo()

model = whisper.load_model("turbo")

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

@app.route('/transcribe-audio', methods=['POST'])
def transcribe_audio():
    try:
        # Check if file is included in the request
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request'}), 400

        file = request.files['file']

        # Save the file temporarily
        file_path = os.path.join('temp', file.filename)
        os.makedirs('temp', exist_ok=True)
        file.save(file_path)

        # Use Whisper to transcribe the audio
        model = whisper.load_model("base")
        result = model.transcribe(file_path)
        transcription = result['text']
        # Clean up
        os.remove(file_path)
        ai_reply = ai_convo.log_response(transcription)
        return jsonify({'transcription': transcription, 'reply': ai_reply}), 200
    except Exception as e:
        # Log the error for debugging
        print(f"Error occurred: {e}")
        return jsonify({'error': str(e)}), 500


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