import React, { useEffect, useState } from 'react';
import klever from '../providers/klever';
import PropTypes from 'prop-types';
import GameContext from './GameContext';

function GameProvider({ children }) {
  const [balance, setBalance] = useState();
  const [address, setAddress] = useState();
  const [kleverConnected, setKleverConnected] = useState(false);

  const fetchBalance = async () => {
    const amount = await klever.balance();
    const currencyNormalizeMultiplier = Math.pow(10, 6);

    setBalance(amount / currencyNormalizeMultiplier);
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

  return (
    <GameContext.Provider
      value={{
        balance,
        setBalance,
        address,
        setAddress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameProvider;
