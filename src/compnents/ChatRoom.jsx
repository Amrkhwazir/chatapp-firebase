import React, { useState } from 'react'
import { db, doc, onSnapshot, setDoc } from '../../firebase';

const ChatRoom = () => {

  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  
  /// send message to db
 async function sendMessage (message) {
  await setDoc(doc(db, "messages", "1"), {
    message
  });

  readData("1")
  }


  /// read message from db

  function readData (id) {

    const unsub = onSnapshot(doc(db, "messages", id), (doc) => {
      console.log("Current data: ", doc.data);

      setData(doc.data());
  });
  
  
  };

  console.log(data);
  return (
    <div className='flex justify-center'>
    <div className='w-[500px] h-[550px] bg-gray-800 mt-8'>
      <div>
        <div className='w-full h-[500px] p-4 relative'>

          {/* left */}
            <div className='bg-slate-300 w-24 h-10 rounded-md p-2 mt-5'>
            <p>{data.message}</p>
            </div>   

          {/* right */}
            <div className='bg-slate-300 w-24 h-10 rounded-md p-2 absolute right-5 mt-5'>
            <p>ddd</p>
              </div>   
        </div>
        <div className='bg-slate-300 w-full h-[50px]'>
            <input type="text" placeholder='Enter your message' className='w-5/6 h-[48px] text-zinc-800 bg-slate-300 focus:outline-none pl-4' onChange={(e) => setMessage(e.target.value)} />
            <button className='bg-blue-900 w-20 h-10 text-white' onClick={() => sendMessage(message)} >Send</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ChatRoom
