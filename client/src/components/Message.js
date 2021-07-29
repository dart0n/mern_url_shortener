const Message = ({ color, text }) => (
  <div className={`alert alert-${color}`}>{text}</div>
)

export default Message
