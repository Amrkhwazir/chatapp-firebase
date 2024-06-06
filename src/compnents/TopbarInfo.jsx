import { data } from 'autoprefixer';
// import React, { useEffect, useState } from 'react'

export const TopbarInfo = ({listUser}) => {
  
  return (
    <div className='w-ful h-[50px] bg-slate-300 p-2 text-sm'>
     <p>{listUser?.username}</p>
    <p>{listUser?.email}</p>
  </div>
  )
}
