import './Shield.css'
import start1 from '../../images/start1.svg'
import start2 from '../../images/start2.svg'

export const Shield = function(props) {
    let style;
    switch (props.message) {
        case `Let's play Battleship!`:
            style = 'startScreen';
            break;
        case `Game over!`:
            style = 'gameOver';
            break;
        default:
            style = 'Shield';
    }
    if (props.isUp) {
        return (
            <div className={style}>
                <h1>{props.message}</h1>
                <button onClick={() => {props.action({type: 'shieldDismissed'})}}>READY!</button>
            </div>
        )
    } else {
        return (
            null
        )
    }
}