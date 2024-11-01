# Before running the script run this command in terminal:
# pip install -U openai-whisper

import whisper

def transcribe_audio(input_file='audio.mp3', output_file='transcription.txt', language='en'):
    with open(output_file, 'w') as file:
        file.write('')  

    model = whisper.load_model("turbo")

    print(f"Processing audio with language: {language}...")

    result = model.transcribe(input_file, language=language)

    transcription = result.get("text", "")

    if transcription:
        with open(output_file, 'w') as file:
            file.write(transcription)
        print(f"Transcription saved to {output_file}")
    else:
        print("No transcription available.")

if __name__ == "__main__":
    transcribe_audio(input_file='audio.mp3', language='en')  # English
    # Change language='es', 'zh', or 'ko' for Spanish, Chinese, or Korean respectively.
