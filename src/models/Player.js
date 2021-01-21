import shuffleArray from '../utilities/shuffle.js'

const Player = function() {
    // This can be called in order to get a target from the computer player.
    // The other player will input their desired target directly from the DOM, 
    // which will then go to the Gameboard.receiveAttack() method.
    const getAttackTarget = function(previousAttacks) {
        const unattacked = [];
        previousAttacks.forEach(coordinate => {
            if (coordinate !== 'hit' && coordinate !== 'miss') {
                unattacked.push(coordinate);
            }
        });
        shuffleArray(unattacked);
        return unattacked.pop();
    }
    return { getAttackTarget }
}

export default Player