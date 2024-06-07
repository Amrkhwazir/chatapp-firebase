import { data } from 'autoprefixer';
// import React, { useEffect, useState } from 'react'

export const TopbarInfo = ({listUser}) => {
  
  return (
    <div className='w-ful h-[50px] bg-blue-900 text-white p-2 text-sm rounded-tr-md'>
     <p>{listUser?.username}</p>
    <p>{listUser?.email}</p>
  </div>
  )
}
