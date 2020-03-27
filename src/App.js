import React, { useState, useEffect } from 'react';

import RadioButtons from './components/RadioButtons/RadioButtons';

import './App.css';

function App() {

  const [flags, setFlags] = useState([]);
  const [answerFlag, setAnswerFlag] = useState({});

  const apiUrl = 'https://restcountries.eu/rest/v2/all?fields=name;flag;';

  const getRandomNumbers = (maxNum, numRandNums) => {

    const randNums = [];

    for (let i = 0; i < numRandNums; i++) {
      let randNum = Math.floor(Math.random() * maxNum);
      if (randNums.includes(randNum)) {
        --i;
        continue;
      }
      randNums.push(randNum);
    }

    return randNums;

  };

  useEffect(() => {

    const TOTAL_NUM_FLAGS = 250;
    const NUM_RAND_FLAGS = 4;

    const getRandomFlags = flags => {
      const randNums = getRandomNumbers(TOTAL_NUM_FLAGS, NUM_RAND_FLAGS);
      return [flags[randNums[0]], flags[randNums[1]], flags[randNums[2]], flags[randNums[3]]];
    };

    fetch(apiUrl)
      .then(res => res.json())
      .then(flags => {
        const randomFlags = getRandomFlags(flags);
        setFlags(randomFlags);
        setAnswerFlag(randomFlags[Math.floor(Math.random() * NUM_RAND_FLAGS)]);
      })
      .catch(err => console.error(err));

  }, []);

  return (
    <main className="app">
      <h1 className="app__title">Guess The Flag!</h1>
      <figure className="app__flag-img-wrapper">
        {flags.length ? <img className="app__flag-img" src={flags[0].flag} alt={`The flag of ${flags[0].name}`} /> : 'Loading...'}
      </figure>
      <form className="app__guess-flag-form">
        <RadioButtons flags={flags} />
        <button className="app__guess-btn" type="submit" >Guess</button>
      </form>
    </main>
  );
}

export default App;
