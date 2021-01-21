const Board = function(props) {
    return (
        <div>
            <h1>
                {props.message}
            </h1>
            <p>
                {props.ship1}
                {props.ship2}
                {props.ship3}
                {props.ship4}
                {props.ship5}
            </p>
        </div>
    )
}

export default Board