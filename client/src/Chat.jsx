import React, { useEffect, useState } from 'react'
import Message from './Message';
import {Toaster, toast} from 'react-hot-toast'
import axios from 'axios'

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const [text, setText] = useState('');

  const [canSubmit, setCanSubmit] = useState(0);

  useEffect(()=>{
    if(text.length>0 && messages.length%2==0) setCanSubmit(1);
    else setCanSubmit(0);
  }, [text.length, messages.length])

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setMessages((prevMessages)=>{
        return [...prevMessages, {"text": text}]
    })

    const response = await axios.get(`http://localhost:5000/api/get?text=${text}`)
    const data = response.data.generated_text;
    setMessages((prevMessages)=>{
        return [...prevMessages, {"text": data}]
    })
    e.target.value = '';
  }

  const handleNull = (e) =>{
    e.preventDefault();
    if(text.length==0) toast.error(<h1>Prompt cant be empty</h1>, {duration: 1000});
    else if(messages.length%2!=0) toast.error(<h1>Wait for the complete response from Chatbot</h1>, {duration: 1000});
  }
  return (
    <div className='rounded-xl bg-gray-800 h-full w-full text-white border border-gray-300 mt-10'>
        <div className=' border-b-2'>
        <h1 className='text-center text-4xl font-bold py-3'>ChatBot</h1>
        <h1 className='text-center text-xl pb-4'>Ask me Anything</h1>
        </div>
        <div className='h-auto w-full min-h-80 space-y-5 p-1 flex flex-col justify-between'>
            <div className='h-auto w-full space-y-5 min-h-80'>
            {
                messages.map((message, index)=>{
                    return <Message key={index} text={message.text} index={index}/>
                })
            }
            </div>
            <div className='w-full h-auto px-4 py-2 mt-10'>
                <form action="" method="post" className='flex flex-row gap-3' onSubmit={canSubmit ? (e)=>handleSubmit(e): (e)=> handleNull(e)}>
                <input type="text" name="" id="" className='w-full h-auto bg-gray-600 px-3 py-2 rounded-xl text-xl' onChange={(e) => setText(e.target.value)}/>
                <button type='' className={`${canSubmit==0? `bg-gray-500 cursor-not-allowed`: `bg-blue-500 cursor-pointer hover:bg-blue-700`}text-xl px-5 py-3 rounded-xl  `} onClick={canSubmit? handleSubmit: ""}>Ask</button>
                </form>
            </div>
        </div>
        <Toaster/>
    </div>
  )
}

export default Chat