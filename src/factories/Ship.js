// Returns an individual Ship object with methods.
const Ship = function(length, uid) {
    let positions = [];
    // Initially all positions are not hit, so false.
    for (let i = 0; i < length; i++) {
        positions.push(false);
    } 
    // These methods to be called if Gameboard finds an attack corresponds to a position.
    const hit = function(index) {
        positions[index] = true;
    }
    const isSunk = function() {
        const isPositionHit = (position) => position === true;
        return positions.every(isPositionHit)
    }
    return {positions, uid, hit, isSunk}
}

export default Ship