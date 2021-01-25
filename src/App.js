import Gameboard from './Components/Gameboard'
import { useState } from 'react'

function App() {
  const [turn, setTurn] = useState(0);
  const gameDidEnd = function() {
    console.log('game over')
  }

  const turnDidEnd = function() {
    if (turn === 0) {
      setTurn(1);
    } else {
      setTurn(0);
    }
  }

  const visibility = (turn === 0) ? true : false;

  return (
    <div className="App">
      <Gameboard
        visibility={visibility}
        currentPlayer={turn} 
        turnDidEnd={turnDidEnd}
        gameDidEnd={gameDidEnd} 
      />
      <Gameboard
        visibility={!visibility}
        currentPlayer={turn} 
        turnDidEnd={turnDidEnd}
        gameDidEnd={gameDidEnd} 
      />
    </div>
  );
}

export default App;
