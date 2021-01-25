export const Score = function(props) {
    const displayShipStatus = props.status.map((ship, index) => {
        const sunk = ship.isSunk().toString();
        return <div key={ship.toString() + index}>{ship.type} {ship.targets.length} {sunk}</div>
        }
    );

    return (
        <div className="status">{displayShipStatus}</div>
    )
}