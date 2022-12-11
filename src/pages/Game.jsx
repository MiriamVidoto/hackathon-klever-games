import React, { useEffect, useState, useContext } from 'react';
import '../App.css';
import klever from '../providers/klever';
import paperRight from '../images/paper-right.png';
import paperLeft from '../images/paper-left.png';
import rockRight from '../images/rock-right.png';
import rockLeft from '../images/rock-left.png';
import scissorRight from '../images/scissors-right.png';
import scissorLeft from '../images/scissors-left.png';
import GameContext from '../context/GameContext';
import Header from '../components/Header/Header';

const Game = () => {
  const { balance, setBalance } = useContext(GameContext);
  const [rewardButton, setRewardButton] = useState(false);
  const [error, setError] = useState('');
  const [kleverConnected, setKleverConnected] = useState(false);
  const [toogle, setToogle] = useState(false);
  const [userChoice, setUserChoice] = useState(null);
  const [botChoice, setbotChoice] = useState(null);
  const [result, setResult] = useState('');
  let [attempts, setAttempts] = useState(3);
  let [score, setScore] = useState(0);
  const [winner, setWinner] = useState(null);
  const choices = ['rock', 'paper', 'scissors'];

  const imagesRight = {
    rock: rockRight,
    paper: paperRight,
    scissors: scissorRight,
  };

  const imagesLeft = {
    rock: rockLeft,
    paper: paperLeft,
    scissors: scissorLeft,
  };

  useEffect(() => {
    const connectToKlever = async () => {
      const address = await klever.connectWithSdk();
      if (!address.startsWith('klv')) {
        setError(address);
      }

      setKleverConnected(true);
      setAddress(klever.address);
      await fetchBalance();
    };

    connectToKlever();
  }, []);

  useEffect(() => {
    const mainResult = () => {
      switch (userChoice + botChoice) {
        case 'paperrock':
        case 'rockscissors':
        case 'scissorspaper':
          setResult('Você ganhou!');
          setScore((score += 1));
          break;
        case 'paperscissors':
        case 'scissorsrock':
        case 'rockpaper':
          setResult('Você perdeu!');
          break;
        case 'rockrock':
        case 'paperpaper':
        case 'scissorsscissors':
          setResult('Empate!');
          break;
        default:
          return null;
      }
    };
    mainResult();
  }, [toogle]);

  const fetchBalance = async () => {
    const amount = await klever.balance();
    const currencyNormalizeMultiplier = Math.pow(10, 6);

    setBalance(amount / currencyNormalizeMultiplier);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setBalance(balance + 3);
    setRewardButton(true);
  };

  const handleClick = value => {
    setUserChoice(value);
    const randomChoice = choices[Math.floor(Math.random() * 3)];
    setAttempts((attempts -= 1));
    setbotChoice(randomChoice);
    if (attempts === 0) {
      checkResult();
    }
    setToogle(!toogle);
  };

  const PlayAgain = () => {
    setBalance(balance - 1);
    setWinner(null);
    setScore(0);
    setAttempts(3);
    setResult('');
    setUserChoice(null);
  };

  const checkResult = () => {
    if (score >= 2) {
      setWinner(true);
    } else {
      setWinner(false);
    }
  };

  if (winner) {
    return (
      <div className="feedback-positive">
        <Header />
        <div className="mt-[100px]">
          <p>Parabéns!</p>
          <form onSubmit={handleSubmit}>
            <p>Você ganhou 3 KLV</p>
            <button
              className="disable:bg-gray-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm 
          px-5 py-2.5 text-center text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium 
          rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700
           focus:ring-primary-800 transition ease-in-out delay-150 bg-[#AA33B5] hover:-translate-y-1
           hover:scale-110 hover:bg-purple-900 duration-300 mt-[26px] mb-[26px] text-[16px]"
              type="submit"
              disabled={rewardButton}
            >
              Receber Prêmios
            </button>
          </form>
        </div>
      </div>
    );
  }
  if (winner === false) {
    return (
      <div className="feedback-negative">
        <Header />
        <div className="mt-[100px]">
          <p>Você perdeu!</p>
          <p>Volte amanhã para jogar novamente</p>
          <p>ou</p>
          <button
            className="disable:bg-gray-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm 
          px-5 py-2.5 text-center text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium 
          rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700
           focus:ring-primary-800 transition ease-in-out delay-150 bg-[#AA33B5] hover:-translate-y-1
           hover:scale-110 hover:bg-purple-900 duration-300 mt-[26px] mb-[26px]"
            onClick={PlayAgain}
          >
            Jogue novamente por 1 KLV
          </button>
        </div>
        {/* <p>
          <b>Saldo atual:</b> {balance} KLV
        </p> */}
      </div>
    );
  }
  return (
    <div className="game-container">
      <Header />
      <h1 className="title">Pedra, papel, tesoura</h1>
      <div>
        <div className="game-info">
          <div className="score-container pt-3">
            <p className="text">Placar</p>
            <p className="text">{score}</p>
          </div>
          <div className="attempts-container pt-3">
            <p className="text">Tentativas</p>
            <p className="text">{attempts}</p>
          </div>
        </div>
        <div className="options-container">
          <button
            onClick={() => handleClick('paper')}
            className="button-options"
          >
            <img src={paperRight} className="paperImage" />
          </button>
          <button
            onClick={() => handleClick('rock')}
            className="button-options"
          >
            <img src={rockRight} className="paperImage" />
          </button>
          <button
            onClick={() => handleClick('scissors')}
            className="button-options"
          >
            <img src={scissorRight} className="paperImage" />
          </button>
        </div>
        {userChoice !== null ? (
          <div className="choice-container">
            <div className="choice">
              <p>Adversário</p>
              <img src={imagesLeft[botChoice]} />
            </div>
            <div className="choice">
              <p>Você</p>
              <img src={imagesRight[userChoice]} />
            </div>
          </div>
        ) : null}
        <p className="result-text">{result}</p>
      </div>
    </div>
  );
};

export default Game;
