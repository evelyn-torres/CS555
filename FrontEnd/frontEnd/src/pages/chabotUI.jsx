import React, { useState, useEffect } from 'react';
import '../styles/ChatBotUI.css';

const ChatBotUIComp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

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
          { sender: 'ai', text: data.reply }, // Adjusted to use the full reply
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
      </div>
    </div>
  );
};

export default ChatBotUIComp;