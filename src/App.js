import React from 'react';

import RadioButtons from './components/RadioButtons/RadioButtons';

import './App.css';

function App() {
  return (
    <main className="app">
      <h1 className="app__title">Guess The Flag!</h1>
      <figure className="app__flag-img-wrapper">
        <img className="app__flag-img" src="https://restcountries.eu/data/afg.svg" alt="flag of Afganistan" />
      </figure>
      <RadioButtons />
      <button className="app__guess-btn" type="button" >Guess</button>
    </main>
  );
}

export default App;