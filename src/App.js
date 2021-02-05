import { Gameboard } from './Components/Gameboard/Gameboard.js'
import { useReducer } from 'react'
import { Message } from "./Components/Message/Message";
import { Shield } from "./Components/Shield/Shield"
import './App.css';

const initialState = {
  message:`Let's play Battleship!`, 
  turn: 1,
  shielded: true,
};

export function init(initialState) {
  return initialState;
}

export const reducer = function(state, action) {
  switch (action.type) {
    case 'turnOver':
      const nextTurn = (state.turn === 1) ? 2 : 1;
      return {message: 'Ready Player ' + nextTurn + '?', turn: nextTurn, shielded: true}
    case 'shieldDismissed':
      return {message: 'Awaiting your command...', turn: state.turn, shielded: false}
    case 'attack':
      return {message: 'Launching attack on ' + action.payload + ' ...', turn: state.turn, shielded: false};
    case 'hit':
      return {message: action.payload + ' HIT!', turn: state.turn, shielded: false};
    case 'miss':
      return {message: 'Attack was a MISS!', turn: state.turn, shielded: false};
    case 'sunk':
      return {message: action.payload + ' SUNK!', turn: state.turn, shielded: false};
    case 'gameover':
      return {message: 'Game Over', turn: state.turn, shielded: false};
    case 'playAgain':
      return init(initialState);
    default:
      throw new Error();
  }
}

export function App() {

  const [state, dispatch] = useReducer(reducer, initialState, init)

  const isVisible = state.turn === 1;

  return (
    <div className="App">
      <Shield 
        isUp={state.shielded}
        message={state.message}
        action={dispatch}
      />
      <Message 
        message={state.message}
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
