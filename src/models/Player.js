import shuffleArray from '../utilities/shuffle.js'

const Player = function() {
    // This can be called in order to get a target from the computer player.
    const getComputerAttackTarget = function(previousAttacks) {
        const unattacked = [];
        previousAttacks.forEach(coordinate => {
            if (coordinate !== 'hit' && coordinate !== 'miss') {
                unattacked.push(coordinate);
            }
        });
        shuffleArray(unattacked);
        const attackTarget = unattacked.pop();
        return attackTarget;
    }
    // This unpacks Player 1's event received from the DOM.
    const getPlayerAttackTarget = function(event) {
        event.preventDefault();
        const elem = event.target;
        const attackTarget = elem.dataset.coordinate;
        return attackTarget;
    }
    return { getComputerAttackTarget, getPlayerAttackTarget }
}

export default Player