import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Button = () => {
  const [score, setScore] = useState(0);
  const [prizes, setPrizes] = useState(0);
  const [message, setMessage] = useState('');

  // const API_BASE_URL = 'http://localhost:4000';  // Define your backend API port here
  const API_BASE_URL = 'https://cookie-clicker-game-backend.onrender.com';  // Define your backend API port here
  useEffect(() => {
    // Fetch player data when the component mounts
    axios.get(`${API_BASE_URL}/api/player`)
      .then(response => {
        setScore(response.data.score);
        setPrizes(response.data.prizesWon);
      });
  }, []);

  const handleClick = async () => {
    const response = await axios.post(`${API_BASE_URL}/api/click`);
    const { message, score, prizesWon } = response.data;
    setMessage(message);
    setScore(score);
    setPrizes(prizesWon);
  };

  return (
    <div className="container text-center mt-5">
    <h1 className="display-4 text-primary">Cookie Clicker Game</h1>
    <p className="lead">Score: {score}</p>
    <p className="lead">Prizes Won: {prizes}</p>
    <button 
      className="btn btn-lg btn-success" 
      onClick={handleClick}
    >
      Click Me!
    </button>
    <p className="mt-3 text-muted">{message}</p>
  </div>
  );
};

export default Button;
