import React, { useState, useEffect } from 'react';

import RadioButtons from './components/RadioButtons/RadioButtons';

import './App.css';

function App() {

  const [flags, setFlags] = useState([]);
  const apiUrl = 'https://restcountries.eu/rest/v2/all?fields=name;flag;';

  const getRandomNumbers = () => {

    const randNums = [];
    const NUM_RAND_NUMS = 4;
    const TOTAL_NUM_FLAGS = 250;

    for (let i = 0; i < NUM_RAND_NUMS; i++) {
      let randNum = Math.floor(Math.random() * TOTAL_NUM_FLAGS);
      if (randNums.includes(randNum)) {
        --i;
        continue;
      }
      randNums.push(randNum);
    }

    return randNums;

  };

  useEffect(() => {

    const getRandomFlags = flags => {
      const randNums = getRandomNumbers();
      return [flags[randNums[0]], flags[randNums[1]], flags[randNums[2]], flags[randNums[3]]];
    };

    fetch(apiUrl)
      .then(res => res.json())
      .then(flags => {
        setFlags(getRandomFlags(flags));
      })
      .catch(err => console.error(err));

  }, []);

  return (
    <main className="app">
      <h1 className="app__title">Guess The Flag!</h1>
      <figure className="app__flag-img-wrapper">
        {flags.length ? <img className="app__flag-img" src={flags[0].flag} alt="flag of Afganistan" /> : 'Loading...'}
      </figure>
      <form className="app__guess-flag-form">
        <RadioButtons flags={flags} />
        <button className="app__guess-btn" type="submit" >Guess</button>
      </form>
    </main>
  );
}

export default App;
