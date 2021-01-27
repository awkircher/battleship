import { Gameboard } from './Components/Gameboard'
import { useReducer } from 'react'
import { Message } from "./Components/Message";
import { Shield } from "./Components/Shield"
import './App.css';

function App() {
  const initialState = {
    message:`Let's play Battleship!`, 
    turn: 0,
    shielded: false,
  };

  function init(initialState) {
    return initialState;
  }

  const reducer = function(state, action) {
    switch (action.type) {
      case 'turnOver':
        const nextTurn = (state.turn === 0) ? 1 : 0;
        return {message: 'Shield!', turn: nextTurn, shielded: true}
      case 'shieldDismissed':
        return {message: 'Awaiting attack target...', turn: state.turn, shielded: false}
      case 'attack':
        return {message: 'Attack launched on ' + action.payload, turn: state.turn, shielded: false};
      case 'hit':
        return {message: action.payload + ' hit', turn: state.turn, shielded: false};
      case 'miss':
        return {message: action.payload + ' was a miss', turn: state.turn, shielded: false};
      case 'sunk':
        return {message: action.payload + ' has been sunk', turn: state.turn, shielded: false};
      case 'gameover':
        return {message: 'game over', turn: state.turn, shielded: false};
      case 'playAgain':
        return init(initialState);
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState, init)

  const isVisible = state.turn === 0;

  return (
    <div className="App">
      <Shield 
        isUp={state.shielded}
        action={dispatch}
      />
      <Message 
        content={state.message}
      />
      <Gameboard
        isVisible={isVisible}
        id={"x"}
        action={dispatch}
      />
      <Gameboard
        isVisible={!isVisible}
        id={"y"}
        action={dispatch} 
      />
    </div>
  );
}

export default App;
