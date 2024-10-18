import React, { useEffect, useState } from 'react';

const WelcomeMessage = ({ isLoggedIn }) => {
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
     
      const audio = new Audio('https://path-to-audio-file/audio.mp3');
      setAudio(audio);
      
      
      audio.play();
    }
  }, [isLoggedIn]);

  return (
    <div>
      {isLoggedIn && (
        <div>
          <h1>Welcome! You have logged in successfully.</h1>
        </div>
      )}
    </div>
  );
};

export default WelcomeMessage;
