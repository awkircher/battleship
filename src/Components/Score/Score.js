import { useState, useEffect } from 'react'
import './Score.css'

export const Score = function(props) {
    const [player1, setPlayer1] = useState(props.status);
    const [player2, setPlayer2] = useState(props.status);

    useEffect(() => {
        if (props.player === 1) {
            setPlayer1(props.status)
        } else {
            setPlayer2(props.status)
        }
        // eslint-disable-next-line
    }, [props.player])

    const player1Status = player1.map((ship, index) => {
            const hits = Object.values(ship.coordinates).map((value, index) => {
                return <div key={value.toString() + index + props.player} data-hit={value.toString()}></div>
            })
            return <div className="ship" key={ship.toString() + index + props.player} data-ship={ship.type}>
                        <div className="status">
                            <h1 className='type'>{ship.type}</h1>
                            <div className='hits'>{hits}</div>
                        </div> 
                   </div>
            }
        );
    
    const player2Status = player2.map((ship, index) => {
        const hits = Object.values(ship.coordinates).map((value, index) => {
            return <div key={value.toString() + (index + 5) + (props.player + 1)} data-hit={value.toString()}></div>
        })
        return <div className="ship" key={ship.toString() + (index + 5) + (props.player + 1)} data-ship={ship.type}>
                    <div className="status">
                        <div className='hits'>{hits}</div>
                    </div> 
                </div>
        }
    );

    return (
        <div className="Score">
            <div id='x'>
                <label>Player 1</label>
                {player1Status}
            </div>
            <div id='y'>
                <label>Player 2</label>
                {player2Status}
            </div>
        </div>
    )
}