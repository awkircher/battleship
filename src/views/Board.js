const Board = function(props) {
    const attacks = props.attackGrid;
    const attackGrid = attacks.map((attack) =>
        <button 
            key={attack.toString()} 
            data-coordinate={attack}
            onClick={props.getPlayerInput}>player1 {attack}</button>
    );  
    return (
        <div>
            <div className="player1">
                {attackGrid}
            </div>
        </div>
    )
}

export default Board