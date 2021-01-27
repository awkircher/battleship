import '../Message.css'

export const Message = function(props) {
    return (
        <div className="Message">
            {props.content}
        </div>
    )
}