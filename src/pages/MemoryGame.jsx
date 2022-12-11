import React, { useContext, useEffect, useState } from 'react';
import Card from '../components/Card/Card.jsx';
import Header from '../components/Header/Header.jsx';
import GameContext from '../context/GameContext.jsx';
import Icon01 from '../images/memoryGame/memoryIcon01.png';
import Icon02 from '../images/memoryGame/memoryIcon02.png';
import Icon03 from '../images/memoryGame/memoryIcon03.png';
import Icon04 from '../images/memoryGame/memoryIcon04.png';
import Icon05 from '../images/memoryGame/memoryIcon05.png';
import Icon06 from '../images/memoryGame/memoryIcon06.png';

const initialCards = [
  { src: Icon01, matched: false },
  { src: Icon02, matched: false },
  { src: Icon03, matched: false },
  { src: Icon04, matched: false },
  { src: Icon05, matched: false },
  { src: Icon06, matched: false },
];

function MemoryGame() {
  const { balance, setBalance } = useContext(GameContext);
  const [cards, setCards] = useState([]);
  const [rewardButton, setRewardButton] = useState(false);
  const [turn, setTurn] = useState(8);
  const [score, setScore] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [endGame, setEndGame] = useState(false);
  const [winner, setWinner] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [startFlip, setStartFlip] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStartFlip(false);
    }, 1000);
    shuffleCards();
  }, []);

  function shuffleCards() {
    const shuffledCards = [...initialCards, ...initialCards]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurn(8);
    setDisabled(false);
    setStartFlip(true);
    setTimeout(() => {
      setStartFlip(false);
    }, 1000);
  }

  function handleChoice(card) {
    choiceOne
      ? choiceOne.id !== card.id && setChoiceTwo(card)
      : setChoiceOne(card);
  }

  const checkChances = () => {
    if (turn === 1 || score === 6) {
      setDisabled(true);
      setWinner(true);
      checkResult();
    }
  };

  const checkResult = () => {
    if (score === 6) {
      setWinner(true);
    }
    setWinner(false);
  };

  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn(prevTurn => prevTurn - 1);
    setDisabled(false);
  }

  const PlayAgain = () => {
    setBalance(balance - 1);
    setWinner(null);
    setScore(0);
    setTurn(8);
    setUserChoice(null);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setScore(score + 1);
        checkChances();
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        checkChances();
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const handleSubmit = async e => {
    e.preventDefault();
    setBalance(balance + 3);
    setRewardButton(true);
  };

  if (winner) {
    return (
      <div className="feedback-positive">
        <Header />
        <div className="mt-[100px]">
          <p className="memory-text">Parabéns!</p>
          <form onSubmit={handleSubmit}>
            <p className="memory-text">Você ganhou 3 KLV</p>
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
            <p className="memory-text">
              <b>Saldo atual:</b> {balance} KLV
            </p>
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
    <div className="container">
      <Header />
      <div className="grid">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === choiceOne ||
              card === choiceTwo ||
              card.matched ||
              startFlip
            }
            disabled={disabled}
            matched={card.matched}
          />
        ))}
      </div>
      <p
        className="disable:bg-gray-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm 
          px-5 py-2.5 text-center text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium 
          rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600
           bg-[#AA33B5] mt-[26px] mb-[26px] text-[16px]"
      >
        Chances: {turn}
      </p>
    </div>
  );
}

export default MemoryGame;
