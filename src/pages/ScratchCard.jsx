import React, { useEffect, useState, useContext } from 'react';
import ScratchCard from 'react-scratchcard-v2';
import Header from '../components/Header/Header';
import GameContext from '../context/GameContext';
import kleverCard from '../images/klever-logo.png';

export default function ScratchCardPage() {
  const { balance, setBalance } = useContext(GameContext);
  const [randomReward, setRandomReward] = useState();

  const handleRandomReward = () => {
    setRandomReward(Math.floor(Math.random() * 9) + 1);
  };

  useEffect(() => {
    handleRandomReward();
  }, []);

  return (
    <div>
      <Header />
      <div className="image-card">
        <ScratchCard
          width={280}
          height={280}
          image={kleverCard}
          onComplete={() => setBalance(balance + randomReward)}
        >
          <div className="card-container">
            <h1 className="card">{`Parabéns! Você acaba de ganhar ${randomReward} KLV!`}</h1>
          </div>
        </ScratchCard>
        <button
          onClick={() => window.location.reload(false)}
          className="mt-2 disable:bg-gray-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm 
          px-5 py-2.5 text-center text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium 
          rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700
           focus:ring-primary-800 transition ease-in-out delay-150 bg-[#AA33B5] hover:-translate-y-1
           hover:scale-110 hover:bg-indigo-400 duration-300"
        >
          Compre mais 1 card por 1KLV
        </button>
      </div>
    </div>
  );
}
