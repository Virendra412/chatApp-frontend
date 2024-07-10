import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchChats, getCurrentUser, getNotification } from "../../utils";

const ChatContext = createContext();


export const ChatProvider = ({ children }) => {
  const [token, setToken] = useState(() => { return localStorage.getItem("userInfo"); })

  
  
  const [user, setUser] = useState(() => {
    if (!JSON.parse(localStorage.getItem('userData'))) {
      return {}
    }
    return JSON.parse(localStorage.getItem('userData'))
  });
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState({})
  const [noti, setNoti] = useState([])
  const [gettingUserInfo, setGettingUserInfo] = useState(false)
 
  const navigate = useNavigate();
 

  useEffect(() => {
    // console.log("token dependency running");
    const ano = async () => {
     
      if (!token) {
        setGettingUserInfo(false)
        localStorage.removeItem("userData")
          
        return navigate("/");
      } else {
       
        try {
          setGettingUserInfo(true)
          const result = await getCurrentUser(token)
          setUser(result)
        } catch (error) {
          if (error.response.status == 401) {
            localStorage.removeItem('userInfo')
          }
          setGettingUserInfo(false)
          localStorage.removeItem("userData")
          setUser({})

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
