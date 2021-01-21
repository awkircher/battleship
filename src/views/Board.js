const Board = function(props) {
    const attacks1 = props.player1attacks;
    const attackGrid1 = attacks1.map((attack) =>
        <div key={attack.toString()}>{attack}</div>
    ); 
    const attacks2 = props.player2attacks;
    const attackGrid2 = attacks2.map((attack) =>
        <div key={attack.toString()}>{attack}</div>
    ); 
    return (
        <div>
            <h1>
                {props.message}
            </h1>
            <div className="player1">
                {attackGrid1}
            </div>
            <div className="player2">
                {attackGrid2}
            </div>
        </div>
    )
}

export default Board