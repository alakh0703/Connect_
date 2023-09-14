import React, { useState, useEffect } from 'react';
import './MessageBox.css';

function MessageBox({ message, duration }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration || 3000);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  return (
    <div className={`mb_main ${visible ? 'show' : ''}`}>{message}</div>
  );
}

export default MessageBox;
