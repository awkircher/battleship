import Gameboard from './Gameboard'

it('makes the gameboard object', () => {
    const testGameboard = Gameboard();
    expect(testGameboard).toBeTruthy();
});