import '../Shield.css'

export const Shield = function(props) {
    if (props.isUp) {
        return (
            <div className="Shield">
                <h1>Shield's up!</h1>
                <button onClick={() => {props.action({type: 'shieldDismissed'})}}>Dismiss</button>
            </div>
        )
    } else {
        return (
            null
        )
    }
}