import React, { useState, useEffect } from 'react';
import '../styles/chatbotUI.css';

const ChatBotUIComp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  // Fetch the initial question from the backend on component load
  useEffect(() => {
    fetch("http://localhost:5000/start")
      .then((response) => response.json())
      .then((data) => {
        const aiMessage = { sender: 'ai', text: data.reply };
        setMessages([aiMessage]);
        speak(aiMessage.text); // Speak the AI's reply
      })
      .catch((error) => console.error('Error fetching initial question:', error));
  }, []);

  // Handle sending user input to the backend
  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput('');

      fetch("http://localhost:5000/response", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response: input }),
      })
        .then((response) => response.json())
        .then((data) => {
          const aiMessage = { sender: 'ai', text: data.reply };
          setMessages((prevMessages) => [...prevMessages, aiMessage]);
          speak(aiMessage.text); // Speak the AI's reply
        })
        .catch((error) => console.error('Error sending response:', error));
    }
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  // Start audio recording
  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      let audioChunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        setAudioBlob(audioBlob);
        uploadAudio(audioBlob);
      };

      recorder.start();
      setIsRecording(true);
      setMediaRecorder(recorder);
    }).catch((error) => {
      console.error('Error accessing microphone:', error);
    });
  };

  // Stop audio recording
  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  // Upload audio for transcription
  const uploadAudio = async (blob) => {
    if (!blob) {
      console.error('No audio file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', blob, 'audio.mp3');

    try {
      const response = await fetch('http://localhost:5000/transcribe-audio', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error from server:', errorResponse.error);
      } else {
        const data = await response.json();
        const userMessage = { sender: 'user', text: data.transcription };
        const aiMessage = { sender: 'ai', text: data.reply };

        setMessages((prevMessages) => [
          ...prevMessages,
          userMessage,
          aiMessage,
        ]);
        speak(aiMessage.text); // Speak the AI's reply
      }
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  // Text-to-Speech Function
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // Set language to English (US)
      speechSynthesis.speak(utterance);
    } else {
      console.error('Text-to-Speech not supported in this browser.');
    }
  };

  const renderMessages = () =>
    messages.map((message, index) => (
      <div
        key={index}
        className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
      >
        {message.text}
      </div>
    ));

  return (
    <div className="chatbot-container">
      <div className="chat-window">{renderMessages()}</div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
          onKeyDown={handleEnter}
        />
        <button onClick={handleSend} className="send-button">
          Send
        </button>
        {!isRecording ? (
          <button onClick={startRecording} className="record-button">
            Start Recording
          </button>
        ) : (
          <button onClick={stopRecording} className="stop-button">
            Stop Recording
          </button>
        )}

      </div>
    </div>
  );
};

export default ChatBotUIComp;