import { useAuthContext } from '../../../context/AuthContext';
import { extractTime } from '../../../utils/extractTime';
import useConversation, { MessageType } from '../../../zustand/useConversation';

const Message = ({ message }: { message: MessageType }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message?.senderId === authUser?.id;
  const img = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
  const chatClass = fromMe ? "chat-end" : "chat-start";

  const bubbleBg = fromMe ? "bg-blue-500" : "";
  return (
    <div className={`chat ${chatClass}`}>
      <div className='hidden md:block chat-image avatar'>
        <div className='w-6 md:w-8 rounded-full'>
          <img
            alt="User avatar"
            src={img}
          />            
        </div>
      </div>

      <div className={`chat-bubble text-white ${bubbleBg} text-sm md:text-md`}>
        {message.body}
      </div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>{extractTime(message.createdAt)}</div>
    </div>
  );
}

export default Message;
