import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const askQuestion = async () => {
    if (!userInput.trim()) {
      return;
    }

    addToConversation({ role: 'user', message: userInput });

    try {
      const response = await axios.post('http://localhost:5083/ask', { userInput });
      const assistantResponse = response.data.assistantResponse;
      addToConversation({ role: 'assistant', message: assistantResponse });
    } catch (error) {
      console.error('Error:', error.message || error.response.data.error);
      addToConversation({ role: 'assistant', message: 'Sorry, an error occurred while processing your request.' });
    }

    setUserInput('');
  };

  const addToConversation = (messageObj) => {
    setConversation(prevConversation => [...prevConversation, messageObj]);
  };

  useEffect(() => {
    // Scroll to the bottom of the conversation when it updates
    const conversationDiv = document.getElementById('conversation');
    if (conversationDiv) {
      conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }
  }, [conversation]);

  return (
    <div className="App" style={{ width: '100%',
     height: '87%',
     display: 'flex', flexDirection: 'column',position:"fixed" ,backgroundColor: '#f4f4f4' }}>
      <div id="conversation" style={{ flex: 1, overflowY: 'auto', padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
        {conversation.map((messageObj, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', backgroundColor: messageObj.role === 'user' ? '#4caf50' : '#2196f3', color: 'white' }}>
            {messageObj.message}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', padding: '10px' }}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your question..."
          style={{ flex: 1, padding: '8px', marginRight: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={askQuestion} style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#2196f3', color: 'white', cursor: 'pointer' }}>Ask</button>
      </div>
    </div>
  );
}

export default App;
