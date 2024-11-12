# Before running the script run this command in terminal:
# pip install -U openai-whisper

import whisper

# Constants
DEFAULT_OUTPUT_FILE = 'transcription.txt'
MODEL_NAME = 'turbo'

def clear_output_file(output_file):
    # Clears the content of the specified output file.
    with open(output_file, 'w') as file:
        file.write('')

def transcribe_audio(model, input_file, language='en'):
    # Transcribes audio using the specified model.
    print(f"Processing audio file '{input_file}' with language: {language}...")
    result = model.transcribe(input_file, language=language)
    return result.get("text", "")

def save_transcription(transcription, output_file):
    # Saves the transcription to an output file.
    if transcription:
        with open(output_file, 'w') as file:
            file.write(transcription)
        print(f"Transcription saved to {output_file}")
    else:
        print("No transcription available.")

def transcribe_audio_file(input_file='audio.mp3', output_file=DEFAULT_OUTPUT_FILE, language='en'):
    # Main function to manage transcription flow.
    clear_output_file(output_file)
    model = whisper.load_model("turbo")
    transcription = transcribe_audio(model, input_file, language)
    save_transcription(transcription, output_file)

if __name__ == "__main__":
    transcribe_audio_file(input_file='audio.mp3', language='en')  # English
    # Change language='es', 'zh', or 'ko' for Spanish, Chinese, or Korean respectively.
