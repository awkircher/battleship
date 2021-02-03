import './Shield.css'

export const Shield = function(props) {
    if (props.isUp) {
        return (
            <div className="Shield">
                <h1>{props.message}</h1>
                <button onClick={() => {props.action({type: 'shieldDismissed'})}}>READY</button>
            </div>
        )
    } else {
        return (
            null
        )
    }
}