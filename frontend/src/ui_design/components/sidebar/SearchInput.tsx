import { useState } from 'react';
import { MdPersonSearch } from "react-icons/md";
import toast from 'react-hot-toast';
import useConversation, { ConversationType } from '../../../zustand/useConversation';
import useGetConversations from '../../../hooks/useGetConversations';


function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation} = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    if (search.length<3) {
      return toast.error("Must be at least 3 characters.")
    }

    const conversation = conversations.find((c: ConversationType) => 
    //this next line is taking the search term and the fullName and making both lowercase
    c.fullName.toLowerCase().includes(search.toLowerCase()));

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No user found.")
    }
};

  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
        <input type="text" placeholder='Search...' className='input input-bordered rounded-full' 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <MdPersonSearch className='text-center'/>
        </button>
    </form>
  )
};

export default SearchInput;