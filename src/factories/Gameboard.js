import Ship from './Ship'

const Gameboard = function() {
    const shipTypes = [
        ['Carrier', 5], 
        ['Battleship', 4], 
        ['Cruiser', 3], 
        ['Submarine', 3], 
        ['Destroyer', 2]
    ];
    const coordinates = [
        'A1','B1','C1','D1','E1','F1',
        'A2','B2','C2','D2','E2','F2',
        'A3','B3','C3','D3','E3','F3',
        'A4','B4','C4','D4','E4','F4',
        'A5','B5','C5','D5','E5','F5',
        'A6','B6','C6','D6','E6','F6',
    ]; 
    const activeGame = [];
    // Returns the active gameboard as an array of nested objects.
    // [
    //   {
    //     coordinates:A1B1, 
    //     ship:{
    //           type:Destroyer,
    //           targets:[false,false],
    //           hit: hit(),
    //           isSunk: isSunk(),
    //     }
    //   },
    //   {
    //     coordinates:B2C2D2, 
    //     ship:{
    //           type:Cruiser,
    //           targets:[false,false,false],
    //           hit: hit(),
    //           isSunk: isSunk(),
    //     }
    //   }
    // ]
    const placeShips = function() {
        // call Ships factory function with a length and uid
        // length should correspond to some set of coordinates
        shipTypes.forEach(shipType => {
            const type = shipType[0];
            const length = shipType[1];
            const ship = Ship(type, length);
            activeGame.push(ship);
        });
        return activeGame;
    }
    return { placeShips }
}

export default Gameboard