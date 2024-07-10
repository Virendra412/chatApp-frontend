import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { ChatState } from "../Context/ChatProvider";
import { AllChats } from "../components/AllChats";
import { SingleChat } from "../components/SingleChat";
import { Box,Spinner } from "@chakra-ui/react";
import { getNotification } from "../../utils";
const ChatPage = () => {
  const { user,gettingUserInfo,noti, setNoti,token } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false)
  const [hide, setHide] = useState(true)

  useEffect(() => {
    (async () => {
      console.log("noti req sent");
      const getnoti = await getNotification(token)
        setNoti(getnoti.notif)
    })();
  }, [token])

console.log(user);

  return (
      

    <>
   
        <Box className="chatpage" height="100vh" display="flex">
      {user?._id && <Navbar fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} hide={ hide} setHide={setHide}/>}
      <Box display="flex" className="Chatbox" flexGrow="1" overflow='hidden' position='relative' pt='30px' bg='#f3f3f3'>
        {user?._id && <AllChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} hide={hide} setHide={setHide} />}
        {user?._id && <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
      </Box>
    
     
    </>
  );
};
export default ChatPage;
