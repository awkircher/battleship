import Ship from './Ship'

const testShip = Ship(3,0);

it('makes ships with the right properties', () => {
    expect(testShip).toHaveProperty('positions', [false, false, false])
    expect(testShip).toHaveProperty('uid', 0)
    expect(testShip.isSunk()).toBe(false)
});

const hitShip = Ship(3, 0);
hitShip.hit(0);

it('marks positions as hit', () => {
    expect(hitShip).toHaveProperty('positions', [true, false, false])
});

const sunkShip = Ship(3, 0);
sunkShip.hit(0);
sunkShip.hit(1);
sunkShip.hit(2);

it('knows if a ship is sunk or not', () => {
    expect(sunkShip.isSunk()).toBe(true)
})