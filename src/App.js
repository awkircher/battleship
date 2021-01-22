import Gameboard from './models/Gameboard'
import Player from './models/Player'
import Board from './views/Board';
import { useState } from 'react'

function App() {
  const gameboard = Gameboard();
  const player = Player();
  const [ships, setShips] = useState(gameboard.placeShips());
  const [attackGrid, setAttackGrid] = useState(gameboard.yourAttacks);

  const turn = function(playerInput) {
    const target = (playerInput) ? player.getPlayerAttackTarget(playerInput) : player.getComputerAttackTarget();
    gameboard.receiveAttack(target);
    setAttackGrid(gameboard.yourAttacks);
    console.log(gameboard.isGameOver());
  }
  return (
    <div className="App">
      <Board 
        attackGrid={attackGrid}
        getPlayerInput={turn} />
    </div>
  );
}

export default App;
