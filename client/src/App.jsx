import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('Connecting to server...');

  useEffect(() => {
    axios.get('http://localhost:5000/api/test')
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage('Error connecting to backend server!'));
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center' }}>
      <h1>🎉 Wedding Logistics & Function Manager</h1>
      <p style={{ fontSize: '1.2rem', color: '#4a5568' }}>
        Backend Status: <strong>{message}</strong>
      </p>
    </div>
  );
}

export default App;