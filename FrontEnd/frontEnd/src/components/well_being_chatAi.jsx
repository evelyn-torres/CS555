import React from 'react';

const WellBeingChatAI = () => {
  return (
    console.log("WellBeingChatAI component is rendering"),
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={cardBodyStyle}>
          <h3 style={textStyle}>ChatBox</h3>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f0f0f0',
};

const cardStyle = {
  width: '300px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  backgroundColor: '#fff',
};

const cardBodyStyle = {
  padding: '16px',
};

const textStyle = {
  margin: '0',
  fontSize: '24px',
  fontWeight: 'bold',
};

export default WellBeingChatAI;
