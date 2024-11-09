import React from 'react';

interface ConversationProps {
  conversation: {
    id: number;
    fullName: string;
    profilePic: string;
    emoji: string;
  };
}

const Conversation: React.FC<ConversationProps> = ({ conversation }) => {
  return (
    <div>
      <div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
        <div className='avatar online placeholder'>
          <div className="text-center bg-neutral text-neutral-content w-16 h-16 rounded-full">
            {conversation.profilePic ? (
              <img src={conversation.profilePic} alt={conversation.fullName} />
            ) : (
              <span className="text-xl">Anon</span>  /* Fallback if no image */
            )}
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between items-center'>
            <p className='font-bold text-gray-200 p-1'>{conversation.fullName}</p>
            <span className='text-xl'>{conversation.emoji}</span>
          </div>
        </div>
      </div>

      <div className='divider my-0 py-0 h-1'></div>
    </div>
  );
};

export default Conversation;
