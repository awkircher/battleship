import { Ship } from '../Models/Ship'
import { shuffleArray } from '../Utilities/shuffle.js'
import { useState, useEffect } from 'react'
import { Score } from './Score'
import '../Gameboard.css'

export const Gameboard = function(props) {
    const shipTypes = [
        ['Carrier', 5], 
        ['Battleship', 4], 
        ['Cruiser', 3], 
        ['Submarine', 3], 
        ['Destroyer', 2]
    ];
    const [targets, setTargets] = useState([
        'A1','B1','C1','D1','E1','F1',
        'A2','B2','C2','D2','E2','F2',
        'A3','B3','C3','D3','E3','F3',
        'A4','B4','C4','D4','E4','F4',
        'A5','B5','C5','D5','E5','F5',
        'A6','B6','C6','D6','E6','F6',
    ]);
    const [ships, setShips] = useState([]);
    // placeShips() populates `ships` with Ship objects.
    // [
    //   {
    //     type:Destroyer,
    //     coordinates: { A1: false, B1: false }
    //     hit: hit(),
    //     isSunk: isSunk(),
    //   },
    //   {
    //     type:Cruiser,
    //     coordinates: { B2: false, C2: false, D2: false },
    //     hit: hit(),
    //     isSunk: isSunk(),
    //    }
    // ]
    const placeShips = function() {
        const grid = [
            'A1','B1','C1','D1','E1','F1',
            'A2','B2','C2','D2','E2','F2',
            'A3','B3','C3','D3','E3','F3',
            'A4','B4','C4','D4','E4','F4',
            'A5','B5','C5','D5','E5','F5',
            'A6','B6','C6','D6','E6','F6',
        ];
        // Returns coordinates as an array.
        function getCoordinates(size, type) {
            // Returns a 0 or 1, which determines if the ship is vertical or horizontal.
            const orientation = Math.floor(Math.random() * Math.floor(2));
            const horizontal = 0;
            let available = [];
            if (orientation === horizontal) {
                // Returns the first valid placement for a horizontal ship of given length and marks those spaces in grid.
                // Get all the rows of grid.
                let rows = [];
                let rowLength = 6;
                let index;
                for (index = 0; index <= 30; index += rowLength) {
                    rows.push(grid.slice(index, index + rowLength));
                }
                // Find all available correctly-sized positions, e.g., [[A1, A2, A3], [B1, B2, B3]].
                const max = rowLength - size;
                let positions = null;
                rows.forEach((row) => {
                    for (let i = 0; i <= max; i++) {
                        positions = row.slice(i, i + size);
                        if (positions.includes(shipTypes[0][0])) {
                            continue;
                        } else if (positions.includes(shipTypes[1][0])) {
                            continue;
                        } else if (positions.includes(shipTypes[2][0])) {
                            continue;
                        } else if (positions.includes(shipTypes[3][0])) {
                            continue;
                        } else if (positions.includes(shipTypes[4][0])) {
                            continue;
                        } else {
                            available.push(positions)
                        }
                    }
                })
            } else {
                // Returns the first valid placement for a vertical ship and marks the spaces in the grid.
                // Get all the columns in grid.
                let columns = [];
                const jump = 6;
                for (let i = 0; i < jump; i++) {
                    const column = [
                        grid[i], 
                        grid[i+6], 
                        grid[i+(2*jump)], 
                        grid[i+(3*jump)], 
                        grid[i+(4*jump)], 
                        grid[i+(5*jump)]
                    ]
                    columns.push(column);
                }
                // Find all available correctly-sized positions, e.g., [[A1, B1, C1], [A2, B2, C2]].
                const columnHeight = 6;
                const max = columnHeight - size;
                let positions = null;
                columns.forEach((column) => {
                    for (let i = 0; i <= max; i++) {
                        positions = column.slice(i, i + size);
                        if (positions.includes(shipTypes[0][0])) {
                            continue;
                        } else if (positions.includes(shipTypes[1][0])) {
                            continue;
                        } else if (positions.includes(shipTypes[2][0])) {
                            continue;
                        } else if (positions.includes(shipTypes[3][0])) {
                            continue;
                        } else if (positions.includes(shipTypes[4][0])) {
                            continue;
                        } else {
                            available.push(positions)
                        }
                    }
                })
            }
            // Assign the first item in `available` to `selectedAvailable` and mark those positions in grid.
            const selectedAvailable = available.shift();
            for (let i = 0; i < selectedAvailable.length; i++) {
                const isMatch = (value) => value === selectedAvailable[i];
                const indexOfMatch = grid.findIndex(isMatch);
                grid[indexOfMatch] = type;
            }
            // Return the coordinates to be used in creating your Ship object.
            const coordinates = {};
            // Add 'false' to each, to indicate that position is not hit.
            selectedAvailable.forEach(position => {
                coordinates[position] = false;
            })
            console.log(coordinates);
            return coordinates;
        }
        // Create Ships in a different order each game.
        shuffleArray(shipTypes);
        const ships = [];
        shipTypes.forEach(shipType => {
            const type = shipType[0];
            const size = shipType[1];
            const coordinates = getCoordinates(size, type);
            const ship = Ship(type, coordinates, size);
            ships.push(ship);
        });
        setShips(ships);
    }

    // Calls isSunk() on each Ship. If 5 Ships are sunk, executes callback gameDidEnd to let App know.
    const isGameOver = function() {
        let sunkShips = [];
        ships.forEach(ship => {
            if (ship.isSunk() === true) {
                sunkShips.push(true)
            }
        })
        if (sunkShips.length === 5) {
            props.action({type: 'gameover'});
        }
    }

    // Takes a single coordinate, checks if that is part of a ship, and updates the ship accordingly.
    // Updates state, then lets App know the turn is over.
    const receiveAttack = function(coords) {
        const current = targets.slice(0);
        let hit;
        ships.forEach((ship) => {
            const keys = Object.keys(ship.coordinates);
            if (keys.includes(coords)) {
                ship.hit(coords)
                hit = true
                if (ship.isSunk()) {
                    props.action({type: 'sunk', payload: ship.type})
                } else {
                    props.action({type: 'hit', payload: ship.type})
                }
            }
        })
        const isMatch = (value) => value === coords;
        const indexOfMatch = current.findIndex(isMatch);
        if (hit) {
            current[indexOfMatch] = 'hit';
        } else {
            current[indexOfMatch] = 'miss';
            props.action({type: 'miss', payload: coords})
        }
        setTargets(current);
        window.setTimeout(props.action, 2*1000, {type: 'turnOver'})
    }

    // Create a div for each potential attack target.
    const displayAttacks = targets.map((coords, index) =>
        <button 
            key={coords.toString() + index}
            className={index} 
            data-coordinate={coords}
        >
            {coords}
        </button>
    );

    useEffect(() => {
        placeShips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        isGameOver();
    })

    const isVisible = props.isVisible;

    if (isVisible) {
        return (
            <div className="gameboard">
                <div 
                    className="grid active"
                    onClick={(event) => {
                        event.preventDefault();
                        const parent = event.currentTarget;
                        const elem = event.target;
                        parent.classList.add('animate');
                        const attackTarget = elem.dataset.coordinate;
                        props.action({type: 'attack', payload: attackTarget})
                        window.setTimeout(receiveAttack, 1*2000, attackTarget)
                    }}
                >{displayAttacks}</div>
                    <Score 
                        status={ships}
                        id={props.id}
                    />
            </div>
        )
    } else {
        return (
            <div className="gameboard">
                <div className="grid hidden">{displayAttacks}</div>
                <Score 
                    status={ships}
                    id={props.id}
                />
            </div>
        )
    }
}