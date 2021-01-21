import Gameboard from './models/Gameboard'
import Board from './views/Board';

function App() {
  const test = Gameboard();
  const ships = test.placeShips();
  return (
    <div className="App">
      <Board 
      message="I'm board"
      ship1={ships[0].type}
      ship2={ships[1].type}
      ship3={ships[2].type}
      ship4={ships[3].type}
      ship5={ships[4].type}/>
    </div>
  );
}

export default App;
