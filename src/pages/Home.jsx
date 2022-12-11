import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import GameImg from '../images/game.png';
import kleverCoin from '../images/klever-coin.png';
import memoryCard from '../images/memorycard2.png';

function Home() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="games-choice">
        <div className="group relative bg-primary-600 transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-110 hover:bg-primary-700 duration-300 rounded">
          <Link to="/rps">
            <div
              className="min-h-80 aspect-w-1 aspect-h-1
                  overflow-hidden rounded-md bg-[#171833] border-solid border-2  border-b-white  lg:aspect-none lg:h-80 w-[300px] m-4"
            >
              <img
                src={GameImg}
                alt="op"
                className="h-[300px] group-hover: w-[300px]
                      object-cover object-center lg:h-full lg:w-full"
              />
            </div>
          </Link>
          <h2 className="antialiased text-center font-bold tracking-tight text-[24px] mt-8 text-white">
            Pedra, papel. tesoura
          </h2>
        </div>
        <div className="group relative bg-primary-600 transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-110 hover:bg-primary-700 duration-300 rounded">
          <Link to="/scratchcard">
            <div
              className="min-h-80 aspect-w-1 aspect-h-1 w-[300px]
                  overflow-hidden rounded-md bg-[#171833] border-solid border-2 border-b-white lg:aspect-none lg:h-80 m-4"
            >
              <img
                src={kleverCoin}
                alt="op"
                className="h-[300px] group-hover: w-[300px]
                      object-cover object-center lg:h-full lg:w-full"
              />
            </div>
          </Link>
          <h2 className="antialiased text-center font-bold tracking-tight text-white-900 text-[24px] mt-8 text-red-50">
            Raspadinha
          </h2>
        </div>
        <div className="group relative bg-primary-600 transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-110 hover:bg-primary-700 duration-300 rounded">
          <Link to="/memorygame">
            <div
              className="min-h-80 aspect-w-1 aspect-h-1 w-[300px]
                  overflow-hidden rounded-md bg-[#171833] border-solid border-2 border-b-white lg:aspect-none lg:h-80 m-4"
            >
              <img
                src={memoryCard}
                alt="op"
                className="h-[300px] group-hover: w-[300px]
                      object-cover object-center lg:h-full lg:w-full"
              />
            </div>
          </Link>
          <h2 className="antialiased text-center font-bold tracking-tight text-white-900 text-[24px] mt-8 text-red-50">
            Jogo da memória
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
