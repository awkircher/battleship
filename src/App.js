import Gameboard from './models/Gameboard'
import Board from './views/Board';

function App() {
  const player1 = Gameboard();
  player1.placeShips();
  const player1AttackArray = player1.yourAttacks;
  const player2 = Gameboard();
  player2.placeShips();
  const player2AttackArray = player2.yourAttacks;
  return (
    <div className="App">
      <Board 
      message="I'm board"
      player1attacks={player1AttackArray}
      player2attacks={player2AttackArray}/>
    </div>
  );
}

export default App;
