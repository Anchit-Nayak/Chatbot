import React from 'react'

const Message = ({text, index}) => {
  if(index%2!=0){
    return (
      <div className='w-auto h-auto bg-gray-600 py-2 px-3 rounded-xl'>
          <h1 className='text-2xl text-start'>{'> '}{text}</h1>
      </div>
    )
  }
  return (
    <div className='w-auto h-auto bg-gray-600 py-2 px-3 rounded-xl'>
        <h1 className='text-2xl text-end'>{text}{' <'}</h1>
    </div>
  )
  
}

export default Message