import Ship from './Ship'
import shuffleArray from '../utilities/shuffle.js'

const Gameboard = function() {
    const shipTypes = [
        ['Carrier', 5], 
        ['Battleship', 4], 
        ['Cruiser', 3], 
        ['Submarine', 3], 
        ['Destroyer', 2]
    ];
    const yourShips = [
        'A1','B1','C1','D1','E1','F1',
        'A2','B2','C2','D2','E2','F2',
        'A3','B3','C3','D3','E3','F3',
        'A4','B4','C4','D4','E4','F4',
        'A5','B5','C5','D5','E5','F5',
        'A6','B6','C6','D6','E6','F6',
    ];
    const yourAttacks = [
        'A1','B1','C1','D1','E1','F1',
        'A2','B2','C2','D2','E2','F2',
        'A3','B3','C3','D3','E3','F3',
        'A4','B4','C4','D4','E4','F4',
        'A5','B5','C5','D5','E5','F5',
        'A6','B6','C6','D6','E6','F6',
    ];
    
    // Returns the first valid placement for a horizontal ship of given length and marks those spaces in yourShips.
    const rowLookup = function(size, type) {
        // Get the 6 rows, starting with yourShips[0].
        // Store in an array of arrays, each item a row.
        // Row start indices are 6 apart since 6x6 yourShips.
        let rows = [];
        let rowLength = 6;
        let index;
        for (index = 0; index <= 30; index += rowLength) {
            rows.push(yourShips.slice(index, index + rowLength));
        }
        // Build array of all available correctly-sized positions.
        const max = rowLength - size;
        let available = [];
        let positions = null;
        rows.forEach((row) => {
            for (let i = 0; i <= max; i++) {
                positions = row.slice(i, i + size);
                if (positions.includes(shipTypes[0][0]) || 
                    positions.includes(shipTypes[1][0]) || 
                    positions.includes(shipTypes[2][0]) || 
                    positions.includes(shipTypes[3][0]) || 
                    positions.includes(shipTypes[4][0])) {
                    continue;
                } else {
                    available.push(positions)
                }
            }
        })
        // Assign the first available to coordinates and mark those positions.
        const coordinates = available.shift();
        const isStartPositionInyourShips = (item) => item === coordinates[0];
        const startPositionInyourShips = yourShips.findIndex(isStartPositionInyourShips);
        yourShips.fill(type, startPositionInyourShips, startPositionInyourShips + size);
        return coordinates;
    }

    // Returns the first valid placement for a vertical ship and marks the spaces in the yourShips.
    const columnLookup = function(size, type) {
        // Get the 6 columns, starting with yourShips[0].
        // Store in an array of arrays, each item a column.
        let columns = [];
        const jump = 6;
        for (let i = 0; i < jump; i++) {
            const column = [
                yourShips[i], 
                yourShips[i+6], 
                yourShips[i+(2*jump)], 
                yourShips[i+(3*jump)], 
                yourShips[i+(4*jump)], 
                yourShips[i+(5*jump)]
            ]
            columns.push(column);
        }
        // Build array of all available correctly-sized positions.
        // Columns are 6 high because 6x6 yourShips.
        const columnHeight = 6;
        const max = columnHeight - size;
        let available = [];
        let positions = null;
        columns.forEach((column) => {
            for (let i = 0; i <= max; i++) {
                positions = column.slice(i, i + size);
                if (positions.includes(shipTypes[0][0]) || 
                    positions.includes(shipTypes[1][0]) || 
                    positions.includes(shipTypes[2][0]) || 
                    positions.includes(shipTypes[3][0]) || 
                    positions.includes(shipTypes[4][0])) {
                    continue;
                } else {
                    available.push(positions)
                }
            }
        })
        // Assign the first available to coordinates and mark those positions.
        const coordinates = available.shift();
        const isMatch = (value) => value === coordinates;
        const indexOfMatch = yourShips.findIndex(isMatch);
        yourShips[indexOfMatch] = type;
        return coordinates;
    }

    // Returns the active gameboard as an array of objects.
    // [
    //   {
    //     type:Destroyer,
    //     coordinates:[A1,B1], 
    //     targets:[false,false],
    //     hit: hit(),
    //     isSunk: isSunk(),
    //   },
    //   {
    //     type:Cruiser,
    //     coordinates:[B2,C2,D2], 
    //     targets:[false,false,false],
    //     hit: hit(),
    //     isSunk: isSunk(),
    //    }
    // ]
    const activeGame = [];
    const placeShips = function() {
        // Returns coordinates as an array.
        function getCoordinates(size, type) {
            // Returns a 0 or 1, which determines if the ship is vertical or horizontal.
            const orientation = Math.floor(Math.random() * Math.floor(2));
            const horizontal = 0;
            if(orientation === horizontal) {
                return rowLookup(size, type);
            } else {
                return columnLookup(size, type);
            }
        }
        shuffleArray(shipTypes);
        shipTypes.forEach(shipType => {
            const type = shipType[0];
            const size = shipType[1];
            const coordinates = getCoordinates(size, type);
            const ship = Ship(type, coordinates, size);
            activeGame.push(ship);
        });
        return activeGame;
    }

    const isGameOver = function() {
        let sunkShips = [];
        activeGame.forEach(ship => {
            if (ship.isSunk === true) {
                sunkShips.push(true)
            }
        })
        if (sunkShips.length === 5) {
            return true;
        } else {
            return false;
        }
    }

    const receiveAttack = function(coords) {
        let hit;
        activeGame.forEach(ship => {
            if (ship.coordinates.includes(coords)) {
                ship.hit()
                hit = true
            }
        })
        const isMatch = (value) => value === coords;
        const indexOfMatch = yourAttacks.findIndex(isMatch);
        if (hit) {
            yourAttacks[indexOfMatch] = 'hit';
        } else {
            yourAttacks[indexOfMatch] = 'miss';
        }
    }


    return { placeShips, receiveAttack, isGameOver, yourAttacks }
}

export default Gameboard