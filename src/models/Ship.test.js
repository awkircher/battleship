import { Ship } from './Ship'

it('marks positions as hit', () => {
    const hitShip = Ship('Cruiser', {'A1': false, 'B1': false, 'C1': false});
    hitShip.hit('A1');
    expect(hitShip.coordinates).toHaveProperty('A1', true)
});

it('knows if a ship is sunk or not', () => {
    const testShip = Ship('Cruiser', {'A1': false, 'B1': false, 'C1': false});
    const hitShip = Ship('Cruiser', {'A1': false, 'B1': false, 'C1': false});
    const sunkShip = Ship('Cruiser', {'A1': false, 'B1': false, 'C1': false});
    hitShip.hit('A1');
    sunkShip.hit('A1');
    sunkShip.hit('B1');
    sunkShip.hit('C1');
    expect(testShip.isSunk()).toBe(false)
    expect(hitShip.isSunk()).toBe(false)
    expect(sunkShip.isSunk()).toBe(true)
})