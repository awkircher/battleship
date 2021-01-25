// Returns an individual Ship object with methods.
export const Ship = function(type, coordinates, size) {
    let targets = [];
    // Initially all targets are not hit, so empty array. 
    // These methods to be called if Gameboard finds an attack corresponds to a target.
    const hit = function() {
        targets.push(true);
    }
    const isSunk = function() {
        return (targets.length === size)
    }
    return {type, coordinates, targets, hit, isSunk}
}