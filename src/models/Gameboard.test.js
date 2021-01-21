import Gameboard from './Gameboard'

const testGameboard = Gameboard();
const activeGame = testGameboard.placeShips();
console.table(activeGame);

it('makes the gameboard object', () => {
    expect(testGameboard).toBeTruthy();
});

it('generates 5 ships', () => {
    expect(activeGame).toHaveLength(5);
});

it('generates coordinates that don\'t overlap', () => {
    expect(activeGame[0].coordinates).not.toBe(activeGame[1].coordinates)
    expect(activeGame[1].coordinates).not.toBe(activeGame[2].coordinates)
    expect(activeGame[2].coordinates).not.toBe(activeGame[3].coordinates)
    expect(activeGame[3].coordinates).not.toBe(activeGame[4].coordinates)
});

it('can tell if an attack was a hit', () => {
    testGameboard.receiveAttack(activeGame[0].coordinates[0]);
    console.table(activeGame)
    expect(activeGame[0].targets).toContain(true);
})

it('can tell if all the ships are sunk', () => {
    testGameboard.receiveAttack(activeGame[1].coordinates[0]);
    console.table(activeGame)
    expect(testGameboard.isGameOver()).toBe(false);
})