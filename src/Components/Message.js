import '../Message.css'
import hitImg from '../images/hit.gif'
import wavesImg from '../images/waves.gif'
import sunkImg from '../images/sunk.gif'

export const Message = function(props) {
    const hit = 'HIT';
    const miss = 'MISS';
    const sunk = 'SUNK';
    if (props.message.includes(hit)) {
        return (
            <div className="Message">
                <h1>{props.message}</h1>
                <img src={hitImg} alt="hit"></img>
            </div>
        )
    } else if (props.message.includes(miss)) {
        return (
            <div className="Message">
                <h1>{props.message}</h1>
                <img src={wavesImg} alt="waves"></img>
            </div>
        )
    } else if (props.message.includes(sunk)) {
        return (
            <div className="Message">
                <h1>{props.message}</h1>
                <img src={sunkImg} alt="sunk"></img>
            </div>
        )
    } else {
        return (
            <div className="Message">
                <h1>{props.message}</h1>
            </div>
        )
    }
}