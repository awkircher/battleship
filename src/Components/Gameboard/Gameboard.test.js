import { utils } from './Gameboard'
import { shipTypes, gridTemplate } from '../../Utilities/constants'

it('generates 5 sets of unique coordinates', () => {
    let grid = gridTemplate.slice();
    const shipCoordinates = new Set();
    shipTypes.forEach(shipType => {
        const type = shipType[0];
        const size = shipType[1];
        const coordinates = utils.getCoordinates(grid, size);
        const keys = Object.keys(coordinates);
        keys.forEach(key => {
            shipCoordinates.add(key);
        })
        grid = utils.markGrid(grid, keys, type);
    });
    expect(shipCoordinates.size).toBe(17)
});

it('knows if an attack hit a ship', () => {
    const ship = [{coordinates:{'A1': false, 'B1': false}}];
    const isHit = utils.isHit(ship, 'A1');
    expect(isHit.hit).toBe(true);
})

it('knows if an attack was a miss', () => {
    const ship = [{coordinates:{'A1': false, 'B1': false}}];
    const isHit = utils.isHit(ship, 'C1');
    expect(isHit.hit).toBe(false);
})

it('records the attack outcomes', () => {
    let grid = ['A1','B1']
    utils.updateTargets(grid, true, 'A1');
    utils.updateTargets(grid, false, 'B1')
    expect(grid[0]).toBe('hit');
    expect(grid[1]).toBe('miss')
})