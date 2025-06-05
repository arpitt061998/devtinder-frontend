import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Chat = () => {
  const {user} = useSelector(store => store.user);
  const userId = user._id;
  const firstName = user.firstName;
  const { targetUserId } = useParams(); 
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  const getTokenFromCookie = () => {
    const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
    return match ? match[1] : null;
  };

  
  const sendMessage = () => {
    const socket = createSocketConnection();
    const token = getTokenFromCookie();

    socket.emit("sendMessage", {
      userId, targetUserId, firstName, text: newMessage, token
    });
    setNewMessage("");
  }

  const timeAgo = (updatedAt) => {
    const now = new Date();
    const updatedDate = new Date(updatedAt);
    const diffMs = now - updatedDate;
  
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30); // Approximation
  
    if (diffMinutes < 60) {
      return `${diffMinutes || 1} minute${diffMinutes === 1 ? '' : 's'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    } else if (diffDays < 30) {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    } else {
      return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`;
    }
  }  
  
  const fetchChat = async() => {
    const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`,{
      withCredentials: true
    });

    const chatMessages = chat?.data.data.messages.map(message => {
      const {senderId, text} = message;
      const updatedAt = timeAgo(message.updatedAt);
      return {firstName : senderId.firstName, text: text, senderId: senderId._id , updatedAt}
    });
    setMessages(chatMessages);
    console.log(chatMessages);
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit("joinChat", {userId, targetUserId});

    socket.on("messsgeRecieved", ({firstName, text, senderUserId, createdAt}) => {
      console.log(firstName," : ", text, senderUserId);
      const updatedAt = timeAgo(createdAt);
      setMessages((messages) => [...messages, {firstName, text, senderId: senderUserId, updatedAt}])
    })
    return () => {
      socket.disconnect();
    }
  }, [userId, targetUserId]);

  useEffect(() => {
    fetchChat();
  },[])

  return (
    <div className="flex justify-center items-center bg-pink-300 min-h-[88vh]">
      <div className="card w-96 border-2 my-10 bg-neutral-800">
        <div className="card-body">
          <div className="card-title flex justify-center">Chat</div>

          {messages.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">
              No messages yet — start the conversation!
            </div> ) : (
            <div ref = {chatContainerRef} className="flex flex-col gap-2 h-[50vh] overflow-y-auto pr-2">
              {messages.map((message, index) => (
                <div key={index} className={`chat ${message.senderId === userId ? 'chat-end' : 'chat-start'}`}>
                  <div className="chat-header mb-1">
                    {message.firstName}
                    <time className="text-xs opacity-50 ml-2">{message.updatedAt}</time>
                  </div>
                  <div className="chat-bubble">{message.text}</div>
                </div>
              ))}
            </div>
          )}
          <fieldset className="fieldset mt-4">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              type="text"
              className="input w-full"
            />
          </fieldset>

          <div className="card-actions justify-center mt-2">
            <button onClick={sendMessage} className="btn btn-secondary">Send Message</button>
          </div>
        </div>
      </div>      
    </div>
  )
}

export default Chat;
