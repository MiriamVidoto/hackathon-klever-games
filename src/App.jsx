import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
// import NotFound from './pages/NotFound';
import Game from './pages/Game';
import ScratchCardPage from './pages/ScratchCard';
import GameProvider from './context/GameProvider';
import Home from './pages/Home';
import MemoryGame from './pages/MemoryGame';

function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/rps" element={<Game />} exact />
          <Route path="/scratchcard" element={<ScratchCardPage />} exact />
          <Route path="/memorygame" element={<MemoryGame />} exact />
          {/* <Route path="*" component={NotFound} /> */}
        </Routes>
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;
