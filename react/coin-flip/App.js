import React, { useState } from 'react';
import './App.css';

function App() {
  const [side, setSide] = useState(null); // 'heads' or 'tails'
  const [flipping, setFlipping] = useState(false);
  const [counts, setCounts] = useState({ heads: 0, tails: 0 });

  const flipCoin = () => {
    if (flipping) return;

    setFlipping(true);

    setTimeout(() => {
      const result = Math.random() < 0.5 ? 'heads' : 'tails';
      setSide(result);
      setCounts(prev => ({
        ...prev,
        [result]: prev[result] + 1,
      }));
      setFlipping(false);
    }, 1000); // simulate flipping delay
  };

  const getImageSrc = () => {
    if (side === 'heads') return '/heads.png';
    if (side === 'tails') return '/tails.png';
    return '';
  };

  return (
    <div className="App">
      <h1>🪙 Coin Flip Game</h1>

      <div className={`coin ${flipping ? 'flip' : ''}`}>
        {side && <img src={getImageSrc()} alt={side} className="coin-img" />}
      </div>

      <button onClick={flipCoin} disabled={flipping}>
        {flipping ? 'Flipping...' : 'Flip Coin'}
      </button>

      <div className="results">
        <p>Heads: {counts.heads}</p>
        <p>Tails: {counts.tails}</p>
      </div>
    </div>
  );
}

export default App;