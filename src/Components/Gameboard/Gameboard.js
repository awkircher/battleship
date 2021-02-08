import { Ship } from '../../Models/Ship'
import { shuffleArray } from '../../Utilities/shuffle.js'
import { useState, useEffect } from 'react'
import './Gameboard.css'
import { shipTypes, gridTemplate } from '../../Utilities/constants'

export const utils = function() {
    const getOrientation = function() {
        const random = Math.floor(Math.random() * Math.floor(2));
        const orientation = (random === 0) ? 'horizontal' : 'vertical' ;
        return orientation;
    }
    const getRows = function(array, rowLength) {
        let rows = [];
        let index;
        for (index = 0; index <= 30; index += rowLength) {
            rows.push(array.slice(index, index + rowLength));
        }
        return rows;
    }
    const getColumns = function(array, columnHeight) {
        let columns = [];
        for (let i = 0; i < columnHeight; i++) {
            const column = [
                array[i], 
                array[i+6], 
                array[i+(2*columnHeight)], 
                array[i+(3*columnHeight)], 
                array[i+(4*columnHeight)], 
                array[i+(5*columnHeight)]
            ]
            columns.push(column);
        }
        return columns;
    }
    const getAvailable = function(array, length, size) {
        // Find all available correctly-sized positions, e.g., [[A1, A2, A3], [B1, B2, B3]].
        const available = [];
        const max = length - size;
        let positions = null;
        array.forEach((item) => {
            for (let i = 0; i <= max; i++) {
                positions = item.slice(i, i + size);
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
        return available;
    }
    const getCoordinates = function(grid, size) {
        // Returns vertical or horizontal.
        const orientation = getOrientation();
        const allPositions = (orientation === 'horizontal') ? getRows(grid, 6) : getColumns(grid, 6);
        const availablePositions = getAvailable(allPositions, 6, size)
        const shuffledOptions = shuffleArray(availablePositions.slice())
        const selectedPosition = shuffledOptions.shift();
        const coordinates = {};
        // Add 'false' to each, to indicate that position is not hit.
        selectedPosition.forEach(position => {
            coordinates[position] = false;
        })
        return coordinates;
    }
    const markGrid = function(array, coordinates, type) {
        for (let i = 0; i < coordinates.length; i++) {
            const isMatch = (value) => value === coordinates[i];
            const indexOfMatch = array.findIndex(isMatch);
            array[indexOfMatch] = type;
        }
        return array.slice();
    }
    const isHit = function(shipArray, coords) {
        const isShip = (ship) => Object.keys(ship.coordinates).includes(coords);
        const indexOfShip = shipArray.findIndex(isShip);
        if (indexOfShip === -1) {
            return { hit: false, index: null };
        } else {
            return { hit: true, index: indexOfShip };
        }
    }
    const updateTargets = function(targetArray, isHit, coords) {
        const isMatch = (value) => value === coords;
        const indexOfMatch = targetArray.findIndex(isMatch);
        if (isHit) {
            targetArray[indexOfMatch] = 'hit';
        } else {
            targetArray[indexOfMatch] = 'miss';
        }
        return targetArray.slice();
    }
    return { getOrientation, getRows, getColumns, getAvailable, getCoordinates, markGrid, updateTargets, isHit }
}();

export const Gameboard = function(props) {

    const [targets, setTargets] = useState(gridTemplate);

    const [ships, setShips] = useState([]);

    /* placeShips() fills the `ships` state array with Ship objects. For example: 
    [
        {
            type: 'Destroyer'
            coordinates: {'A1': false, 'B1': false}
            hit: hit();
            isSunk: isSunk();
        }
        {
            type: 'Cruiser'
            coordinates: {'A2': false, 'B2': false, 'C2': false}
            hit: hit();
            isSunk: isSunk();
        }
        ...
    ] */
    const placeShips = function() {
        let grid = gridTemplate.slice();
        const ships = [];
        shuffleArray(shipTypes);
        shipTypes.forEach(shipType => {
            const type = shipType[0];
            const size = shipType[1];
            const coordinates = utils.getCoordinates(grid, size);
            const ship = Ship(type, coordinates, size);
            ships.push(ship);
            grid = utils.markGrid(grid, Object.keys(coordinates), type);
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
        const targetedShip = utils.isHit(ships, coords);
        if (targetedShip.hit) {
            const ship = ships[targetedShip.index];
            ship.hit(coords);
            if (ship.isSunk()) {
                props.action({type: 'sunk', payload: {target: ship.type, status: ships}})
            } else {
                props.action({type: 'hit', payload: {target: ship.type, status: ships}})
            }
        } else {
            props.action({type: 'miss', payload: {target: coords, status: ships}})
        }
        setTargets(utils.updateTargets(targets.slice(), targetedShip.hit, coords));
        window.setTimeout(props.action, 3*1000, {type: 'turnOver'})
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
                        const attackTarget = elem.dataset.coordinate;
                        if (attackTarget) {
                            parent.classList.add('animate');
                            props.action({type: 'attack', payload: attackTarget})
                            window.setTimeout(receiveAttack, 1*1000, attackTarget)
                        } else {
                            return;
                        }
                    }}
                >{displayAttacks}</div>
            </div>
        )
    } else {
        return (
            <div className="gameboard">
                <div className="grid hidden">{displayAttacks}</div>
            </div>
        )
    }
}