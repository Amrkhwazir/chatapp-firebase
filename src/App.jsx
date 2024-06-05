import ChatRoom from "./compnents/ChatRoom";

function App() {

  return (
    <div className="flex justify-center">
      <ChatRoom />
    </div>
)
}


function ChatMessage(props) {
const { text, uid, photoURL } = props.message;

const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

return (<>
<div className={`message ${messageClass}`}>
<img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
<p>{text}</p>
</div>
</>
  )
}

export default App