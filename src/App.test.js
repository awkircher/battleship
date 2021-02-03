import { reducer } from './App';

const initialState = {
    message:`Let's play Battleship!`, 
    turn: 1,
    shielded: false,
  };
const attackAction = {type: 'attack', payload: 'A1'}; 
const hitAction = {type: 'hit', payload: 'Cruiser'};
const missAction = {type: 'miss', payload: 'A1'}
const sunkAction = {type: 'sunk', payload: 'Cruiser'}

it('updates state for an attack', () => {
    const result = reducer(initialState, attackAction);
    expect(result).toHaveProperty('message', 'Launching attack on ' + attackAction.payload + ' ...')
})

it('updates state for a hit', () => {
    const result = reducer(initialState, hitAction);
    expect(result).toHaveProperty('message', hitAction.payload + ' HIT!')
})

it('updates state for a miss', () => {
    const result = reducer(initialState, missAction);
    expect(result).toHaveProperty('message', 'Attack was a MISS!')
})

it('updates state for a sunk ship', () => {
    const result = reducer(initialState, sunkAction);
    expect(result).toHaveProperty('message', sunkAction.payload + ' SUNK!')
})