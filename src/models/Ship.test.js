import Ship from './Ship'

const testShip = Ship('Cruiser', null, 3);

const hitShip = Ship('Cruiser', null, 3);
hitShip.hit();

it('marks positions as hit', () => {
    expect(hitShip).toHaveProperty('targets', [true])
});

const sunkShip = Ship('Cruiser', null, 3);
sunkShip.hit();
sunkShip.hit();
sunkShip.hit();

it('knows if a ship is sunk or not', () => {
    expect(testShip.isSunk()).toBe(false)
    expect(hitShip.isSunk()).toBe(false)
    expect(sunkShip.isSunk()).toBe(true)
})