// Returns an individual Ship object with methods.
const Ship = function(type, length) {
    let targets = [];
    // Initially all targets are not hit, so false.
    for (let i = 0; i < length; i++) {
        targets.push(false);
    } 
    // These methods to be called if Gameboard finds an attack corresponds to a target.
    const hit = function(index) {
        targets[index] = true;
    }
    const isSunk = function() {
        const isTargetHit = (target) => target === true;
        return targets.every(isTargetHit)
    }
    return {type, targets, hit, isSunk}
}

export default Ship