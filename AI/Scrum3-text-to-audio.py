#pip install gTTS playsound
from gtts import gTTS
import os
import playsound

class TextToSpeech:
    def __init__(self, language='en'):
        self.language = language
        self.audio_file = "response.mp3"

    def text_to_audio(self, text):
        # Converts text to speech
        tts = gTTS(text=text, lang=self.language, slow=False)
        tts.save(self.audio_file)
        self.play_audio()

    def play_audio(self):
        # Plays the audio file
        playsound.playsound(self.audio_file)

    def stop_audio(self):
        # Stops audio by removing the audio file 
        if os.path.exists(self.audio_file):
            os.remove(self.audio_file)

    def change_language(self, language_code):
        # Updates the language for TTS
        self.language = language_code

# Example 
if __name__ == "__main__":
    tts_bot = TextToSpeech(language='en')
    user_response = "Hello, this is a test message from the AI model."
    tts_bot.text_to_audio(user_response)

    # To change language and replay
    tts_bot.change_language('es')
    tts_bot.text_to_audio("Hola, este es un mensaje de prueba del modelo de IA.")
