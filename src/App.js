import React from 'react';

import RadioButtons from './components/RadioButtons/RadioButtons';
import ResultMessage from './components/ResultMessage/ResultMessage';
import GameSubmitButton from './components/GameSubmitButton/GameSubmitButton';
import PlayAgainButton from './components/PlayAgainButton/PlayAgainButton';

import './App.css';

class App extends React.Component {

  state = {
    flags: [],
    answerFlag: {},
    isGuessing: true,
    result: {
      result: null,
      userGuess: null,
    },
  };

  getRandomNumbers(maxNum, numRandNums) {

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

  }

  fetchAndSetFlags() {
    
    const TOTAL_NUM_FLAGS = 250;
    const NUM_RAND_FLAGS = 4;
    
    const apiUrl = 'https://restcountries.eu/rest/v2/all?fields=name;flag;';

    const getRandomFlags = flags => {
      const randNums = this.getRandomNumbers(TOTAL_NUM_FLAGS, NUM_RAND_FLAGS);
      return [flags[randNums[0]], flags[randNums[1]], flags[randNums[2]], flags[randNums[3]]];
    };

    fetch(apiUrl)
      .then(res => res.json())
      .then(flags => {
        const randomFlags = getRandomFlags(flags);
        this.setState(state => {
          const answerFlag = randomFlags[Math.floor(Math.random() * NUM_RAND_FLAGS)];
          return {
            flags: randomFlags,
            answerFlag,
          };
        });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.fetchAndSetFlags();
  }

  handleUserGuess = e => {
    e.preventDefault();
    var data = new FormData(e.target);
    const userGuess = data.get('flags');
    if (!userGuess) return;
    this.setState(state => {
      return {
        isGuessing: false,
        result: {
          result: userGuess === state.answerFlag.name,
          guess: userGuess,
        },
      };
    });
  };

  handleResetGame = () => {
    this.setState(state => {
      return {
        isGuessing: true,
        result: {
          result: null,
          guess: null,
        },
        flags: [],
      };
    });
    this.fetchAndSetFlags();
  };

  render() {
    return (
      <main className="app">
        <h1 className="app__title">Guess The Flag!</h1>
        <figure className="app__flag-img-wrapper">
          {this.state.flags.length ? <img className="app__flag-img" src={this.state.answerFlag.flag} alt={`The flag of ${this.state.answerFlag.name}`} /> : 'Loading...'}
        </figure>
        <form className="app__guess-flag-form" onSubmit={this.handleUserGuess}>
          {this.state.isGuessing ? <RadioButtons flags={this.state.flags} /> : <ResultMessage result={this.state.result} answerFlag={this.state.answerFlag} />}
          {this.state.isGuessing ? <GameSubmitButton /> : <PlayAgainButton onClick={this.handleResetGame} />}
        </form>
      </main>
    );  
  }
  
}

export default App;
