import React from 'react'
import Conversation from './Conversation';
import { DUMMY_CONVERSATIONS } from '../../../dummy_data/dummy';

function Conversations() {
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {DUMMY_CONVERSATIONS.map((conversation) => {
        return(
        <Conversation key={conversation.id} conversation={conversation} emoji={''} />
        );
      })}
    </div>
  )
}

export default Conversations;