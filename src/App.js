import { Gameboard } from './Components/Gameboard/Gameboard.js'
import { useReducer } from 'react'
import { Message } from "./Components/Message/Message";
import { Shield } from "./Components/Shield/Shield"
import { Score } from "./Components/Score/Score"
import { startingScore } from './Utilities/constants'
import './App.css';

const initialState = {
  message:`Let's play Battleship!`,
  status: startingScore, 
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
      return {message: 'Ready Player ' + nextTurn + '?', status: state.status, turn: nextTurn, shielded: true}
    case 'shieldDismissed':
      return {message: 'Awaiting your command...', status: state.status, turn: state.turn, shielded: false}
    case 'attack':
      return {message: 'Launching attack on ' + action.payload + ' ...', status: state.status, turn: state.turn, shielded: false};
    case 'hit':
      const hitTarget = action.payload.target;
      const hitStatus = action.payload.status;
      return {message: hitTarget + ' HIT!', status: hitStatus, turn: state.turn, shielded: false};
    case 'miss':
      const shipStatus = action.payload.status;
      return {message: 'Attack was a MISS!', status: shipStatus, turn: state.turn, shielded: false};
    case 'sunk':
      const sunkTarget = action.payload.target;
      const sunkStatus = action.payload.status;
      return {message: sunkTarget + ' SUNK!', status: sunkStatus, turn: state.turn, shielded: false};
    case 'gameover':
      return {message: 'Game Over! Ready to play again?', status: state.status, turn: state.turn, shielded: true};
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
      <Score 
        status={state.status}
        player={state.turn}
      />
    </div>
  );
}
