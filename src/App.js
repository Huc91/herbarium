import React, { useState } from 'react';

import Home from 'pages/Home'

import logo from './logo.svg';
import './App.css';

function App() {

  const [species, setSpecies] = useState('algae');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Herbarium</h1>
      </header>
      <nav>
        <button onClick={() => setSpecies('algae')} >Algae Neuronica</button>
        <button onClick={() => setSpecies('grass')}>Grass</button>
      </nav>
      <Home species={species}></Home>
    </div>
  );
}

export default App;
