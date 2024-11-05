import React from 'react'

function Conversation() {
  return (
    <div>
      <div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
        <div className='avatar online placeholder'>
          <div className="text-center bg-neutral text-neutral-content w-16 h-16 rounded-full">
            <span className="text-xl">AI</span>
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between items-center'>
            <p className='font-bold text-gray-200 p-1'>John Doe</p>
            <span className='text-xl'>🎾</span>
          </div>
        </div>
      </div>

      <div className='divider my-0 py-0 h-1'></div>
    </div>
  );
}

export default Conversation;
