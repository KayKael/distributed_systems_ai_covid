import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios.get('http://localhost:5000/data');
    setData(result.data);
  };

  const handlePredict = async () => {
    const result = await axios.post('http://localhost:5000/predict', data);
    setPredictions(result.data);
  };

  return (
    <div className="App">
      <h1>Covid-19 Dashboard</h1>
      <button onClick={handlePredict}>Predict</button>
      <div>
        <h2>Data</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <div>
        <h2>Predictions</h2>
        <pre>{JSON.stringify(predictions, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
