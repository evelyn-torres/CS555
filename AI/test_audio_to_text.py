import unittest
from unittest.mock import patch, mock_open, MagicMock
from Audio_To_Text import transcribe_audio

class TestAudioToText(unittest.TestCase):

    @patch("whisper.load_model")
    @patch("builtins.open", new_callable=mock_open)
    def test_transcribe_audio_english(self, mock_file, mock_load_model):
        mock_model = MagicMock()
        mock_model.transcribe.return_value = {"text": "This is a test transcription."}
        mock_load_model.return_value = mock_model

        transcribe_audio(input_file="dummy_audio.mp3", output_file="dummy_transcription.txt", language="en")
        mock_file().write.assert_called_with("This is a test transcription.")

    @patch("whisper.load_model")
    @patch("builtins.open", new_callable=mock_open)
    def test_transcribe_audio_spanish(self, mock_file, mock_load_model):
        mock_model = MagicMock()
        mock_model.transcribe.return_value = {"text": "Esta es una transcripción de prueba."}
        mock_load_model.return_value = mock_model

        transcribe_audio(input_file="dummy_audio.mp3", output_file="dummy_transcription.txt", language="es")
        mock_file().write.assert_called_with("Esta es una transcripción de prueba.")

    @patch("whisper.load_model")
    @patch("builtins.open", new_callable=mock_open)
    def test_transcribe_audio_chinese(self, mock_file, mock_load_model):
        mock_model = MagicMock()
        mock_model.transcribe.return_value = {"text": "这是一个测试记录。"}
        mock_load_model.return_value = mock_model

        transcribe_audio(input_file="dummy_audio.mp3", output_file="dummy_transcription.txt", language="zh")
        mock_file().write.assert_called_with("这是一个测试记录。")

    @patch("whisper.load_model")
    @patch("builtins.open", new_callable=mock_open)
    def test_transcribe_audio_korean(self, mock_file, mock_load_model):
        mock_model = MagicMock()
        mock_model.transcribe.return_value = {"text": "이것은 테스트 전사입니다."}
        mock_load_model.return_value = mock_model

        transcribe_audio(input_file="dummy_audio.mp3", output_file="dummy_transcription.txt", language="ko")
        mock_file().write.assert_called_with("이것은 테스트 전사입니다.")

if __name__ == "__main__":
    unittest.main()
