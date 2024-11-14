import React, { useState } from 'react';
import '../styles/ChatBotUI.css';


const ChatBotUI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');


  //Bad Smell #1: Duplicated Code (handleEnter and handleSend)
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

   return ( //Bad smell #2: Really long inline callback logic in the return funcition
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
      </div>
    </div>
  );
};

export default ChatBotUI;
