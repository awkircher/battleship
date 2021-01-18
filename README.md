# Building a game using test-driven development

This implementation of Battleship is an exercise in following test-driven development. The intended process is to write a unit test, write the code to make the unit test pass, and then continue on to writing the next unit test. 

## Testing spec

The following test cases are meant to inform the actual unit tests written. Together they describe the full behavior of the game.

### Ship spec
* A position can only be hit once.
* A ship with a length of x and exactly x hits is sunk.

### Gameboard spec
* Ships are created and placed in a letter column-numbered row coordinate system
* A miss is recorded if the letter-number pair of the attack does not match a ship's coordinates
* A hit is recorded if the letter-number pair of the attack matches an un-hit position on a ship
* Total missed attacks are displayed to the player
