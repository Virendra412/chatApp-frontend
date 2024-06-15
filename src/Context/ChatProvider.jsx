import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchChats, getCurrentUser, getNotification } from "../../utils";
const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("userInfo");
  })
  
  const [user, setUser] = useState({});
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState({})
  const [noti, setNoti] = useState([])
  const [gettingUserInfo, setGettingUserInfo] = useState(true)
 
  const navigate = useNavigate();


  useEffect(() => {
    // console.log("token dependency running");
    const ano = async () => {
     
      if (!token) {
        setGettingUserInfo(false)
        return navigate("/");
      } else {
        // const getnoti = await getNotification(token)
        // setNoti(getnoti.notif)
        try {
          const result = await getCurrentUser(token)
          setUser(result)
        } catch (error) {
          setGettingUserInfo(false)
          return navigate("/");
        }
        
        
        
        setGettingUserInfo(false)
      }
   };
    ano();
  },[token]);




  return (
    <ChatContext.Provider value={{ user, setUser,token,setToken,chats,setChats,selectedChat,setSelectedChat,noti, setNoti,gettingUserInfo }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};
