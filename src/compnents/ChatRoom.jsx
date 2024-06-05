import React from 'react'

const ChatRoom = () => {
  return (
    <div className='w-[500px] h-[550px] bg-gray-800 mt-8'>
      <div>
        <div className='w-full h-[500px] p-4'>
            <div className='bg-slate-300 w-24 h-10 rounded-md p-2'>
            <p>ddd</p>
            </div>   
        </div>
        <div className='bg-slate-300 w-full h-[50px]'>
            <input type="text" placeholder='Enter your message' className='w-5/6 h-[48px] text-zinc-800 bg-slate-300 focus:outline-none pl-4' />
            <button className='bg-blue-900 w-20 h-10 text-white' >Send</button>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom
