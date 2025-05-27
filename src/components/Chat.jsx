import { useEffect, useState } from "react";
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

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      userId, targetUserId, firstName, text: newMessage
    });
    setNewMessage("");
  }

  const fetchChat = async() => {
    const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`,{
      withCredentials: true
    });

    const chatMessages = chat?.data.data.messages.map(message => {
      const {senderId, text} = message
      return {firstName : senderId.firstName, lastName: senderId.lastName, text: text}
    });
    setMessages(chatMessages);
    console.log(chatMessages);
  }


  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit("joinChat", {userId, targetUserId});

    socket.on("messsgeRecieved", ({firstName, text}) => {
      console.log(firstName," : ", text);
      setMessages((messages) => [...messages, {firstName, text}])
    })
    return () => {
      socket.disconnect();
    }
  }, [userId, targetUserId]);

  useEffect(() => {
    fetchChat();
  },[])

  return (
    <div>
      <div className="flex justify-center items-center my-10">
        <div className="card w-96 border-2">
          <div className="card-body">
            <div className="card-title flex justify-center">Chat</div>
            <div className="card-body flex justify-center">
              {messages.map((message, index) => (
                <div key={index}>
                  <div>{message.firstName}</div>
                  <div>{message.text}</div>
                </div>
              ))}
            </div>
            <fieldset className="fieldset">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                type="text"
                className="input"
              />
            </fieldset>
            <div className="card-actions justify-center">
              <button onClick={sendMessage} className="btn">Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat;
