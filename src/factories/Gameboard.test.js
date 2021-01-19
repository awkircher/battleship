import Gameboard from './Gameboard'

it('makes the gameboard object', () => {
    const testGameboard = Gameboard();
    expect(testGameboard).toBeTruthy();
});

it('generates 5 ships', () => {
    const testGameboard = Gameboard();
    const activeGame = testGameboard.placeShips();
    expect(activeGame).toHaveLength(5);
});