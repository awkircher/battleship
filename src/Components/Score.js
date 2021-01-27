import '../Score.css'

export const Score = function(props) {
    const displayShipStatus = props.status.map((ship, index) => {
        const sunk = ship.isSunk().toString();
        const hits = Object.values(ship.coordinates).map((value, index) => {
            return <div key={value.toString() + index + props.id} data-hit={value.toString()}></div>
        })
        return <div key={ship.toString() + index + props.id} data-sunk={sunk} data-ship={ship.type}>
                    <div className="shipStatus">
                        <h1 className='shipType'>{ship.type}</h1>
                        <div className='hits'>{hits}</div>
                    </div> 
               </div>
        }
    );

    return (
        <div className="status" id={props.id}>
            {displayShipStatus}
        </div>
    )
}