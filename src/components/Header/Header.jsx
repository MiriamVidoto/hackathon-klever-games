import React, { useContext } from 'react';
import GameContext from '../../context/GameContext';
import './Header.css';
import home from '../../images/home-no-bg.png';
import { Link } from 'react-router-dom';
import logoGame from '../../images/2.png';

function Header() {
  const { balance } = useContext(GameContext);
  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <img src={home} className="home" />
        </Link>
        <img className="app-title" src={logoGame} />
        <div className="wallet-balance">
          <p className="saldo">Saldo atual</p>
          <p className="saldo">{balance}</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
