import './Shield.css'

export const Shield = function(props) {
    let style;
    let actionType;
    let buttonText;
    switch (props.message) {
        case `Let's play Battleship!`:
            style = 'startScreen';
            actionType = 'shieldDismissed';
            buttonText = 'READY!'
            break;
        case `Game over!`:
            style = 'gameOver';
            actionType = 'playAgain';
            buttonText = 'PLAY AGAIN'
            break;
        default:
            style = 'Shield';
            actionType = 'shieldDismissed';
            buttonText = 'READY!'
    }
    if (props.isUp) {
        return (
            <div className={style}>
                <h1>{props.message}</h1>
                <button onClick={() => {props.action({type: actionType})}}>{buttonText}</button>
            </div>
        )
    } else {
        return (
            null
        )
    }
}