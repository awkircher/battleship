import Player from "./Player";

const testAttacks = [
    'A1','B1','C1','D1','E1','F1',
    'A2','B2','C2','D2','E2','F2',
    'A3','B3','C3','D3','E3','F3',
    'A4','B4','C4','D4','E4','F4',
    'A5','B5','C5','D5','E5','F5',
    'A6','B6','C6','D6','E6','F6',
];

const testPlayer = Player();

it('chooses a valid location to attack', () => {
    console.table(testPlayer.getAttackTarget(testAttacks));
    expect(testAttacks).toContain(testPlayer.getAttackTarget(testAttacks));
})

it('chooses a random valid location', () => {
    const attack1 = testPlayer.getAttackTarget(testAttacks);
    const attack2 = testPlayer.getAttackTarget(testAttacks);
    console.log(attack1, attack2);
    expect(attack1).not.toBe(attack2);
})