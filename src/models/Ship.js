// Returns an individual Ship object with methods.
export const Ship = function(type, coordinates, size) {
    // These methods to be called if Gameboard finds an attack corresponds to a target.
    const hit = function(key) {
        this.coordinates[key] = true
    }
    const isSunk = function() {
        const hitTargets = Object.values(this.coordinates);
        const isTrue = (value) => value === true;
        return hitTargets.every(isTrue)
    }
    return {type, coordinates, hit, isSunk}
}