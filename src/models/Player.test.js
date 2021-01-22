import Player from "./Player";

const testAttacks = [
    'hit','hit','hit','D1','E1','hit',
    'miss','miss','miss','miss','miss','miss',
    'miss','miss','miss','miss','miss','miss',
    'hit','hit','hit','hit','hit','hit',
    'hit','hit','hit','hit','miss','hit',
    'hit','hit','hit','hit','hit','hit',
];

const testPlayer = Player();

it('chooses a valid location for the computer to attack', () => {
    expect(testAttacks).toContain(testPlayer.getComputerAttackTarget(testAttacks));
})

it('chooses a random valid location for the computer', () => {
    const testAttacks = [
        'hit','hit','hit','D1','E1','hit',
        'miss','miss','miss','miss','miss','miss',
        'miss','miss','miss','miss','miss','miss',
        'hit','hit','hit','hit','hit','hit',
        'hit','hit','hit','hit','miss','hit',
        'hit','hit','hit','hit','hit','hit',
    ];
    const attack1 = testPlayer.getComputerAttackTarget(testAttacks);
    const isMatch = (value) => value === attack1;
    const indexOfMatch = testAttacks.findIndex(isMatch);
    testAttacks[indexOfMatch] = 'hit';
    const attack2 = testPlayer.getComputerAttackTarget(testAttacks);
    console.log(attack1, attack2);
    expect(attack1).not.toBe(attack2);
})

test('getPlayerAttackTarget returns coordinates', () => {
    const event = {dataset: 'E1'};
    const getPlayerAttackTarget = jest.fn(event => event.dataset);
  
    getPlayerAttackTarget(event);
  
    expect(getPlayerAttackTarget).toHaveReturnedWith('E1');
  });