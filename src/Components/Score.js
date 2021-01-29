import '../Score.css'

export const Score = function(props) {
    const playerLabel = (props.id === 'y') ? "Player 1" : "Player 2";
    const displayShipStatus = props.status.map((ship, index) => {
        const sunk = ship.isSunk().toString();
        const hits = Object.values(ship.coordinates).map((value, index) => {
            return <div key={value.toString() + index + props.id} data-hit={value.toString()}></div>
        })
        return <div className="ship" key={ship.toString() + index + props.id} data-sunk={sunk} data-ship={ship.type}>
                    <div className="status">
                        <h1 className='type'>{ship.type}</h1>
                        <div className='hits'>{hits}</div>
                    </div> 
               </div>
        }
    );

    return (
        <div className="Score" id={props.id}>
            <label>{playerLabel}</label>
            {displayShipStatus}
        </div>
    )
}