import React, { useState, useEffect } from 'react';
import '../styles/ChatBotUI.css';

const ChatBotUIComp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  // Fetch the initial question from the backend on component load
  useEffect(() => {
    fetch("http://localhost:5000/start")
      .then((response) => response.json())
      .then((data) => {
        setMessages([{ sender: 'ai', text: data.reply }]);
      })
      .catch((error) => console.error('Error fetching initial question:', error));
  }, []);

  // Handle sending user input to the backend
  const handleSend = () => {
    if (input.trim()) {
      // Append user message
      setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: input }]);

      // Clear input
      setInput('');

      // Send the user response to the backend
      fetch("http://localhost:5000/response", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response: input }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Append full AI reply
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'ai', text: data.reply },
          ]);
        })
        .catch((error) => console.error('Error sending response:', error));
    }
  };

  // Handle pressing Enter key
  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  // Start audio recording
  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      let audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        setAudioBlob(audioBlob);
        uploadAudio(audioBlob); // Automatically upload the audio after recording
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
        // Append transcription and AI reply to messages
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'user', text: data.transcription },
          { sender: 'ai', text: data.reply.reply },
        ]);
      }
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  // Render messages
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
        <button onClick={startRecording} disabled={isRecording} className="record-button">
          {isRecording ? 'Recording...' : 'Start Recording'}
        </button>
      </div>
    </div>
  );
};

export default ChatBotUIComp;
