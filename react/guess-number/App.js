import React, { useState } from 'react';

function App() {
  const [number, setNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(guess) === number) {
      setMessage('Congratulations! You guessed the correct number.');
    } else if (parseInt(guess) < number) {
      setMessage('Too low! Try again.');
    } else {
      setMessage('Too high! Try again.');
    }
  };

  return (
    <div>
      <h1>Guess the Number Game</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="number" 
          value={guess} 
          onChange={handleChange} 
          placeholder="Enter your guess" 
        />
        <button type="submit">Guess</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;