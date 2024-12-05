import React, { useState } from 'react';
import '../styles/ChatBotUI.css';

const ChatBotUI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      let audioChunks = [];

      console.log('MediaRecorder started:', mediaRecorder);

      mediaRecorder.ondataavailable = (event) => {
        console.log('ondataavailable event:', event);
        if (event.data.size > 0) {
          audioChunks.push(event.data);
          console.log('Chunk added:', event.data);
        }
      };

      mediaRecorder.onstart = () => {
        console.log('Recording started');
      };

      mediaRecorder.onstop = () => {
        console.log('Recording stopped');
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        console.log('Audio blob created:', audioBlob);
        setAudioBlob(audioBlob);
      };

      mediaRecorder.onerror = (error) => {
        console.error('MediaRecorder error:', error);
      };

      mediaRecorder.start();
      setIsRecording(true);

      setTimeout(() => {
        mediaRecorder.stop();
        setIsRecording(false);
      }, 5000); // Stops recording after 5 seconds
    }).catch((error) => {
      console.error('Error accessing microphone:', error);
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const uploadAudio = async () => {
    if (!audioBlob) {
      console.error('No audio file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.mp3');

    try {
      const response = await fetch('http://localhost:5000/transcribe-audio', {
        method: 'POST',
        body: formData,
      })
      .then((response) => response.json())
      .then((data) => {
        // Append full AI reply
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'ai', text: data.reply.reply }, // Adjusted to use the full reply
        ]);
      })
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error from server:', errorResponse.error);
      } else {
        const data = await response.json();
        console.log('Transcription:', data.transcription);
      }
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');

      // Simulate AI response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'ai', text: 'This is an AI response' },
        ]);
      }, 1000);
    }
  };
  const handleEnter = (event) =>{
    if(event.key ==='Enter'){
      handleSend();
    }
  }

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
          onKeyDown={handleEnter}
        />
        <button onClick={handleSend} className="send-button">Send</button>
        <button onClick={startRecording} disabled={isRecording}>
          {isRecording ? "Recording..." : "Start Recording"}
        </button>
        {isRecording && <button onClick={stopRecording}>Stop Recording</button>}
        <button onClick={uploadAudio} disabled={!audioBlob}>
        Upload Audio
      </button>
      </div>
    </div>
  );
};

export default ChatBotUI;
