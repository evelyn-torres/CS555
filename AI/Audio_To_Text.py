# Before running the script run this command in terminal:
# pip install -U openai-whisper

# Change the audioPath to the path of whatever audio file you want transcribed

import whisper

audioPath = "./sample.mp3"

model = whisper.load_model("turbo")
result = model.transcribe(audioPath)
print(result["text"])
