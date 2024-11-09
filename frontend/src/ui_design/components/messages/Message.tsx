import React from 'react';

interface MessageProps {
  message: {
    id: number;
    fromMe: boolean;
    body: string;
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className={message.fromMe ? 'chat chat-end' : 'chat chat-start'}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img
            alt="User avatar"
            src={"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
          />            
        </div>
      </div>

      <div className={'chat-bubble text-white bg-blue-500'}>
        {message.body}
      </div>
      <div className={'chat-footer opacity-50 text-xs flex gap-1 items-center'}></div>
    </div>
  );
}

export default Message;
